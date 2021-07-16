import ejs = require('koa-ejs');
import { join } from 'path';
import { Daruk, defineMiddleware } from '../../..';

@defineMiddleware('koa-ejs')
class KoaEjs implements DarukType.MiddlewareClass {
  public initMiddleware(daruk: Daruk) {
    ejs(daruk.app, {
      root: join(daruk.options.rootPath, './view'),
      viewExt: 'tpl'
    });
  }
}
