import { controller, DarukServer, get } from '../..';

@controller()
class CError {
  @get('/')
  public async index(ctx: DarukType.DarukContext, next: DarukType.Next) {
    throw new Error('my error');
  }
}

(async () => {
  let app = DarukServer({
    // 匹配的是 request accept
    errorOptions: {
      html: (err: Error, ctx: DarukType.DarukContext) => {
        ctx.body = `${err.message}`;
      }
    }
  });
  let port = 3000;
  await app.binding();
  app.listen(port);
  app.logger.info(`app listen port ${port}`);
})();
