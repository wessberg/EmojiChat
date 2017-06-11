import {IComposite} from "../../Composite/Interface/IComposite";

export interface IZoomableComposite extends IComposite {
	toggleZoom (e?: MouseEvent): Promise<void>;
}