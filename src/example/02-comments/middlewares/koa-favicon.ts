import favicon = require('koa-favicon');
import { Daruk, defineMiddleware } from '../../..';

@defineMiddleware('koa-favicon')
class Favicon implements DarukType.MiddlewareClass {
  public initMiddleware(daruk: Daruk) {
    return favicon(`${daruk.options.rootPath}/public/favicon.png`);
  }
}
