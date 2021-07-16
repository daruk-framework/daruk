export declare function controller(middlewares?: [{
    middlewareName: string;
    options?: {
        [key: string]: any;
    };
}]): (target: DarukType.Constructor) => void;
export declare function priority(priority: number): (target: DarukType.Constructor) => void;
