export enum GuideKind {
	WELCOME
}

export interface IGuideDict {
	kind: GuideKind;
	seen: boolean;
}

export interface IGuide extends IGuideDict {
	id: number;
}