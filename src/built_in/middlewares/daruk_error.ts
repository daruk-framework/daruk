/**
 * @fileOverview koa-error 中间件
 */

import error from 'koa-onerror';
import Daruk from '../../core/daruk';
import { defineMiddleware } from '../../decorators';

@defineMiddleware('daruk_error')
class KoaBody implements DarukType.MiddlewareClass {
  public initMiddleware(daruk: DarukType.Daruk) {
    error(daruk.app, daruk.options.errorOptions);
  }
}
