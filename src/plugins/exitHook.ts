/**
 * @fileOverview 进程退出插件
 */

import ExitHook = require('daruk-exit-hook');
import { plugin } from '../decorators';

@plugin()
class DarukExitHook implements DarukType.PluginClass {
  public async initPlugin(daruk: DarukType.Daruk) {
    let exitHook = new ExitHook({
      onExit: (err: Error | null) => {
        if (err) {
          daruk.prettyLog(err.stack || err.message, { level: 'error' });
        }
        daruk.prettyLog('process is exiting');
        daruk.emit('exit', err, daruk);
      },
      onExitDone: (code: number) => {
        daruk.prettyLog(`process exited: ${code}`);
      }
    });
    return exitHook;
  }
}
