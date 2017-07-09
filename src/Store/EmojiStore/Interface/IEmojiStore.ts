import {ISortOptions, IStore} from "../../Store/Interface/IStore";
import {IEmoji, IEmojiDict} from "../../../Model/Emoji/Interface/IEmoji";

export interface IEmojiStore extends IStore {
	readEmojis (sortOptions?: ISortOptions<IEmoji>): Promise<IEmoji[]>;
	readEmoji (id: string): Promise<IEmoji|undefined>;
	createEmoji (emoji: IEmojiDict): Promise<IEmoji>;
	deleteEmoji (id: string): Promise<boolean>;
	onEmojiAdded (handler: (emoji: IEmoji) => void): void;
	onEmojiRemoved (handler: (emoji: IEmoji) => void): void;
}