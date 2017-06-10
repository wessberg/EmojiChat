import {IComponent} from "../../Component/IComponent";
import {CameraFacingKind} from "../../../Service/MediaDeviceUtil/Interface/IMediaDeviceUtil";

export interface IVideoFrameComponent extends IComponent {
	startAudioStream (facing?: CameraFacingKind|null): Promise<boolean>;
	startVideoAndAudioStream (facing?: CameraFacingKind|null): Promise<boolean>;
	startVideoStream (facing?: CameraFacingKind|null): Promise<boolean>;
}