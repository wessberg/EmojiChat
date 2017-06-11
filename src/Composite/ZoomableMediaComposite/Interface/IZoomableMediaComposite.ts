import {IZoomableComposite} from "../../ZoomableComposite/Interface/IZoomableComposite";
import {IMediaComponent} from "../../../Component/MediaComponent/Interface/IMediaComponent";
import {IZoomable} from "../../../Discriminator/Zoomable/Interface/IZoomable";

export interface IZoomableMediaComposite extends IZoomableComposite {
	target: (IMediaComponent&IZoomable);
}