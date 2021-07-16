import { Container } from 'inversify';
import Daruk from './daruk';
declare const darukContainer: Container;
declare const DarukServer: (options?: RecursivePartial<Options> | undefined) => Daruk;
export { darukContainer, DarukServer };
