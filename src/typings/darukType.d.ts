/** @internal */
declare namespace DarukType {
  export type Server = import('http').Server | import('https').Server;
  export type Next = () => Promise<any>;
  export type Daruk = import('../core/daruk').default;
  /** @internal */
  export type Request = import('koa').Request;
  export type Context = import('koa').Context;
  export type Middleware = import('koa').Middleware;

  export interface DarukRequest extends Request {
    id: string;
  }

  export interface DarukContext extends Context {
    [key: string]: any;
    request: DarukRequest;
  }

  export type Constructor<T = any> = new (...args: any[]) => T;

  export interface PluginClass {
    initPlugin: (daruk: Daruk) => Promise<any>;
  }

  export interface TimerClass {
    cronTime: string;
    start?: boolean;
    timeZone?: string;
    onTick: (cron: import('cron').CronJob, daruk: Daruk) => void;
    onComplete?: (cron: import('cron').CronJob, daruk: Daruk) => void;
    runOnInit?: boolean;
    context?: any;
    initTimer: (daruk: Daruk) => void;
  }

  export interface MiddlewareClass {
    initMiddleware: (daruk: Daruk) => Middleware | void | Function;
  }

  /** @internal */
  export interface ParseType {
    [key: string]:
      | ArrayConstructor
      | BooleanConstructor
      | StringConstructor
      | NumberConstructor
      | ObjectConstructor;
  }
  /** @internal */
  export interface ParsedType {
    [key: string]: Array<string> | Boolean | String | Number | Object;
  }
  /** @internal */
  export type method = 'body' | 'query' | 'params';
  /** @internal */
  export type validateFunc = (value: string) => string | undefined;
}
