import {IMediaComponent} from "../../MediaComponent/Interface/IMediaComponent";

export interface IVideoComponent extends IMediaComponent {
	srcObject: MediaStream|null;
	play (): Promise<void>;
	pause (): Promise<void>;
	stop (): Promise<void>;
	nativeVideoElement: HTMLVideoElement;
}