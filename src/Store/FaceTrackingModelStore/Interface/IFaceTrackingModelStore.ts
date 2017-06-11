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
	getCurrentParameters (): number[];
	getConvergence(): number;
	draw (canvas: HTMLCanvasElement): void;
	stop (): void;
	getWebGLContext(canvas: HTMLCanvasElement): WebGLRenderingContext;
	loadShader (context: WebGLRenderingContext, program: string, kind: number): WebGLShader;
	createProgram (context: WebGLRenderingContext, shaders: WebGLShader[]): WebGLProgram;
}

export interface IFaceTrackingConstructorOptions {
	useWebGL: boolean;
}

export interface IFaceTrackingWrapper {
	tracker: new (options?: IFaceTrackingConstructorOptions) => IFaceTrackingTracker;
}

export interface IFaceTrackingModelStore extends IStore {
	getTracker (): Promise<IFaceTrackingTracker>;
	clearTracker (): void;
	getModel (model: keyof ITrackerModelPath): Promise<IFaceTrackingModel>;
}