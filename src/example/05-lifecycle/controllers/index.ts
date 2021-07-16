import { controller, get } from '../../..';

@controller()
class Index {
  @get('/')
  public index(ctx: DarukType.DarukContext, next: DarukType.Next) {
    ctx.body = `hello world`;
  }
}
