import {IPage} from "../../Page/Interface/IPage";
import {CameraFacingKind} from "../../../Service/MediaDeviceUtil/Interface/IMediaDeviceUtil";

export interface IHomePage extends IPage {
	startAudioStream (facing?: CameraFacingKind|null): Promise<boolean>;
	startVideoAndAudioStream (facing?: CameraFacingKind|null): Promise<boolean>;
	startVideoStream (facing?: CameraFacingKind|null): Promise<boolean>;
}