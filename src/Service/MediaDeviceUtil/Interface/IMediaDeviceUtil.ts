export enum CameraFacingKind {
	FRONT = <any>"user",
	REAR = <any>"environment"
}

export enum MediaStreamKind {
	AUDIO, VIDEO, AUDIO_AND_VIDEO
}

export interface IMediaStreamConstraints {
	audio?: boolean;
	video?: CameraFacingKind;
}

export interface IMediaStream {
	stream: MediaStream;
	kind: MediaStreamKind;
}

export interface IMediaDevice {
	kind: string;
}

export interface IMediaDeviceUtil {
	getStream (constraints: IMediaStreamConstraints): Promise<IMediaStream>;
	hasMicrophone (): Promise<boolean>;
	hasCamera (): Promise<boolean>;
	getCameraFacingKinds (): Promise<CameraFacingKind[]>;

}