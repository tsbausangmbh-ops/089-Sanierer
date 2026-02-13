import express, { type Request, Response, NextFunction } from "express";
import compression from "compression";
import { registerRoutes } from "./routes";
import { serveStatic } from "./static";
import { createServer } from "http";
import { seedAdminUser } from "./seed-admin";
import { crawlerMiddleware } from "./crawler-middleware";
import { prerenderMiddleware } from "./prerender-middleware";
import { getHeroImageForRoute } from "./hero-images";

const app = express();

app.use(compression());

// Performance & Security Headers
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=(self)');
  res.setHeader('X-DNS-Prefetch-Control', 'on');
  
  if (req.path.match(/\.(webp|png|jpg|jpeg|svg|ico)$/)) {
    res.setHeader('Cache-Control', 'public, max-age=86400, must-revalidate');
    res.setHeader('Vary', 'Accept-Encoding');
  } else if (req.path.match(/\.(js|css|woff|woff2)$/)) {
    res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
  }
  
  if (!req.path.startsWith("/api") && !req.path.match(/\.(js|css|webp|png|jpg|svg|ico|woff|woff2|json|txt|xml)$/)) {
    const heroImg = getHeroImageForRoute(req.path);
    if (heroImg) {
      res.setHeader('Link', `<${heroImg}>; rel=preload; as=image; type=image/webp`);
    }
  }
  
  next();
});

// Crawler-Logging: Alle Bot-Zugriffe loggen (vor crawlerMiddleware, da diese direkt antwortet)
const CRAWLER_BOTS = [
  "Googlebot", "Google-InspectionTool", "AdsBot-Google", "APIs-Google",
  "Mediapartners-Google", "Storebot-Google", "GoogleOther", "Google-Extended",
  "Bingbot", "BingPreview", "Slurp", "DuckDuckBot", "Baiduspider",
  "YandexBot", "GPTBot", "ChatGPT-User", "OAI-SearchBot", "ClaudeBot",
  "PerplexityBot", "Applebot", "Amazonbot", "PetalBot", "SeznamBot",
  "MojeekBot", "facebookexternalhit", "Twitterbot", "LinkedInBot",
  "Bytespider", "AhrefsBot", "SemrushBot", "MJ12bot",
  "Chrome-Lighthouse", "Google Page Speed",
];

app.use((req, res, next) => {
  const ua = req.headers["user-agent"] || "";
  const bot = CRAWLER_BOTS.find((b) => ua.includes(b));
  if (bot) {
    const formattedTime = new Date().toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });
    console.log(`${formattedTime} [crawler] [CRAWLER] ${bot} | ${req.method} ${req.originalUrl} | IP: ${req.ip}`);
  }
  next();
});

// Temporary debug endpoint - REMOVE after testing
app.get("/api/_debug-prerender", (req, res) => {
  const hasToken = !!process.env.PRERENDER_TOKEN;
  const tokenLen = process.env.PRERENDER_TOKEN ? process.env.PRERENDER_TOKEN.length : 0;
  res.json({ hasToken, tokenLen, nodeEnv: process.env.NODE_ENV });
});

// SEO: Prerender.io for search engines and AI bots (primary)
// Falls back to built-in crawler middleware if Prerender.io is unavailable
app.use(prerenderMiddleware);
app.use(crawlerMiddleware);
const httpServer = createServer(app);

declare module "http" {
  interface IncomingMessage {
    rawBody: unknown;
  }
}

app.use(
  express.json({
    verify: (req, _res, buf) => {
      req.rawBody = buf;
    },
  }),
);

app.use(express.urlencoded({ extended: false }));

export function log(message: string, source = "express") {
  const formattedTime = new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  console.log(`${formattedTime} [${source}] ${message}`);
}

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      log(logLine);
    }
  });

  next();
});

(async () => {
  try {
    await seedAdminUser();
    await registerRoutes(httpServer, app);

    app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
      const status = err.status || err.statusCode || 500;
      const message = err.message || "Internal Server Error";

      res.status(status).json({ message });
      console.error("Error:", err);
    });

    // importantly only setup vite in development and after
    // setting up all the other routes so the catch-all route
    // doesn't interfere with the other routes
    if (process.env.NODE_ENV === "production") {
      serveStatic(app);
    } else {
      const { setupVite } = await import("./vite");
      await setupVite(httpServer, app);
    }

    // ALWAYS serve the app on the port specified in the environment variable PORT
    // Other ports are firewalled. Default to 5000 if not specified.
    // this serves both the API and the client.
    // It is the only port that is not firewalled.
    const port = parseInt(process.env.PORT || "5000", 10);
    httpServer.listen(
      {
        port,
        host: "0.0.0.0",
        reusePort: true,
      },
      () => {
        log(`serving on port ${port}`);
      },
    );

    // Server timeout settings
    httpServer.keepAliveTimeout = 120000;
    httpServer.headersTimeout = 120000;
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
})();
