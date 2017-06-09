import {IStore} from "../../Store/Interface/IStore";
import {MediaPermissionKind} from "../../../Model/MediaPermission/Interface/IMediaPermission";
import {CameraFacingKind, IMediaStream} from "../../../Service/MediaDeviceUtil/Interface/IMediaDeviceUtil";

export interface IMediaStreamStore extends IStore {
	getStream (): IMediaStream|null;
	setStream (stream: IMediaStream|null): void;
	setCameraFacing (facing: CameraFacingKind|null): void;
	getCameraFacing (): CameraFacingKind|null;
	setCameraPermission (permission: MediaPermissionKind): void;
	setMicrophonePermission (permission: MediaPermissionKind): void;
	hasCameraPermission (): boolean;
	hasVideoPermission (): boolean;
}