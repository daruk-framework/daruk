/**
 * @fileOverview koa-cookie 中间件
 * https://www.npmjs.com/package/koa-cookie
 */

import koaCookie from 'koa-cookie';
import Daruk from '../../core/daruk';
import { defineMiddleware } from '../../decorators';

@defineMiddleware('daruk_cookie')
class KoaBody implements DarukType.MiddlewareClass {
  public initMiddleware(daruk: Daruk) {
    return koaCookie();
  }
}
