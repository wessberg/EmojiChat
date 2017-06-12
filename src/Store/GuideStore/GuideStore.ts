import {Store} from "../Store/Store";
import {IGuideStore} from "./Interface/IGuideStore";
import {CollectionKind} from "../../Service/StorageUtil/Interface/IStorageUtil";
import {GuideKind, IGuide, IGuideDict} from "../../Model/Guide/Interface/IGuide";
import {storageUtil} from "../../Service/Services";

export class GuideStore extends Store implements IGuideStore {

	constructor (guides?: IGuideDict[]) {
		super();
		if (guides != null) this.createDefaultGuides(guides);
	}

	public createDefaultGuides (guides: IGuideDict[]): IGuide[] {
		return guides.map(guide => {
			try {
				return this.getGuideFromKind(guide.kind);
			} catch (ex) {
				// The guide doesn't exist.
				return this.createGuide(guide);
			}
		});
	}
	private static readonly GUIDE_COLLECTION: CollectionKind = "guide";

	public createGuide (guide: IGuideDict): IGuide {
		return storageUtil.add<IGuideDict>(guide, GuideStore.GUIDE_COLLECTION);
	}

	public getGuides (): IGuide[] {
		return storageUtil.getAll<IGuide>(GuideStore.GUIDE_COLLECTION);
	}

	public getGuide (id: number): IGuide {
		const entry = storageUtil.get<IGuide>(id, GuideStore.GUIDE_COLLECTION);
		if (entry == null) throw new ReferenceError(`${this.constructor.name} could not find a guide with id: ${id}`);
		return entry;
	}

	public getGuideFromKind (kind: GuideKind): IGuide {
		const guides = this.getGuides();
		const entry = guides.find(guide => guide.kind === kind) || null;
		if (entry == null) throw new ReferenceError(`${this.constructor.name} could not find a matching guide with kind: ${GuideKind[kind]}`);
		return entry;
	}

	public hasSeenGuide (kind: GuideKind): boolean {
		try {
			const guide = this.getGuideFromKind(kind);
			return guide == null ? false : guide.seen;
		} catch (ex) {
			return false;
		}
	}

	public updateGuide (id: number, guide: IGuide): boolean {
		return storageUtil.update<IGuide>(id, guide, GuideStore.GUIDE_COLLECTION);
	}

}