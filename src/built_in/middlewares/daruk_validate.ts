import { parameter } from 'daruk-validate';
import Daruk from '../../core/daruk';
import { defineMiddleware } from '../../decorators';

@defineMiddleware('daruk_validate')
class DarukValidate implements DarukType.MiddlewareClass {
  public initMiddleware(daruk: Daruk) {
    const error = parameter(daruk.app, daruk.options.validateOptions);
    // options.error = false no return error
    if (daruk.options.validateOptions.error) {
      return error;
    }
  }
}
