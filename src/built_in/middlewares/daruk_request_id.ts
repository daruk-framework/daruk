/**
 * @fileOverview request id 中间件
 */

import { xRequestId } from 'daruk-request-id';
import Daruk from '../../core/daruk';
import { defineMiddleware } from '../../decorators';

@defineMiddleware('daruk_request_id')
class DarukRequestId implements DarukType.MiddlewareClass {
  public initMiddleware(daruk: Daruk) {
    return xRequestId(daruk.options.requestId, daruk.app);
  }
}
