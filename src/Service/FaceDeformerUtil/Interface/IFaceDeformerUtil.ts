import {IFaceTrackingModel, IFaceTrackingTracker} from "../../../Store/FaceTrackingModelStore/Interface/IFaceTrackingModelStore";

export declare type IFaceDeformerElement = HTMLElement & {width: number, height: number};

export interface IFaceDeformerUtil {
	init (canvas: HTMLCanvasElement, tracker: IFaceTrackingTracker): void;
	load (element: IFaceDeformerElement, points: number[][], model: IFaceTrackingModel, vertices?: number[][]): void;
	draw (points: number[][]): void;
	drawGrid (points: number[][]): void;
	clear (): void;
	calculatePositions (parameters: number[], useTransforms: boolean): [number, number][];
}