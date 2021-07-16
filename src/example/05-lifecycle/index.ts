import { DarukServer } from '../..';

(async () => {
  let app = DarukServer({
    rootPath: __dirname
  });
  const port = 3000;

  app.on('access', (ctx: DarukType.DarukContext) => {
    console.log(ctx.request.id);
  });

  app.on('exit', (err: Error, daruk: DarukType.Daruk) => {
    // maybe you can send a exit error or email
    daruk.logger.error('exit');
  });

  await app.loadFile('./controllers');
  await app.binding();

  app.listen(port);
})();
