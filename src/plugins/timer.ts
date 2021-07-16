/**
 * @fileOverview 初始化timer
 */

import { CronJob } from 'cron';
import { darukContainer } from '../core/inversify.config';
import { TYPES } from '../core/types';
import { plugin } from '../decorators';

@plugin()
class Timer implements DarukType.PluginClass {
  public async initPlugin(daruk: DarukType.Daruk) {
    daruk.on('init', () => {
      if (darukContainer.isBound(TYPES.Timer)) {
        const timer = darukContainer.getAll<DarukType.TimerClass>(TYPES.Timer);
        timer.forEach(function initTimer(job: DarukType.TimerClass) {
          job.initTimer(daruk);
          let instance: CronJob = new CronJob(
            job.cronTime,
            () => {
              job.onTick(instance, daruk);
            },
            () => {
              if (job.onComplete) job.onComplete(instance, daruk);
            },
            job.start || true,
            job.timeZone || 'Asia/Shanghai',
            job.context,
            job.runOnInit || false
          );
        });
      }
    });
  }
}
