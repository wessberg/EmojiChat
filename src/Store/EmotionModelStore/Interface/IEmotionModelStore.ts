import {IStore} from "../../Store/Interface/IStore";
import {IEmotionAttributes, IEmotionModel} from "../../../Model/EmotionModel/Interface/IEmotionModel";

export interface IEmotionModelStore extends IStore {
	getModel (): IEmotionModel|null;
	setModel (model: IEmotionModel|null): void;
	getAttributesForModel (model: string): IEmotionAttributes;
}