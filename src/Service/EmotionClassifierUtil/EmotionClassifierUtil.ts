import {EmotionPredictionPrecisionKind, IEmotionClassifierUtil, IEmotionPrediction} from "./Interface/IEmotionClassifierUtil";
import {IEmotion, IEmotionModel} from "../../Model/EmotionModel/Interface/IEmotionModel";

export class EmotionClassifierUtil implements IEmotionClassifierUtil {
	private static readonly PREVIOUS_PARAMETERS_LIMIT = 10;
	private static readonly CERTAIN_PRECISION_THRESHOLD = 0.6;
	private previousParameters: number[][] = [];
	private coefficientLength: number = 0;
	private emotions: IEmotion[];
	private model: IEmotionModel;

	constructor (model?: IEmotionModel|null) {
		if (model != null) this.init(model);
	}

	public init (model: IEmotionModel): void {
		this.emotions = <IEmotion[]>Object.keys(model);
		this.model = model;
		this.coefficientLength = this.model[this.emotions[0]].coefficients.length;
	}

	public getBlank (): IEmotionPrediction[] {
		return this.emotions.map(emotion => ({emotion, value: 0.0, precision: EmotionPredictionPrecisionKind.MAYBE}));
	}

	public meanPredict (parameters: number[]): IEmotionPrediction[]|boolean {
		this.previousParameters.splice(0, this.previousParameters.length === EmotionClassifierUtil.PREVIOUS_PARAMETERS_LIMIT ? 1 : 0);
		this.previousParameters.push(parameters.slice(0));

		if (this.previousParameters.length > (EmotionClassifierUtil.PREVIOUS_PARAMETERS_LIMIT - 1)) {
			const meanParameters: number[] = parameters.map(() => 0);

			for (let i = 0; i < this.previousParameters.length; i++) {
				for (let j = 0; j < parameters.length; j++) {
					meanParameters[j] += this.previousParameters[i][j];
				}
			}
			parameters.forEach((_, index) => meanParameters[index] /= EmotionClassifierUtil.PREVIOUS_PARAMETERS_LIMIT);
			return this.predict(meanParameters);

		} else return false;
	}

	private predict (parameters: number[]): IEmotionPrediction[] {
		return this.emotions.map(emotion => {
			const model = this.model[emotion];
			let score = model.bias;
			for (let i = 0; i < this.coefficientLength; i++) {
				score += model.coefficients[i] * parameters[i + 6];
			}
			const value = 1.0 / (1.0 + Math.exp(-score));
			const precision = value >= EmotionClassifierUtil.CERTAIN_PRECISION_THRESHOLD
				? EmotionPredictionPrecisionKind.CERTAIN : EmotionPredictionPrecisionKind.MAYBE;
			return {emotion, value, precision};
		});
	}

}