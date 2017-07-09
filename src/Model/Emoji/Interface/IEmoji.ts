export interface IEmojiDict {
	base64Src: string;
	date: Date;
	owner: string;
}

export interface IEmoji extends IEmojiDict {
	id: string;
}