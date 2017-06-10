import {IEmotionModel} from "../../../Model/EmotionModel/Interface/IEmotionModel";

export enum EmotionPredictionPrecisionKind {
	MAYBE, CERTAIN
}

export interface IEmotionPrediction {
	emotion: string;
	value: number;
	precision: EmotionPredictionPrecisionKind;
}

export interface IEmotionClassifierUtil {
	init (model: IEmotionModel): void;
	getBlank (): IEmotionPrediction[];
	meanPredict (parameters: number[]): IEmotionPrediction[]|boolean;
}