import {IStore} from "../../Store/Interface/IStore";
import {ITrackerModelPath} from "../../../../Resource/Interface/IResource";

export interface IFaceTrackingModel {
	hints: {
		leftEye: number[];
		nose: number[];
		rightEye: number[];
	};
	patchModel: {
		canvasSize: number[];
		numPatches: number;
		patchSizes: number[];
		patchType: string;
		weights: number[][];
	};
	path: {
		normal: number[][];
		vertices: number[][];
	};
	scoring: {
		bias: number;
		coef: number[];
		size: number[];
	},
	shapeModel: {
		eigenValues: number[];
		eigenVectors: number[][];
		meanShape: number[][];
		nonRegularizedVectors: number[];
		numEvalues: number;
		numPtsPerSample: number;
	};
}

export interface IFaceTrackingTracker {
	init(model: IFaceTrackingModel): void;
	start (videoElement: HTMLVideoElement): void;
	getCurrentPosition (): number[][];
	draw (canvas: HTMLCanvasElement): void;
}

export interface IFaceTrackingWrapper {
	tracker: new () => IFaceTrackingTracker;
}

export interface IFaceTrackingModelStore extends IStore {
	getTracker (): Promise<IFaceTrackingTracker>;
	getModel (model: keyof ITrackerModelPath): Promise<IFaceTrackingModel>;
}