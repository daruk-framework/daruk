/**
 * @fileOverview koa-notFound 中间件
 */

import Daruk from '../../core/daruk';
import { defineMiddleware } from '../../decorators';

@defineMiddleware('daruk_notFound')
class KoaBody implements DarukType.MiddlewareClass {
  public initMiddleware(daruk: Daruk) {
    return async (ctx: DarukType.DarukContext, next: DarukType.Next) => {
      try {
        await next();
        // tslint:disable-next-line:no-magic-numbers
        if (ctx.status === 404 && daruk.options.notFound) {
          daruk.options.notFound(ctx);
        }
      } catch (err) {
        ctx.throw(err);
      }
    };
  }
}
