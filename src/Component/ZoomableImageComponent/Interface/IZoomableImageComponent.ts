import {IImageComponent} from "../../ImageComponent/Interface/IImageComponent";

export interface IZoomableImageComponent extends IImageComponent {
	toggleZoom (): Promise<void>;
}