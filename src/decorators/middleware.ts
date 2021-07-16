import assert = require('assert');
import { injectable } from 'inversify';
import is = require('is');
import { darukContainer } from '../core/inversify.config';
import { TYPES } from '../core/types';
import { MIDDLEWARE_NAME } from './constants';

/**
 * @desc middleware 中间件装饰器
 * @param {string} middlewareName - 中间件的名字
 * @param options
 * @return Decorator - 装饰器
 */

export function middleware(middlewareName: string, options?: { [key: string]: any }) {
  assert(is.string(middlewareName), `[Decorator @middleware] parameter must be a string`);
  return (target: Object, propertyKey: string, descriptor: PropertyDescriptor) => {
    // 一个路由 handle 可能被多个 @middleware 修饰
    const middleares = Reflect.getMetadata(MIDDLEWARE_NAME, target.constructor, propertyKey) || [];
    middleares.push({ middlewareName, options });
    // 保存 @middleware 应用的所有中间件名字
    Reflect.defineMetadata(MIDDLEWARE_NAME, middleares, target.constructor, propertyKey);
  };
}

export function defineMiddleware(middlewareName: string) {
  return (target: DarukType.Constructor) => {
    injectable()(target);
    darukContainer
      .bind<DarukType.Constructor>(TYPES.Middleware)
      .to(target)
      .whenTargetNamed(middlewareName);
  };
}
