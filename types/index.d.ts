import KoaLogger = require('daruk-logger');
import EventEmitter = require('events');
import Http = require('http');
import Https = require('https');
import * as Koa from 'koa';
import * as Router from 'koa-router';
import { Options, PartialOptions } from './daruk_options';

interface RegisterDes {
  name: string;
  export: any;
}

declare module 'daruk' {
  interface Config {}
  interface GlobalModule {}
  interface Util {}
  interface Glue {}
  interface Service {}
  interface Controller {}
  interface Request extends Koa.Request {}
  interface Response extends Koa.Response {}

  type ExtractInterface<T> = { [P in keyof T]: new (ctx: Context) => T[P] };

  export class Daruk extends Koa {
    public name: string;
    public readonly config: Config;
    public readonly globalModule: GlobalModule;
    public readonly util: Util;
    public readonly glue: Glue;
    public readonly httpServer: Http.Server;
    public logger: KoaLogger.logger;
    public options: Options;
    public readonly service: Service;
    public router: Router;
    public readonly module: {
      readonly service: ExtractInterface<Service>;
      readonly controller: ExtractInterface<Controller>;
      readonly globalModule: GlobalModule;
      readonly util: Util;
      readonly glue: Glue;
    };
    public prettyLog: (
      msg: string,
      ext?: { type?: string; level?: string; init?: boolean }
    ) => void;
    public exitHook: {
      addHook: (cb: Function) => void;
    };
    public constructor(name: string, options: PartialOptions);
    public run(port: number | string, host?: string | Function, cb?: Function): Http.Server;
    public serverReady(server: Http.Server | Https.Server): void;
    public registerTimer(describe: RegisterDes | Array<RegisterDes>): void;
    public registerService(describe: RegisterDes | Array<RegisterDes>): void;
    public registerMiddleware(describe: RegisterDes | Array<RegisterDes>): void;
    public registerController(describe: RegisterDes | Array<RegisterDes>): void;
    public registerUtil(describe: RegisterDes | Array<RegisterDes>): void;
    public mockContext(req?: {}): Context;
  }
  export interface Context extends Koa.Context {
    readonly config: Config;
    readonly globalModule: GlobalModule;
    readonly util: Util;
    readonly glue: Glue;
    readonly service: Service;
    readonly controller: Controller;
  }

  class BaseContext {
    public readonly ctx: Context;
    public readonly app: Daruk;
    public readonly service: Service;
    public constructor(ctx: Context);
  }
  export class BaseController extends BaseContext {}
  export class BaseService extends BaseContext {}

  class DarukEventsClass extends EventEmitter {}
  // @ts-ignore
  export const DarukEvents = new DarukEventsClass();

  type MethodDecoratorFunc = (path: string) => MethodDecorator;

  export const post: MethodDecoratorFunc;
  export const get: MethodDecoratorFunc;
  export const del: MethodDecoratorFunc;
  export const put: MethodDecoratorFunc;
  export const patch: MethodDecoratorFunc;
  export const options: MethodDecoratorFunc;
  export const head: MethodDecoratorFunc;
  export const all: MethodDecoratorFunc;

  export const json: MethodDecoratorFunc;
  export const JSON: MethodDecoratorFunc;
  export const prefix: MethodDecoratorFunc;

  export const middleware: (middlewareName: string) => MethodDecorator;

  type PropDecoratorFunc = (field?: string) => PropertyDecorator;

  export const config: PropDecoratorFunc;
  export const util: PropDecoratorFunc;
  export const glue: PropDecoratorFunc;
  export const logger: (fileInfo?: string) => PropertyDecorator;
}
