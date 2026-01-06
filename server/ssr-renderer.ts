import fs from "fs";
import path from "path";
import { getSeoMeta, type SeoMeta } from "../shared/seo-meta";

let templateCache: string | null = null;

function escapeForAttribute(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;");
}

function loadTemplate(isDev: boolean): string {
  const templatePath = isDev
    ? path.resolve(process.cwd(), "client", "index.html")
    : path.resolve(process.cwd(), "dist", "public", "index.html");

  return fs.readFileSync(templatePath, "utf-8");
}

function getTemplate(isDev: boolean): string {
  if (isDev) {
    return loadTemplate(true);
  }
  
  if (!templateCache) {
    templateCache = loadTemplate(false);
  }
  return templateCache;
}

function replacePlaceholder(html: string, tag: string, value: string): string {
  const regex = new RegExp(`<!--${tag}-->[^]*?<!--\\/${tag}-->`, "g");
  return html.replace(regex, escapeForAttribute(value));
}

export function renderHtmlWithMeta(requestPath: string, isDev: boolean = false): string {
  const baseTemplate = getTemplate(isDev);
  const meta: SeoMeta = getSeoMeta(requestPath);

  let html = baseTemplate;
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
