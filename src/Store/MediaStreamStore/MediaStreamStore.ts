import {Store} from "../Store/Store";
import {IMediaStreamStore} from "./Interface/IMediaStreamStore";
import {MediaPermissionKind} from "../../Model/MediaPermission/Interface/IMediaPermission";
import {CameraFacingKind, IMediaStream} from "../../Service/MediaDeviceUtil/Interface/IMediaDeviceUtil";

export class MediaStreamStore extends Store implements IMediaStreamStore {
	private stream: IMediaStream|null = null;
	private cameraPermission: MediaPermissionKind|null = null;
	private microphonePermission: MediaPermissionKind|null = null;
	private cameraFacing: CameraFacingKind|null;

	public getStream (): IMediaStream|null {
		return this.stream;
	}

	public setStream (stream: IMediaStream|null): void {
		this.stream = stream;
	}

	public getCameraFacing (): CameraFacingKind|null {
		return this.cameraFacing;
	}

	public setCameraFacing (facing: CameraFacingKind|null): void {
		this.cameraFacing = facing;
	}

	public setCameraPermission (permission: MediaPermissionKind): void {
		this.cameraPermission = permission;
	}

	public setMicrophonePermission (permission: MediaPermissionKind): void {
		this.microphonePermission = permission;
	}

	public hasCameraPermission (): boolean {
		return this.cameraPermission === MediaPermissionKind.GRANTED;
	}

	public hasVideoPermission (): boolean {
		return this.microphonePermission === MediaPermissionKind.GRANTED;
	}
}