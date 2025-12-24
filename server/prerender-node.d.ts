declare module 'prerender-node' {
  import { RequestHandler } from 'express';
  
  interface PrerenderNode extends RequestHandler {
    set(key: string, value: string | string[]): void;
    whitelisted(paths: string[]): void;
    blacklisted(paths: string[]): void;
  }
  
  const prerender: PrerenderNode;
  export default prerender;
}
