import { ValidatorOptions } from 'class-validator';
import { Constructor, method, ParseType, validateFunc } from '../typings/daruk';
export declare function validate(method: method, key: string, validateFunc: validateFunc): (proto: Object, propertyKey: string, descriptor: PropertyDescriptor) => void;
export declare function required(config: {
    body?: string[];
    query?: string[];
    params?: string[];
}): (proto: Object, propertyKey: string, descriptor: PropertyDescriptor) => void;
export declare function typeParse(config: {
    body?: ParseType;
    query?: ParseType;
    params?: ParseType;
}): (proto: Object, propertyKey: string, descriptor: PropertyDescriptor) => void;
export declare function RequestBody(entity: Constructor, validatorOptions?: ValidatorOptions): (target: any, propertyKey: string, index: number) => void;
