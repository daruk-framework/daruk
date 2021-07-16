import { controller, DarukServer, get, validate } from '../..';

@controller()
class TestValidate {
  @get('/')
  @validate({
    name: {
      type: 'string',
      required: true
    }
  })
  public async index(ctx: DarukType.DarukContext, next: DarukType.Next) {
    ctx.body = ctx.query.name;
  }
}

(async () => {
  let app = DarukServer({
    // https://www.npmjs.com/package/parameter
    validateOptions: {
      error: true
    }
  });
  let port = 3000;
  await app.binding();
  app.listen(port);
  app.logger.info(`app listen port ${port}`);
})();
