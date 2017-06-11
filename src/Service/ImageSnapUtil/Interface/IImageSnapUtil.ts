import {IEmotion} from "../../../Model/EmotionModel/Interface/IEmotionModel";

export interface IEmojiPlacement {
	top: number;
	left: number;
	width: number;
	height: number;
	emotion: IEmotion|null;
}

export interface IImageSnapUtil {
	takePicture (videoElement: HTMLVideoElement, placement: IEmojiPlacement): Promise<string>;
}