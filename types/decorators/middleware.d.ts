export declare function middleware(middlewareName: string, options?: {
    [key: string]: any;
}): (target: Object, propertyKey: string, descriptor: PropertyDescriptor) => void;
export declare function defineMiddleware(middlewareName: string): (target: DarukType.Constructor) => void;
