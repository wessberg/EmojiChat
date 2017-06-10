import {Store} from "../Store/Store";
import {IEmotionModelStore} from "./Interface/IEmotionModelStore";
import {IEmotionAttributes, IEmotionModel} from "../../Model/EmotionModel/Interface/IEmotionModel";

export class EmotionModelStore extends Store implements IEmotionModelStore {
	private model: IEmotionModel|null = null;

	constructor (model?: IEmotionModel|null) {
		super();
		if (model !== undefined) this.setModel(model);
	}

	public getModel (): IEmotionModel|null {
		return this.model;
	}

	public setModel (model: IEmotionModel|null): void {
		this.model = model;
	}

	public getAttributesForModel (model: string): IEmotionAttributes {
		if (this.model == null || this.model[model] == null) {
			throw new ReferenceError(`${this.constructor.name} could not find any emotion with that name in the model!`);
		}

		return this.model[model];
	}
}