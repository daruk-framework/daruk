import { darukContainer } from '../core/inversify.config';
import { TYPES } from '../core/types';
import { plugin } from '../decorators';

@plugin()
class GlobalMiddleware implements DarukType.PluginClass {
  public async initPlugin(daruk: DarukType.Daruk) {
    daruk.on('routerUseBefore', () => {
      if (darukContainer.isBound(TYPES.Middleware)) {
        let buildInMiddlewareOrder = [
          'daruk_request_id',
          'daruk_notFound',
          'daruk_validate',
          'daruk_error',
          'daruk_cookie',
          'daruk_logger',
          'daruk_body',
          'daruk_ctx_class'
        ];
        let middlewareOrder = buildInMiddlewareOrder.concat(daruk.options.middlewareOrder);
        middlewareOrder.forEach((midname) => {
          let mid = darukContainer.getNamed<DarukType.MiddlewareClass>(TYPES.Middleware, midname);
          let usehandle = mid.initMiddleware(daruk);
          // @ts-ignore
          if (usehandle) daruk.app.use(usehandle, midname);
        });
      }
    });
  }
}
