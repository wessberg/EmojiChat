export declare type IEmotion = "angry"|"disgusted"|"fear"|"sad"|"surprised"|"happy";

export interface IEmotionAttributes {
	bias: number;
	coefficients: number[];
}

export interface IEmotionModel {
	[key: string]: IEmotionAttributes;
}