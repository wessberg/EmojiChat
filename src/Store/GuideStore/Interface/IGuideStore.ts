import {IStore} from "../../Store/Interface/IStore";
import {GuideKind, IGuide, IGuideDict} from "../../../Model/Guide/Interface/IGuide";

export interface IGuideStore extends IStore {
	getGuides (): Promise<IGuide[]>;
	getGuide (id: string): Promise<IGuide>;
	getGuideFromKind (kind: GuideKind): Promise<IGuide>;
	createGuide (guide: IGuideDict): Promise<IGuide>;
	createDefaultGuides (guides: IGuideDict[]): Promise<IGuide[]>;
	hasSeenGuide (kind: GuideKind): Promise<boolean>;
	updateGuide (id: string, guide: IGuide): Promise<boolean>;
}