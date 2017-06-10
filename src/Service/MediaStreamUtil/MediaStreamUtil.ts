import {IMediaStreamUtil} from "./Interface/IMediaStreamUtil";
import {CameraFacingKind, IMediaStreamConstraints} from "../MediaDeviceUtil/Interface/IMediaDeviceUtil";
import {mediaDeviceUtil, mediaStreamStore} from "../Services";
import {IVideoComponent} from "../../Component/VideoComponent/Interface/IVideoComponent";
import {MediaPermissionKind} from "../../Model/MediaPermission/Interface/IMediaPermission";

export class MediaStreamUtil implements IMediaStreamUtil {
	public disableStream (stream: MediaStream): void {
		const tracks = stream.getTracks();
		tracks.forEach(track => track.enabled = false);
	}

	public enableStream (stream: MediaStream): void {
		const tracks = stream.getTracks();
		tracks.forEach(track => track.enabled = true);
	}

	public disableAudioStream (stream: MediaStream): void {
		const tracks = stream.getAudioTracks();
		tracks.forEach(track => track.enabled = false);
	}

	public enableAudioStream (stream: MediaStream): void {
		const tracks = stream.getAudioTracks();
		tracks.forEach(track => track.enabled = true);
	}

	public disableVideoStream (stream: MediaStream): void {
		const tracks = stream.getVideoTracks();
		tracks.forEach(track => track.enabled = false);
	}

	public enableVideoStream (stream: MediaStream): void {
		const tracks = stream.getVideoTracks();
		tracks.forEach(track => track.enabled = true);
	}

	public async startStream (videoElement: IVideoComponent, constraints?: IMediaStreamConstraints): Promise<void> {
		if (constraints == null) return await this.startInitialStream(videoElement);

		if (constraints.audio && constraints.video != null) return await this.startVideoAndAudioStream(videoElement, constraints.video);
		if (constraints.audio && !constraints.video) return await this.startAudioStream(videoElement);
		if (!constraints.audio && constraints.video != null) return await this.startVideoStream(videoElement, constraints.video);
		throw new ReferenceError(`${this.constructor.name} could not start a stream: Neither audio nor video was requested!`);
	}

	public async stopStream (videoElement: IVideoComponent): Promise<void> {
		const stream = mediaStreamStore.getStream();

		// If there is no stream, there is nothing to stop!
		if (stream == null) return;

		stream.stream.getTracks().forEach(track => track.stop());
		await videoElement.stop();
		videoElement.srcObject = null;
		mediaStreamStore.setCameraFacing(null);
	}

	private async startInitialStream (videoElement: IVideoComponent): Promise<void> {
		const constraints = await this.getInitialConstraints();
		if (constraints == null) return; // The browser doesn't support neither audio nor video.

		await this.startStream(videoElement, constraints);
	}

	private async getInitialConstraints (): Promise<IMediaStreamConstraints|null> {
		const hasCamera = await mediaDeviceUtil.hasCamera();
		const hasMicrophone = await mediaDeviceUtil.hasMicrophone();
		if (hasCamera && hasMicrophone) return {audio: true, video: CameraFacingKind.FRONT};
		if (hasCamera && !hasMicrophone) return {audio: false, video: CameraFacingKind.FRONT};
		if (!hasCamera && hasMicrophone) return {audio: true};
		return null;
	}

	public async startVideoStream (videoElement: IVideoComponent, facing: CameraFacingKind): Promise<void> {
		await this.stopStream(videoElement);
		try {
			const stream = await mediaDeviceUtil.getStream({video: facing});
			mediaStreamStore.setStream(stream);
			mediaStreamStore.setCameraPermission(MediaPermissionKind.GRANTED);
			mediaStreamStore.setCameraFacing(facing);
			videoElement.srcObject = stream.stream;
			await videoElement.play();
		} catch (ex) {

			// The user denied the request.
			mediaStreamStore.setCameraPermission(MediaPermissionKind.DENIED);
			throw ex;
		}
	}

	public async startVideoAndAudioStream (videoElement: IVideoComponent, facing: CameraFacingKind): Promise<void> {
		await this.stopStream(videoElement);
		try {
			const stream = await mediaDeviceUtil.getStream({audio: true, video: facing});
			mediaStreamStore.setStream(stream);
			mediaStreamStore.setCameraPermission(MediaPermissionKind.GRANTED);
			mediaStreamStore.setMicrophonePermission(MediaPermissionKind.GRANTED);
			mediaStreamStore.setCameraFacing(facing);
			videoElement.srcObject = stream.stream;
			await videoElement.play();
		} catch (ex) {
			// The user denied the request.
			mediaStreamStore.setCameraPermission(MediaPermissionKind.DENIED);
			mediaStreamStore.setMicrophonePermission(MediaPermissionKind.DENIED);
			throw ex;
		}
	}

	public async startAudioStream (videoElement: IVideoComponent): Promise<void> {
		await this.stopStream(videoElement);
		try {
			const stream = await mediaDeviceUtil.getStream({audio: true});
			mediaStreamStore.setStream(stream);
			mediaStreamStore.setMicrophonePermission(MediaPermissionKind.GRANTED);
			mediaStreamStore.setCameraFacing(null);
			videoElement.srcObject = stream.stream;
			await videoElement.play();
		} catch (ex) {
			// The user denied the request.
			mediaStreamStore.setMicrophonePermission(MediaPermissionKind.DENIED);
			throw ex;
		}
	}
}