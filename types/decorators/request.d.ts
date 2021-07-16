export declare function required(config: {
    body?: string[];
    query?: string[];
    params?: string[];
}): (proto: Object, propertyKey: string, descriptor: PropertyDescriptor) => void;
export declare function typeParse(config: {
    body?: DarukType.ParseType;
    query?: DarukType.ParseType;
    params?: DarukType.ParseType;
}): (proto: Object, propertyKey: string, descriptor: PropertyDescriptor) => void;
