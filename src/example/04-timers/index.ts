import { DarukServer } from '../..';

(async () => {
  let app = DarukServer({
    rootPath: __dirname
  });

  await app.loadFile('./timers');
  await app.binding();
})();
