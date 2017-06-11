import {IMediaComponent} from "../../MediaComponent/Interface/IMediaComponent";

export interface IVideoComponent extends IMediaComponent {
	srcObject: MediaStream|null;
	nativeVideoElement: HTMLVideoElement;
	play (): Promise<void>;
	pause (): Promise<void>;
	stop (): Promise<void>;
}