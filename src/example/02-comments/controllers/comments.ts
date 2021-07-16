import { controller, inject, post, prefix } from '../../..';
import CommentsModel from '../services/CommentsModel';

@controller()
@prefix('/comments')
class Comments {
  @inject('CommentsModel') private CommentsModel!: CommentsModel;
  @post('/insert')
  public async index(ctx: DarukType.DarukContext, next: DarukType.Next) {
    let { name, content } = ctx.request.body;
    await this.CommentsModel.insert(name, content);
    ctx.redirect('/');
    await next();
  }
}
