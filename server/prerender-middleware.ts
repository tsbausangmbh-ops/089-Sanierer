import type { Request, Response, NextFunction } from "express";

const PRERENDER_SERVICE_URL = "https://service.prerender.io/";

const BOT_USER_AGENTS = [
  "googlebot",
  "google-inspectiontool",
  "adsbot-google",
  "apis-google",
  "mediapartners-google",
  "google-safety",
  "feedfetcher-google",
  "google-site-verification",
  "google-structured-data-testing-tool",
  "google-extended",
  "googleother",
  "storebot-google",
  "google-adwords-instant",
  "google page speed",
  "chrome-lighthouse",
  "bingbot",
  "adidxbot",
  "msnbot",
  "bingpreview",
  "yandexbot",
  "duckduckbot",
  "slurp",
  "baiduspider",
  "facebookexternalhit",
  "twitterbot",
  "linkedinbot",
  "whatsapp",
  "telegrambot",
  "applebot",
  "applebot-extended",
  "gptbot",
  "chatgpt-user",
  "oai-searchbot",
  "openai",
  "claude-web",
  "claudebot",
  "anthropic-ai",
  "anthropicbot",
  "perplexitybot",
  "cohere-ai",
  "amazonbot",
  "duckassistbot",
  "kagibot",
  "petalbot",
  "mojeekbot",
  "meta-externalagent",
  "meta-externalfetcher",
  "facebookbot",
  "youbot",
  "ccbot",
  "bytedance",
  "bytespider",
  "iaskbot",
  "ahrefsbot",
  "semrushbot",
  "mj12bot",
  "dotbot",
  "screaming frog",
  "rogerbot",
  "embedly",
  "quora link preview",
  "showyoubot",
  "outbrain",
  "pinterest",
  "slackbot",
  "vkshare",
  "w3c_validator",
  "redditbot",
  "flipboard",
  "tumblr",
  "bitlybot",
  "skypeuripreview",
  "nuzzel",
  "discordbot",
  "qwantify",
  "seznambot",
];

const IGNORED_EXTENSIONS = [
  ".js", ".css", ".xml", ".less", ".png", ".jpg", ".jpeg", ".gif",
  ".pdf", ".doc", ".txt", ".ico", ".rss", ".zip", ".mp3", ".rar",
  ".exe", ".wmv", ".doc", ".avi", ".ppt", ".mpg", ".mpeg", ".tif",
  ".wav", ".mov", ".psd", ".ai", ".xls", ".mp4", ".m4a", ".swf",
  ".dat", ".dmg", ".iso", ".flv", ".m4v", ".torrent", ".ttf",
  ".woff", ".woff2", ".svg", ".webp", ".webm", ".map", ".json",
];

function isBotRequest(userAgent: string): boolean {
  const ua = userAgent.toLowerCase();
  return BOT_USER_AGENTS.some((bot) => ua.includes(bot));
}

function hasIgnoredExtension(url: string): boolean {
  const path = url.split("?")[0].toLowerCase();
  return IGNORED_EXTENSIONS.some((ext) => path.endsWith(ext));
}

const CANONICAL_HOST = "089-sanierer.de";

function buildPrerenderUrl(req: Request): string {
  const originalUrl = req.originalUrl || req.url;
  return `${PRERENDER_SERVICE_URL}https://${CANONICAL_HOST}${originalUrl}`;
}

export async function prerenderMiddleware(req: Request, res: Response, next: NextFunction) {
  const token = process.env.PRERENDER_TOKEN;
  if (!token) {
    console.log(`[prerender] SKIP: no PRERENDER_TOKEN env var`);
    return next();
  }

  if (req.method !== "GET" && req.method !== "HEAD") {
    return next();
  }

  if (req.path.startsWith("/api/")) {
    return next();
  }

  const userAgent = req.headers["user-agent"] || "";
  if (!userAgent || !isBotRequest(userAgent)) {
    return next();
  }

  if (hasIgnoredExtension(req.url)) {
    return next();
  }

  const prerenderUrl = buildPrerenderUrl(req);

  const headers: Record<string, string> = {
    "X-Prerender-Token": token,
    "User-Agent": userAgent,
    "Accept": "text/html",
  };

  const formattedTime = new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  try {
    const prerenderRes = await fetch(prerenderUrl, {
      headers,
      redirect: "follow",
      signal: AbortSignal.timeout(15000),
    });

    const status = prerenderRes.status;

    if (status === 401 || status === 403) {
      console.log(`${formattedTime} [prerender] AUTH_FAIL ${req.originalUrl} (${status}) → fallback`);
      return next();
    }

    if (status === 301 || status === 302 || status === 307 || status === 308) {
      const location = prerenderRes.headers.get("location");
      if (location) {
        console.log(`${formattedTime} [prerender] REDIRECT ${req.originalUrl} → ${location} (${status})`);
        res.set("X-Prerender", "1");
        return res.redirect(status, location);
      }
      return next();
    }

    if (req.method === "HEAD") {
      console.log(`${formattedTime} [prerender] HIT ${req.originalUrl} (HEAD ${status})`);
      res.status(status);
      res.set("Content-Type", "text/html; charset=utf-8");
      res.set("X-Prerender", "1");
      return res.end();
    }

    const html = await prerenderRes.text();
    console.log(`${formattedTime} [prerender] HIT ${req.originalUrl} (${status}, ${html.length} bytes)`);
    res.status(status);
    res.set("Content-Type", "text/html; charset=utf-8");
    res.set("X-Prerender", "1");

    const cacheControl = prerenderRes.headers.get("cache-control");
    if (cacheControl) {
      res.set("Cache-Control", cacheControl);
    }

    res.send(html);
  } catch (err: any) {
    console.log(`${formattedTime} [prerender] ERROR ${req.originalUrl}: ${err.message} → fallback`);
    next();
  }
}
