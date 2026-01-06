import fs from "fs";
import path from "path";
import { getSeoMeta, type SeoMeta } from "../shared/seo-meta";

let templateCache: string | null = null;

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function getTemplate(isDev: boolean): string {
  if (templateCache && !isDev) {
    return templateCache;
  }

  const templatePath = isDev
    ? path.resolve(process.cwd(), "client", "index.html")
    : path.resolve(process.cwd(), "dist", "public", "index.html");

  templateCache = fs.readFileSync(templatePath, "utf-8");
  return templateCache;
}

function replacePlaceholder(html: string, tag: string, value: string): string {
  const regex = new RegExp(`<!--${tag}-->[^<]*<!--\\/${tag}-->`, "g");
  return html.replace(regex, escapeHtml(value));
}

export function renderHtmlWithMeta(requestPath: string, isDev: boolean = false): string {
  const template = getTemplate(isDev);
  const meta: SeoMeta = getSeoMeta(requestPath);

  let html = template;
  html = replacePlaceholder(html, "SSR_TITLE", meta.title);
  html = replacePlaceholder(html, "SSR_META_TITLE", meta.title);
  html = replacePlaceholder(html, "SSR_DESCRIPTION", meta.description);
  html = replacePlaceholder(html, "SSR_KEYWORDS", meta.keywords);
  html = replacePlaceholder(html, "SSR_CANONICAL", meta.canonical);
  html = replacePlaceholder(html, "SSR_OG_TITLE", meta.ogTitle);
  html = replacePlaceholder(html, "SSR_OG_DESCRIPTION", meta.ogDescription);

  return html;
}

export function clearTemplateCache(): void {
  templateCache = null;
}
