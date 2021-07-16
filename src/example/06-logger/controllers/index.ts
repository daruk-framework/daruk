import { controller, get, inject } from '../../..';

@controller()
class HelloWorld {
  @inject('Daruk') public daruk!: DarukType.Daruk;
  @get('/')
  public async index(ctx: DarukType.DarukContext, next: DarukType.Next) {
    this.daruk.logger.info('abcdef');
    ctx.body = 'hello world';
  }
}
