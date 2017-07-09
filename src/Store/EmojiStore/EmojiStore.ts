import {Store} from "../Store/Store";
import {IEmojiStore} from "./Interface/IEmojiStore";
import {IEmoji, IEmojiDict} from "../../Model/Emoji/Interface/IEmoji";
import {syncdb} from "../../Service/Services";
import {ISortOptions} from "../Store/Interface/IStore";
import {LocalDBChangeKind} from "@wessberg/localdb-common";

export class EmojiStore extends Store implements IEmojiStore {
	private static readonly EMOJI_STORE_NAME: string = "emoji";

	public onEmojiAdded (handler: (emoji: IEmoji) => void): void {
		syncdb.observe(change => {
			if (change.changeKind === LocalDBChangeKind.ADD && change.store.name === EmojiStore.EMOJI_STORE_NAME) {
				handler(change.value);
			}
		});
	}

	public onEmojiRemoved (handler: (emoji: IEmoji) => void): void {
		syncdb.observe(change => {
			if (change.changeKind === LocalDBChangeKind.DELETE && change.store.name === EmojiStore.EMOJI_STORE_NAME) {
				handler(change.value);
			}
		});
	}

	public async readEmojis (sortOptions?: ISortOptions<IEmoji>): Promise<IEmoji[]> {
		const hasStore = await syncdb.hasStore(EmojiStore.EMOJI_STORE_NAME);
		if (!hasStore) return [];
		const emojis = await syncdb.getAll<IEmoji>(EmojiStore.EMOJI_STORE_NAME);
		if (sortOptions == null) return emojis;
		return this.sortEmojis(emojis, sortOptions);
	}

	public async readEmoji (id: string): Promise<IEmoji|undefined> {
		const hasStore = await syncdb.hasStore(EmojiStore.EMOJI_STORE_NAME);
		if (!hasStore) return undefined;
		return await syncdb.get<IEmoji>(EmojiStore.EMOJI_STORE_NAME, id);
	}

	public async createEmoji (emoji: IEmojiDict): Promise<IEmoji> {
		return await syncdb.add<IEmoji>(EmojiStore.EMOJI_STORE_NAME, <IEmoji>emoji);
	}

	public async deleteEmoji (id: string): Promise<boolean> {
		const result = await syncdb.remove(EmojiStore.EMOJI_STORE_NAME, id);
		return result != null;
	}

	private sortEmojis (emojis: IEmoji[], sortOptions: ISortOptions<IEmoji>): IEmoji[] {
		return emojis.sort((a, b) => {
			if (a[sortOptions.key] < b[sortOptions.key]) return sortOptions.reverse ? 1 : -1;
			if (a[sortOptions.key] > b[sortOptions.key]) return sortOptions.reverse ? -1 : 1;
			return 0;
		});
	}

}