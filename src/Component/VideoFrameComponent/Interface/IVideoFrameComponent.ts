import {IComponent} from "../../Component/IComponent";
import {CameraFacingKind} from "../../../Service/MediaDeviceUtil/Interface/IMediaDeviceUtil";

export interface IVideoFrameComponent extends IComponent {
	startAudioStream (facing?: CameraFacingKind|null): Promise<void>;
	startVideoAndAudioStream (facing?: CameraFacingKind|null): Promise<void>;
	startVideoStream (facing?: CameraFacingKind|null): Promise<void>;
}