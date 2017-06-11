import {Store} from "../Store/Store";
import {IEmojiStore} from "./Interface/IEmojiStore";
import {IEmoji, IEmojiDict} from "../../Model/Emoji/Interface/IEmoji";
import {CollectionKind} from "../../Service/StorageUtil/Interface/IStorageUtil";
import {storageUtil} from "../../Service/Services";
import {ISortOptions} from "../Store/Interface/IStore";

export class EmojiStore extends Store implements IEmojiStore {
	private static readonly EMOJI_COLLECTION: CollectionKind = "emoji";

	public async getNewEmojis (existing: IEmoji[], sortOptions?: ISortOptions<IEmoji>): Promise<IEmoji[]> {
		const allEmojis = storageUtil.getAll<IEmoji>(EmojiStore.EMOJI_COLLECTION);

		const filtered = allEmojis.filter(emoji => existing.find(existing => existing.id === emoji.id) == null);
		return sortOptions == null ? filtered : this.sortEmojis(filtered, sortOptions);
	}

	public async readEmojis (sortOptions?: ISortOptions<IEmoji>): Promise<IEmoji[]> {
		const emojis = storageUtil.getAll<IEmoji>(EmojiStore.EMOJI_COLLECTION);
		if (sortOptions == null) return emojis;
		return this.sortEmojis(emojis, sortOptions);
	}

	readEmoji (id: number): IEmoji|null {
		return storageUtil.get<IEmoji>(id, EmojiStore.EMOJI_COLLECTION);
	}

	createEmoji (emoji: IEmojiDict): IEmoji {
		return storageUtil.add<IEmojiDict>(emoji, EmojiStore.EMOJI_COLLECTION);
	}

	deleteEmoji (id: number): boolean {
		return storageUtil.remove(id, EmojiStore.EMOJI_COLLECTION);
	}

	private sortEmojis (emojis: IEmoji[], sortOptions: ISortOptions<IEmoji>): IEmoji[] {
		return emojis.sort((a, b) => {
			if (a[sortOptions.key] < b[sortOptions.key]) return sortOptions.reverse ? 1 : -1;
			if (a[sortOptions.key] > b[sortOptions.key]) return sortOptions.reverse ? -1 : 1;
			return 0;
		});
	}

}