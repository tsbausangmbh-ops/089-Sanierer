declare module 'prerender-node' {
  import { RequestHandler } from 'express';
  
  interface Prerender extends RequestHandler {
    set(key: string, value: string | boolean | ((req: any, done: (err: any, data?: string) => void) => void) | ((err: any, req: any, prerenderRes: any) => void)): Prerender;
  }
  
  const prerender: Prerender;
  export default prerender;
}
