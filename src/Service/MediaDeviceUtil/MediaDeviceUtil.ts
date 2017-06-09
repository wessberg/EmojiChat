import {CameraFacingKind, IMediaDevice, IMediaDeviceUtil, IMediaStream, IMediaStreamConstraints, MediaStreamKind} from "./Interface/IMediaDeviceUtil";

export class MediaDeviceUtil implements IMediaDeviceUtil {
	private devices: IMediaDevice[]|null = null;

	public async hasMicrophone (): Promise<boolean> {
		const devices = await this.getDevices();
		return this.filterDevices(devices, "audioinput").length > 0;
	}

	public async hasCamera (): Promise<boolean> {
		const devices = await this.getDevices();
		return this.filterDevices(devices, "videoinput").length > 0;
	}

	public async getCameraFacingKinds (): Promise<CameraFacingKind[]> {
		const devices = await this.getDevices();
		const amount = this.filterDevices(devices, "videoinput").length;
		if (amount === 0) return [];
		if (amount === 1) return [CameraFacingKind.FRONT]; // This is under the assumption that cameras on devices with only 1 camera will always be front-facing.
		return [CameraFacingKind.FRONT, CameraFacingKind.REAR];
	}

	public async getStream ({audio, video}: IMediaStreamConstraints): Promise<IMediaStream> {

		// Normalize the constraints.
		const constraints: MediaStreamConstraints = {
			audio: audio == null ? false : <any>{
				echoCancellation: true
			},
			video: video == null ? false : {
				facingMode: CameraFacingKind[video]
			}
		};

		// Get the stream
		const stream = await navigator.mediaDevices.getUserMedia(constraints);

		// Return the stream and the kind of it.
		return {
			stream,
			kind: this.getKind({audio, video})
		};
	}

	private async getDevices (refresh: boolean = false): Promise<IMediaDevice[]> {
		if (this.devices != null && !refresh) return this.devices;
		const devices = <IMediaDevice[]> await navigator.mediaDevices.enumerateDevices();
		this.devices = devices;
		return devices;
	}

	private filterDevices (devices: IMediaDevice[], match: string): IMediaDevice[] {
		return devices.filter(device => device.kind === match);
	}

	private getKind ({audio, video}: IMediaStreamConstraints): MediaStreamKind {
		if (audio != null && audio && video != null && video) return MediaStreamKind.AUDIO_AND_VIDEO;
		if (audio != null && audio && !video) return MediaStreamKind.AUDIO;
		if (!audio && video != null && video) return MediaStreamKind.VIDEO;
		throw TypeError(`${this.constructor.name} could not decide a MediaStreamKind: Neither audio nor video was requested!`);
	}
}