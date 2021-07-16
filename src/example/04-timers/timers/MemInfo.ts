import { freemem } from 'os';
import { CronJob, inject, provide, timer } from '../../..';

@provide('Db')
class Db {}

@timer()
class MyTimer implements DarukType.TimerClass {
  public cronTime!: string;
  @inject('Db') private Db!: Db;
  public initTimer(daruk: DarukType.Daruk) {
    this.cronTime = '* * * * * *';
  }
  public onTick(job: CronJob, daruk: DarukType.Daruk) {
    console.log(this.Db);
    // if you setup with pm2 cluster:
    // https://pm2.io/doc/en/runtime/guide/load-balancing/?utm_source=pm2&utm_medium=website&utm_campaign=rebranding#cluster-environment-variable
    // only run tick on NODE_APP_INSTANCE === '0';
    if (!process.env.NODE_APP_INSTANCE || process.env.NODE_APP_INSTANCE === '0') {
      const unit = 1024;
      let freeMem = Math.round(freemem() / (unit * unit));
      daruk.logger.info({
        freeMem
      });
    }
  }
  public onComplete(job: CronJob, daruk: DarukType.Daruk) {
    // if you setup with pm2 cluster:
    // https://pm2.io/doc/en/runtime/guide/load-balancing/?utm_source=pm2&utm_medium=website&utm_campaign=rebranding#cluster-environment-variable
    // use the NODE_APP_INSTANCE to stop the task
    if (!process.env.NODE_APP_INSTANCE && process.env.NODE_APP_INSTANCE !== '0') {
      job.stop();
    }
  }
}
