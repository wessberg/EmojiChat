export enum GuideKind {
	WELCOME, GALLERY
}

export interface IGuideDict {
	kind: GuideKind;
	seen: boolean;
}

export interface IGuide extends IGuideDict {
	id: string;
}