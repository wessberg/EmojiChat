import {CameraFacingKind, IMediaStreamConstraints} from "../../MediaDeviceUtil/Interface/IMediaDeviceUtil";
import {IVideoComponent} from "../../../Component/VideoComponent/Interface/IVideoComponent";

export interface IMediaStreamUtil {
	startStream (videoElement: IVideoComponent, constraints?: IMediaStreamConstraints): Promise<void>;
	startAudioStream (videoElement: IVideoComponent): Promise<void>;
	startVideoAndAudioStream (videoElement: IVideoComponent, facing: CameraFacingKind): Promise<void>;
	startVideoStream (videoElement: IVideoComponent, facing: CameraFacingKind): Promise<void>;
	stopStream (videoElement: IVideoComponent): Promise<void>;
	disableStream (stream: MediaStream): void;
	enableStream (stream: MediaStream): void;
	disableAudioStream (stream: MediaStream): void;
	enableAudioStream (stream: MediaStream): void;
	enableStream (stream: MediaStream): void;
	disableVideoStream (stream: MediaStream): void;
	enableVideoStream (stream: MediaStream): void;
}