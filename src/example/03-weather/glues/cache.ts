// @ts-ignore
import { fluentProvide } from '../../..';

@(fluentProvide('Cache')
  .inSingletonScope()
  .done())
export default class Cache {
  public store: any;
  public constructor() {
    this.store = {};
  }
  public set(key: string, data: any) {
    this.store[key] = data;
  }
  public get(key: string) {
    return this.store[key];
  }
}
