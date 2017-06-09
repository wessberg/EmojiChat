import {IComposite} from "../../Composite/Interface/IComposite";

export interface ICoordinates {
	offsetX: number;
	offsetY: number;
}

export interface IFeedbackComposite extends IComposite {
	pointerDown: boolean;
	initialWaitTime: number;
	complexAnimating: boolean;
	oneShotAnimating: boolean;
	oneShotAnimationDuration: number;
	lastCoordinates: ICoordinates|null;
	onPointerDown (e?: PointerEvent): Promise<void>;
	onPointerUp (e?: PointerEvent): Promise<void>;
	onPointerCancel (e?: PointerEvent): Promise<void>;
	onPointerLeave (e?: PointerEvent): Promise<void>;
	onPointerTap (e?: MouseEvent): Promise<void>;
}