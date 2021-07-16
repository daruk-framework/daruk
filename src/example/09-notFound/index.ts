import { controller, DarukServer, get } from '../..';

@controller()
class NotFound {
  @get('/')
  public async index(ctx: DarukType.DarukContext, next: DarukType.Next) {
    ctx.body = 'hello world';
  }
}

(async () => {
  let app = DarukServer({
    notFound: (ctx: DarukType.DarukContext) => {
      ctx.body = '404';
    }
  });
  let port = 3000;
  await app.binding();
  app.listen(port);
  app.logger.info(`app listen port ${port}`);
})();
