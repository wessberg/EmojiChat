import {IStore} from "../../Store/Interface/IStore";
import {GuideKind, IGuide, IGuideDict} from "../../../Model/Guide/Interface/IGuide";

export interface IGuideStore extends IStore {
	getGuides (): IGuide[];
	getGuide (id: number): IGuide;
	getGuideFromKind (kind: GuideKind): IGuide;
	createGuide (guide: IGuideDict): IGuide;
	createDefaultGuides (guides: IGuideDict[]): IGuide[];
	hasSeenGuide (kind: GuideKind): boolean;
	updateGuide (id: number, guide: IGuide): boolean;
}