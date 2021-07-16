declare type RecursivePartial<T> = {
  [P in keyof T]?: T[P] extends (infer U)[]
    ? RecursivePartial<U>[]
    : T[P] extends object
    ? RecursivePartial<T[P]>
    : T[P];
};

declare interface ErrorOptions {
  all?: (err: Error, ctx: DarukType.DarukContext) => void;
  html?: (err: Error, ctx: DarukType.DarukContext) => void;
  text?: (err: Error, ctx: DarukType.DarukContext) => void;
  json?: (err: Error, ctx: DarukType.DarukContext) => void;
  jsonp?: (err: Error, ctx: DarukType.DarukContext) => void;
  redirect?: (err: Error, ctx: DarukType.DarukContext) => void;
}

declare interface Options {
  middlewareOrder: string[];
  name: string;
  rootPath: string;
  debug: boolean;
  bodyOptions: import('koa-body').IKoaBodyOptions;
  // monitor: {
  //   enable: boolean;
  //   v8AnalyticsPath: string;
  //   v8ProfilerPath: string;
  //   auth: {
  //     name: string;
  //     password: string;
  //   };
  // };
  loggerOptions: any;
  customLogger: any;
  loggerMiddleware: {
    filter?: (ctx: DarukType.DarukContext) => boolean;
    requiredLogs?: string[];
  };
  gracefulShutdown: {
    enable: boolean;
    timeout: number;
  };
  requestId: any;
  validateOptions: {
    translate?: Function;
    validateRoot?: boolean;
    convert?: boolean;
    widelyUndefined?: any;
    error?: boolean;
  };
  [key: string]: any;
  errorOptions?: ErrorOptions | undefined;
  notFound?: (ctx: DarukType.DarukContext) => void;
}

declare type PartialOptions = RecursivePartial<Options>;
