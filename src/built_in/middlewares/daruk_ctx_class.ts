/**
 * @fileOverview 辅助 ctx_class 挂载在请求生命周期
 */

import { Container } from 'inversify';
import { darukContainer } from '../../';
import { defineMiddleware } from '../../decorators';

@defineMiddleware('daruk_ctx_class')
class DarukCtxClass implements DarukType.MiddlewareClass {
  public initMiddleware(_daruk: DarukType.Daruk) {
    return async (ctx: DarukType.DarukContext, next: DarukType.Next) => {
      let requestContainer = new Container({ skipBaseClassChecks: true });
      requestContainer.parent = darukContainer;
      requestContainer.bind<DarukType.DarukContext>('ctx').toConstantValue(ctx);
      requestContainer.bind<DarukType.Daruk>('Daruk').toConstantValue(_daruk);
      ctx.requestContainer = requestContainer;
      await next();
    };
  }
}
