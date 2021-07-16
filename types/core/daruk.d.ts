/// <reference types="node" />
import KoaLogger = require('daruk-logger');
import { EventEmitter } from 'events';
import Koa = require('koa');
import { ListenOptions } from 'net';
declare class Daruk extends EventEmitter {
    [key: string]: any;
    name: string;
    app: Koa;
    httpServer: DarukType.Server;
    logger: KoaLogger.logger;
    options: Options;
    constructor();
    _initOptions(options?: PartialOptions): void;
    loadFile(path: string): Promise<void>;
    binding(): Promise<void>;
    mockContext(req?: {}): Koa.ParameterizedContext<Koa.DefaultState, Koa.DefaultContext>;
    listen(port?: number, hostname?: string, backlog?: number, listeningListener?: () => void): DarukType.Server;
    listen(port: number, hostname?: string, listeningListener?: () => void): DarukType.Server;
    listen(port: number, backlog?: number, listeningListener?: () => void): DarukType.Server;
    listen(port: number, listeningListener?: () => void): DarukType.Server;
    listen(path: string, backlog?: number, listeningListener?: () => void): DarukType.Server;
    listen(path: string, listeningListener?: () => void): DarukType.Server;
    listen(handle: any, backlog?: number, listeningListener?: () => void): DarukType.Server;
    listen(handle: any, listeningListener?: () => void): DarukType.Server;
    listen(options: ListenOptions, listeningListener?: () => void): DarukType.Server;
    prettyLog(msg: string, ext?: {
        type?: string;
        level?: string;
        init?: boolean;
    }): void;
    private _loadFile;
}
export default Daruk;
