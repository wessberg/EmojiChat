export interface IEmojiDict {
	base64Src: string;
	date: Date;
}

export interface IEmoji extends IEmojiDict {
	id: number;
}