/**
 * @fileOverview 通过装饰器注入挂载到 daruk 的模块
 */
import { injectable } from 'inversify';
import { darukContainer } from '../core/inversify.config';
import { TYPES } from '../core/types';
import { SERVICE } from './constants';

export function plugin() {
  return (target: DarukType.Constructor) => {
    injectable()(target);
    darukContainer.bind<DarukType.PluginClass>(TYPES.PLUGINCLASS).to(target);
  };
}

export function timer() {
  return (target: DarukType.Constructor) => {
    injectable()(target);
    darukContainer.bind<DarukType.TimerClass>(TYPES.Timer).to(target);
  };
}

export function service() {
  return (target: DarukType.Constructor) => {
    injectable()(target);
    let Services = Reflect.getMetadata(SERVICE, Reflect) || [];
    let newMetadata = [target].concat(Services);
    Reflect.defineMetadata(SERVICE, newMetadata, Reflect);
  };
}
