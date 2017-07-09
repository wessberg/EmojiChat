import {IStore} from "../../Store/Interface/IStore";

export interface IFingerprintStore extends IStore {
	getFingerPrint (): Promise<string>
}