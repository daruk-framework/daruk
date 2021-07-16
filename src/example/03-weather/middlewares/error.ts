import { Daruk, defineMiddleware } from '../../..';

@defineMiddleware('errorMid')
class ErrorMid implements DarukType.MiddlewareClass {
  public initMiddleware(daruk: Daruk) {
    return async (ctx: DarukType.DarukContext, next: DarukType.Next) => {
      try {
        await next();
      } catch (e) {
        daruk.logger.error(e.stack);
      }
    };
  }
}
