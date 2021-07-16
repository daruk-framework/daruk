import { Daruk, defineMiddleware } from '../../..';

@defineMiddleware('cors')
class Cors implements DarukType.MiddlewareClass {
  public initMiddleware(daruk: Daruk) {
    return async (ctx: DarukType.DarukContext, next: DarukType.Next) => {
      ctx.set('Access-Control-Allow-Origin', '*');
      ctx.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
      await next();
    };
  }
}
