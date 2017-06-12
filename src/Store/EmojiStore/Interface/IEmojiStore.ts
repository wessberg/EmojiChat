import {ISortOptions, IStore} from "../../Store/Interface/IStore";
import {IEmoji, IEmojiDict} from "../../../Model/Emoji/Interface/IEmoji";

export interface IEmojiStore extends IStore {
	readEmojis (sortOptions?: ISortOptions<IEmoji>): IEmoji[];
	readEmoji (id: number): IEmoji|null;
	createEmoji (emoji: IEmojiDict): IEmoji;
	deleteEmoji (id: number): boolean;
	getNewEmojis (existing: IEmoji[], sortOptions?: ISortOptions<IEmoji>): IEmoji[];
}