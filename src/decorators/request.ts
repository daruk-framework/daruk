import assert = require('assert');
/** @internal */
import htmlspecialchars = require('htmlspecialchars');
import is = require('is');
import koa = require('koa');

export function required(config: { body?: string[]; query?: string[]; params?: string[] }) {
  assert(
    is.object(config) && Object.keys(config).length > 0,
    `[Decorator required] parameter must be a object and more than one property`
  );
  function check(
    actual: { [key: string]: string },
    expected: string[] | undefined,
    part: DarukType.method
  ) {
    if (is.object(actual) && expected) {
      for (let key of expected) {
        if (is.undefined(actual[key])) {
          return {
            part,
            key
          };
        }
      }
    }
  }

  return (proto: Object, propertyKey: string, descriptor: PropertyDescriptor) => {
    const oldFunc = descriptor.value;

    descriptor.value = async function verify(ctx: koa.Context, next: Function) {
      const { body } = ctx.request;
      const { query, params } = ctx;
      ctx.validateRequired =
        check(body, config.body, 'body') ||
        check(query, config.query, 'query') ||
        check(params, config.params, 'params');
      // tslint:disable-next-line:no-invalid-this
      await oldFunc.call(this, ...arguments);
      await next();
    };
  };
}

export function typeParse(config: {
  body?: DarukType.ParseType;
  query?: DarukType.ParseType;
  params?: DarukType.ParseType;
}) {
  function parse(constructors: DarukType.ParseType | undefined, actual: { [key: string]: string }) {
    const parsed: { [key: string]: any } = {};
    if (constructors) {
      Object.keys(constructors).forEach((key) => {
        if (!actual[key]) {
          return;
        }
        const constructor = constructors[key];
        switch (constructor) {
          case Boolean:
          case String:
          case Number:
            parsed[key] = constructor(htmlspecialchars(actual[key]));
            break;
          case Object:
          case Array:
            try {
              parsed[key] = JSON.parse(actual[key]);
            } catch (e) {
              if (constructor === Object) {
                parsed[key] = {};
              } else {
                parsed[key] = Array(actual[key]);
              }
            }
            break;
        }
      });
    }
    return parsed;
  }

  return (proto: Object, propertyKey: string, descriptor: PropertyDescriptor) => {
    const oldFunc = descriptor.value;

    descriptor.value = async function parseWrap(ctx: koa.Context, next: Function) {
      ctx.parseBody = parse(config.body, ctx.request.body);
      ctx.parseQuery = parse(config.query, ctx.query);
      ctx.parseParams = parse(config.params, ctx.params);
      // tslint:disable-next-line:no-invalid-this
      await oldFunc.call(this, ...arguments);
      await next();
    };
  };
}
