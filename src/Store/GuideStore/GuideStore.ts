import {Store} from "../Store/Store";
import {IGuideStore} from "./Interface/IGuideStore";
import {GuideKind, IGuide, IGuideDict} from "../../Model/Guide/Interface/IGuide";
import {syncdb} from "../../Service/Services";

export class GuideStore extends Store implements IGuideStore {
	private static readonly GUIDE_STORE_NAME: string = "guide";
	private isReady: boolean = false;
	private readySubscribers: Set<(() => void)> = new Set();

	constructor (guides?: IGuideDict[]) {
		super();
		if (guides != null) this.createDefaultGuides(guides).then();
	}

	public async createDefaultGuides (guides: IGuideDict[]): Promise<IGuide[]> {
		await syncdb.addStore(GuideStore.GUIDE_STORE_NAME);
		const guideEntries = await Promise.all(guides.map(async guide => {
			try {
				return await this.getGuideFromKind(guide.kind);
			} catch (ex) {
				// The guide doesn't exist.
				return await this.createGuide(guide);
			}
		}));
		this.isReady = true;
		this.readySubscribers.forEach(subscriber => subscriber());
		this.readySubscribers.clear();
		return guideEntries;
	}

	public async createGuide (guide: IGuideDict): Promise<IGuide> {
		return await syncdb.add<IGuide>(GuideStore.GUIDE_STORE_NAME, <IGuide>guide, true);
	}

	public async getGuides (): Promise<IGuide[]> {
		return await syncdb.getAll<IGuide>(GuideStore.GUIDE_STORE_NAME);
	}

	public async getGuide (id: string): Promise<IGuide> {
		const entry = await syncdb.get<IGuide>(GuideStore.GUIDE_STORE_NAME, id);
		if (entry == null) throw new ReferenceError(`${this.constructor.name} could not find a guide with id: ${id}`);
		return entry;
	}

	public async getGuideFromKind (kind: GuideKind): Promise<IGuide> {
		const entry = await syncdb.find<IGuide>(GuideStore.GUIDE_STORE_NAME, guide => guide.kind === kind);
		if (entry == null) throw new ReferenceError(`${this.constructor.name} could not find a matching guide with kind: ${GuideKind[kind]}`);
		return entry;
	}

	public async hasSeenGuide (kind: GuideKind): Promise<boolean> {
		try {
			const guide = await this.getGuideFromKind(kind);
			return guide == null ? false : guide.seen;
		} catch (ex) {
			return false;
		}
	}

	public async updateGuide (id: string, guide: IGuide): Promise<boolean> {
		await syncdb.put<IGuide>(GuideStore.GUIDE_STORE_NAME, id, guide, true);
		return true;
	}

}