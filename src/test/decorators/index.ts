import {
  all,
  cache,
  controller,
  CronJob,
  defineMiddleware,
  del,
  disabled,
  get,
  head,
  header,
  inject,
  injectable,
  middleware,
  options,
  patch,
  post,
  prefix,
  priority,
  put,
  redirect,
  service,
  timer,
  type,
  validate
} from '../..';

class Store {
  public store: { [key: string]: any };
  public constructor() {
    this.store = {};
  }
  public get(key: string) {
    if (this.store[key] && Date.now() - this.store[key].createTime > this.store[key].timeout) {
      delete this.store[key];
    }
    return this.store[key];
  }
  public set(key: string, value: string, timeout: number) {
    this.store[key] = {
      value,
      createTime: Date.now(),
      timeout
    };
  }
}

const cacheStore = new Store();

@defineMiddleware('multiRouteMiddleware')
class MultiRouteMiddlewareRouteMiddleware {
  public initMiddleware() {
    return (options: { [key: string]: any }) => {
      return (ctx: DarukType.DarukContext, next: DarukType.Next) => {
        ctx.body = ctx.body + ' multiRouteMiddleware';
        return next();
      };
    };
  }
}

@defineMiddleware('routeMiddleware')
class RouteMiddleware {
  public initMiddleware() {
    return (ctx: DarukType.DarukContext, next: DarukType.Next) => {
      ctx.body = 'routeMiddleware';
      return next();
    };
  }
}

@service()
class MyServiceA {
  @inject('ctx') public ctx?: DarukType.DarukContext;
  public getRet() {
    // @ts-ignore
    return this.ctx.query.id;
  }
}

@service()
class MyServiceB {
  @inject('ctx') public ctx?: DarukType.DarukContext;
  public getRet() {
    return new Promise((r) => {
      setTimeout(() => {
        // @ts-ignore
        r(this.ctx.query.id);
        // tslint:disable-next-line:no-magic-numbers
      }, 2000);
    });
  }
}

@service()
class MyServiceC {
  @inject('ctx') public ctx?: DarukType.DarukContext;
  public getRet() {
    // @ts-ignore
    return this.ctx.query.id;
  }
}

@controller()
class ServiceTest {
  @inject('MyServiceA') public MyServiceA?: MyServiceA;
  @inject('MyServiceB') public MyServiceB?: MyServiceB;
  @inject('MyServiceC') public MyServiceC?: MyServiceC;
  @get('/methodA')
  public async methodA(ctx: DarukType.DarukContext, next: DarukType.Next) {
    // @ts-ignore
    ctx.body = this.MyServiceA.getRet();
  }
  @get('/methodB')
  public async methodB(ctx: DarukType.DarukContext, next: DarukType.Next) {
    // @ts-ignore
    ctx.body = await this.MyServiceB.getRet();
  }
  @get('/methodC')
  public async methodC(ctx: DarukType.DarukContext, next: DarukType.Next) {
    // @ts-ignore
    ctx.body = this.MyServiceC.getRet();
  }
}

@controller([
  {
    middlewareName: 'routeMiddleware'
  }
])
class ControllerMiddleware {
  @get('/ControllerMiddleware')
  public async ControllerMiddleware(ctx: DarukType.DarukContext, next: DarukType.Next) {}
}

@controller()
class Index {
  @get('/repeatMethod')
  @post('/repeatMethod')
  public async repeatMethod(ctx: DarukType.DarukContext, next: DarukType.Next) {
    ctx.body = '';
  }
  @all('/all')
  public async all(ctx: DarukType.DarukContext, next: DarukType.Next) {
    ctx.body = '';
  }
  @del('/del')
  public async del(ctx: DarukType.DarukContext, next: DarukType.Next) {
    ctx.body = '';
  }
  @get('/get')
  public async get(ctx: DarukType.DarukContext, next: DarukType.Next) {
    ctx.body = '';
  }
  @head('/head')
  public async head(ctx: DarukType.DarukContext, next: DarukType.Next) {
    ctx.body = '';
  }
  @options('/options')
  public async options(ctx: DarukType.DarukContext, next: DarukType.Next) {
    ctx.body = '';
  }
  @patch('/patch')
  public async patch(ctx: DarukType.DarukContext, next: DarukType.Next) {
    ctx.body = '';
  }
  @post('/post')
  public async post(ctx: DarukType.DarukContext, next: DarukType.Next) {
    ctx.body = '';
  }
  @put('/put')
  public async put(ctx: DarukType.DarukContext, next: DarukType.Next) {
    ctx.body = '';
  }

  @redirect('/json2')
  @get('/redirect')
  public redirect(ctx: DarukType.DarukContext) {
    ctx.body = '';
  }
  @type('application/json')
  @get('/type')
  public type(ctx: DarukType.DarukContext) {
    ctx.body = {
      foo: 1
    };
  }

  @header('foo', 'bar')
  @get('/header')
  public header(ctx: DarukType.DarukContext) {
    ctx.body = 'bar';
  }

  @header({ foo: 'bar' })
  @get('/headers')
  public headers(ctx: DarukType.DarukContext) {
    ctx.body = 'bar';
  }

  @get('/wildcard_(\\d)_(\\d).htm')
  public deatil(ctx: DarukType.DarukContext) {
    ctx.body = {
      foo: 1
    };
  }

  @middleware('routeMiddleware')
  @get('/middleware')
  public async middleware(ctx: DarukType.DarukContext, next: DarukType.Next) {}

  @middleware('multiRouteMiddleware', { foo: 1 })
  @middleware('routeMiddleware')
  @get('/multiMiddleware')
  public async multiMiddleware(ctx: DarukType.DarukContext, next: DarukType.Next) {}

  @validate({
    foo: 'string'
  })
  @get('/validate')
  public validate(ctx: DarukType.DarukContext) {
    ctx.body = ctx.request.query;
  }

  @validate({
    foo: {
      type: 'string?',
      default: 'default'
    }
  })
  @post('/validate')
  public validatePost(ctx: DarukType.DarukContext) {
    ctx.body = ctx.request.body;
  }

  @cache(async (cacheKey, data) => {
    if (data) {
      cacheStore.set(cacheKey, data, 1000);
      return data;
    } else {
      return cacheStore.get(cacheKey);
    }
  })
  @get('/cache')
  public cache(ctx: DarukType.DarukContext) {
    ctx.body = 'cacheData';
  }

  @disabled()
  @get('/disabled')
  public disabled(ctx: DarukType.DarukContext) {
    ctx.body = '';
  }
  public _destroy() {
    // destroy something
  }
}

@controller()
class EmptyClass {}

@prefix('/v1/prefix')
@controller()
@priority(-1)
class PrefixIndexA {
  @get('/index')
  public async test(ctx: DarukType.DarukContext, next: DarukType.Next) {
    ctx.body = 'A';
    await next();
  }
}

@prefix('/v1/prefix')
@controller()
class PrefixIndexB {
  @get('/index')
  public async test(ctx: DarukType.DarukContext, next: DarukType.Next) {
    ctx.body = ctx.body + 'B';
  }
}

@prefix('/v1/prefix/test/deep')
@controller()
class PrefixTestDeep {
  @get('/json')
  public async json(ctx: DarukType.DarukContext, next: DarukType.Next) {
    ctx.body = { foo: 1 };
  }
}

@prefix('/disabled')
@disabled()
@controller()
class DisabledIndex {
  @get('/test')
  public async test(ctx: DarukType.DarukContext, next: DarukType.Next) {
    ctx.body = '';
  }
}

@timer()
class Timers {
  public cronTime!: string;
  public initTimer(daruk: DarukType.Daruk) {
    this.cronTime = '* * * * * *';
  }
  public onTick(cron: CronJob) {
    cron.stop();
  }
  public onComplete(cron: CronJob, daruk: DarukType.Daruk) {
    daruk.timerComplete = true;
  }
}
