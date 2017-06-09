import {Component, selector, uses} from "../Component/Component";
import {IVideoFrameComponent} from "./Interface/IVideoFrameComponent";
import {VideoComponent} from "../VideoComponent/VideoComponent";
import {FloatingButtonComponent} from "../FloatingButtonComponent/FloatingButtonComponent";
import {IconComponent} from "../IconComponent/IconComponent";
import {eventUtil, mediaDeviceUtil, mediaStreamStore} from "../../Service/Services";
import {CameraFacingKind, IMediaStreamConstraints, MediaStreamKind} from "../../Service/MediaDeviceUtil/Interface/IMediaDeviceUtil";
import {MediaPermissionKind} from "../../Model/MediaPermission/Interface/IMediaPermission";
import {IVideoComponent} from "../VideoComponent/Interface/IVideoComponent";
import {EventName} from "../../EventName/EventName";

@selector("video-frame-element")
@uses([VideoComponent, FloatingButtonComponent, IconComponent])
export class VideoFrameComponent extends Component implements IVideoFrameComponent {
	private static readonly MICROPHONE_ACTIVE_ATTRIBUTE = "microphone-active";
	private static readonly CAMERA_ACTIVE_ATTRIBUTE = "camera-active";
	private static readonly HAS_MULTIPLE_CAMERAS_ATTRIBUTE = "has-multiple-cameras";
	private static readonly BLOCKED_CAMERA_PERMISSION_ATTRIBUTE = "blocked-camera-permission";
	private static readonly BLOCKED_MICROPHONE_PERMISSION_ATTRIBUTE = "blocked-microphone-permission";

	constructor () {
		super();
		this.detectMultipleCameras().then();
	}

	static get observedAttributes (): string[] {
		return [
			VideoFrameComponent.MICROPHONE_ACTIVE_ATTRIBUTE,
			VideoFrameComponent.CAMERA_ACTIVE_ATTRIBUTE,
			VideoFrameComponent.BLOCKED_CAMERA_PERMISSION_ATTRIBUTE,
			VideoFrameComponent.BLOCKED_MICROPHONE_PERMISSION_ATTRIBUTE
		];
	}

	private _microphoneActive: boolean = false;

	private get microphoneActive () {
		return this._microphoneActive;
	}

	private set microphoneActive (microphoneActive: boolean) {
		this._microphoneActive = microphoneActive;

		const microphoneButton = this.element("microphoneButton");

		if (microphoneActive) {
			if (!microphoneButton.hasAttribute("active")) microphoneButton.setAttribute("active", "");
			if (!this.hasAttribute(VideoFrameComponent.MICROPHONE_ACTIVE_ATTRIBUTE)) this.setAttribute(VideoFrameComponent.MICROPHONE_ACTIVE_ATTRIBUTE, "");
		} else {
			if (microphoneButton.hasAttribute("active")) microphoneButton.removeAttribute("active");
			if (this.hasAttribute(VideoFrameComponent.MICROPHONE_ACTIVE_ATTRIBUTE)) this.removeAttribute(VideoFrameComponent.MICROPHONE_ACTIVE_ATTRIBUTE);
		}
	}

	private _cameraActive: boolean = false;

	private get cameraActive () {
		return this._cameraActive;
	}

	private set cameraActive (cameraActive: boolean) {
		this._cameraActive = cameraActive;
		if (cameraActive) {
			if (!this.hasAttribute(VideoFrameComponent.CAMERA_ACTIVE_ATTRIBUTE)) this.setAttribute(VideoFrameComponent.CAMERA_ACTIVE_ATTRIBUTE, "");
		} else {
			if (this.hasAttribute(VideoFrameComponent.CAMERA_ACTIVE_ATTRIBUTE)) this.removeAttribute(VideoFrameComponent.CAMERA_ACTIVE_ATTRIBUTE);
		}
	}

	private _blockedCameraPermission: boolean = false;

	private get blockedCameraPermission () {
		return this._blockedCameraPermission;
	}

	private set blockedCameraPermission (blockedCameraPermission: boolean) {
		this._blockedCameraPermission = blockedCameraPermission;
		if (blockedCameraPermission) {
			if (!this.hasAttribute(VideoFrameComponent.BLOCKED_CAMERA_PERMISSION_ATTRIBUTE)) this.setAttribute(VideoFrameComponent.BLOCKED_CAMERA_PERMISSION_ATTRIBUTE, "");
		} else {
			if (this.hasAttribute(VideoFrameComponent.BLOCKED_CAMERA_PERMISSION_ATTRIBUTE)) this.removeAttribute(VideoFrameComponent.BLOCKED_CAMERA_PERMISSION_ATTRIBUTE);
		}
	}

	private _blockedMicrophonePermission: boolean = false;

	private get blockedMicrophonePermission () {
		return this._blockedMicrophonePermission;
	}

	private set blockedMicrophonePermission (blockedMicrophonePermission: boolean) {
		this._blockedMicrophonePermission = blockedMicrophonePermission;
		if (blockedMicrophonePermission) {
			if (!this.hasAttribute(VideoFrameComponent.BLOCKED_MICROPHONE_PERMISSION_ATTRIBUTE)) this.setAttribute(VideoFrameComponent.BLOCKED_MICROPHONE_PERMISSION_ATTRIBUTE, "");
		} else {
			if (this.hasAttribute(VideoFrameComponent.BLOCKED_MICROPHONE_PERMISSION_ATTRIBUTE)) this.removeAttribute(VideoFrameComponent.BLOCKED_MICROPHONE_PERMISSION_ATTRIBUTE);
		}
	}

	private _hasMultipleCameras: boolean = false;

	private get hasMultipleCameras () {
		return this._hasMultipleCameras;
	}

	private set hasMultipleCameras (hasMultipleCameras: boolean) {
		this._hasMultipleCameras = hasMultipleCameras;
		if (hasMultipleCameras) {
			if (!this.hasAttribute(VideoFrameComponent.HAS_MULTIPLE_CAMERAS_ATTRIBUTE)) this.setAttribute(VideoFrameComponent.HAS_MULTIPLE_CAMERAS_ATTRIBUTE, "");
		} else {
			if (this.hasAttribute(VideoFrameComponent.HAS_MULTIPLE_CAMERAS_ATTRIBUTE)) this.removeAttribute(VideoFrameComponent.HAS_MULTIPLE_CAMERAS_ATTRIBUTE);
		}
	}

	public static styles (): string {
		// language=CSS
		return `
        :host {
            width: 100%;
            height: 100%;
            position: relative;
            flex-direction: column;
            align-content: flex-end;
            justify-content: flex-end;
        }

        :host(:not([has-multiple-cameras])) #switchCameraButton,
        :host([blocked-camera-permission]) {
            display: none;
        }

        :host([blocked-microphone-permission]) #microphoneButton {
            display: none;
        }

        :host, #toggles {
            display: flex;
        }

        #toggles {
            flex-direction: row;
            align-content: start;
            justify-content: start;
            margin: 0 0 0 var(--distance-minimum);
        }

        #toggles > floating-button-element {
            margin-right: var(--distance-minimum);
        }

        video-element {
            position: absolute;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
        }
		`;
	}

	public static markup (): string {
		// language=HTML
		return `
        <video-element cover></video-element>
        <aside id="toggles">
            <floating-button-element id="microphoneButton" primary>
                <icon-element id="microphoneIcon" icon="microphone-fill"></icon-element>
            </floating-button-element>
            <floating-button-element id="switchCameraButton" primary>
                <icon-element icon="reverse-camera-fill"></icon-element>
            </floating-button-element>
        </aside>

		`;
	}

	protected attributeChangedCallback (attrName: string, _: string, newValue: string): void {
		switch (attrName) {

			case VideoFrameComponent.MICROPHONE_ACTIVE_ATTRIBUTE:
				const microphoneIcon = this.element("microphoneIcon");
				microphoneIcon.setAttribute("icon", newValue != null ? "microphone-fill" : "microphone-off");
				break;
		}
	}

	protected async connectedCallback (): Promise<void> {
		super.connectedCallback();

		eventUtil.listen(this, EventName.CLICK, this.element("microphoneButton"), this.onMicrophoneButtonClicked);
		eventUtil.listen(this, EventName.CLICK, this.element("switchCameraButton"), this.onSwitchCameraButtonClicked);

		await this.startInitialStream();
	}

	private async onMicrophoneButtonClicked (): Promise<void> {
		const stream = mediaStreamStore.getStream();
		if (stream == null) return; // Do nothing if no stream is currently active.
		const audioTracks = stream.stream.getAudioTracks();

		switch (stream.kind) {

			case MediaStreamKind.AUDIO_AND_VIDEO:
			case MediaStreamKind.AUDIO:

				// The user intents to disable audio from the stream.
				if (this.microphoneActive) {

					audioTracks.forEach(track => track.enabled = false);
					this.microphoneActive = false;

					// The user intents to enable audio on the stream.
				} else {
					audioTracks.forEach(track => track.enabled = true);
					this.microphoneActive = true;
				}
				break;

			case MediaStreamKind.VIDEO:
				// Start an audio and video stream. The user wants to add audio to a video stream.
				const currentFacing = mediaStreamStore.getCameraFacing();
				await this.startVideoAndAudioStream(currentFacing == null ? CameraFacingKind.FRONT : currentFacing);
				break;
		}
	}

	private async onSwitchCameraButtonClicked (): Promise<void> {
		const stream = mediaStreamStore.getStream();
		if (stream == null) return; // Do nothing if no stream is currently active.

		const currentFacing = mediaStreamStore.getCameraFacing();

		switch (stream.kind) {

			case MediaStreamKind.AUDIO_AND_VIDEO:
			case MediaStreamKind.VIDEO:

				if (!this.cameraActive) {
					// The user intents to re-enable the stream.
					await this.startVideoStream(currentFacing == null ? CameraFacingKind.FRONT : currentFacing);
				} else {
					// The user intents to switch to the other camera.
					await this.startVideoStream(currentFacing == null
						? CameraFacingKind.FRONT
						: currentFacing === CameraFacingKind.FRONT ? CameraFacingKind.REAR : CameraFacingKind.FRONT);
				}
				break;

			case MediaStreamKind.AUDIO:
				// The user intents to active an audio + video stream.
				await this.startVideoStream(currentFacing == null ? CameraFacingKind.FRONT : currentFacing);
				break;
		}
	}

	private async startInitialStream (): Promise<void> {
		const constraints = await this.getInitialConstraints();
		if (constraints == null) return; // The browser doesn't support neither audio nor video.

		await this.startStream(constraints);
	}

	private async detectMultipleCameras (): Promise<void> {
		const kinds = await mediaDeviceUtil.getCameraFacingKinds();
		this.hasMultipleCameras = kinds.length > 1;
	}

	private async getInitialConstraints (): Promise<IMediaStreamConstraints|null> {
		const hasCamera = await mediaDeviceUtil.hasCamera();
		const hasMicrophone = await mediaDeviceUtil.hasMicrophone();
		if (hasCamera && hasMicrophone) return {audio: true, video: CameraFacingKind.FRONT};
		if (hasCamera && !hasMicrophone) return {audio: false, video: CameraFacingKind.FRONT};
		if (!hasCamera && hasMicrophone) return {audio: true};
		return null;
	}

	private async startStream (constraints: IMediaStreamConstraints): Promise<void> {
		if (constraints.audio && constraints.video != null) return await this.startVideoAndAudioStream(constraints.video);
		if (constraints.audio && !constraints.video) return await this.startAudioStream();
		if (!constraints.audio && constraints.video != null) return await this.startVideoStream(constraints.video);
		throw new ReferenceError(`${this.constructor.name} could not start a stream: Neither audio nor video was requested!`);
	}

	private async stopStream (): Promise<void> {
		const stream = mediaStreamStore.getStream();

		// If there is no stream, there is nothing to stop!
		if (stream == null) return;

		const videoElement = <IVideoComponent> this.element("video-element");
		stream.stream.getTracks().forEach(track => track.stop());
		await videoElement.stop();
		videoElement.srcObject = null;
		mediaStreamStore.setCameraFacing(null);
		this.cameraActive = false;
		this.microphoneActive = false;
	}

	private async startVideoStream (facing: CameraFacingKind): Promise<void> {
		await this.stopStream();
		try {
			const stream = await mediaDeviceUtil.getStream({video: facing});
			mediaStreamStore.setStream(stream);
			mediaStreamStore.setCameraPermission(MediaPermissionKind.GRANTED);
			mediaStreamStore.setCameraFacing(facing);
			const videoElement = <IVideoComponent> this.element("video-element");
			videoElement.srcObject = stream.stream;
			await videoElement.play();
			this.cameraActive = true;
			this.microphoneActive = false;
			this.blockedCameraPermission = false;
		} catch (ex) {

			// The user denied the request.
			mediaStreamStore.setCameraPermission(MediaPermissionKind.DENIED);
			this.cameraActive = false;
			this.microphoneActive = false;
			this.blockedCameraPermission = true;
		}
	}

	private async startVideoAndAudioStream (facing: CameraFacingKind): Promise<void> {
		await this.stopStream();
		try {
			const stream = await mediaDeviceUtil.getStream({audio: true, video: facing});
			mediaStreamStore.setStream(stream);
			mediaStreamStore.setCameraPermission(MediaPermissionKind.GRANTED);
			mediaStreamStore.setMicrophonePermission(MediaPermissionKind.GRANTED);
			mediaStreamStore.setCameraFacing(facing);
			const videoElement = <IVideoComponent> this.element("video-element");
			videoElement.srcObject = stream.stream;
			await videoElement.play();
			this.cameraActive = true;
			this.microphoneActive = true;
			this.blockedMicrophonePermission = false;
			this.blockedCameraPermission = false;
		} catch (ex) {
			// The user denied the request.
			mediaStreamStore.setCameraPermission(MediaPermissionKind.DENIED);
			mediaStreamStore.setMicrophonePermission(MediaPermissionKind.DENIED);
			this.cameraActive = false;
			this.microphoneActive = false;
			this.blockedMicrophonePermission = true;
			this.blockedCameraPermission = true;
		}
	}

	private async startAudioStream (): Promise<void> {
		await this.stopStream();
		try {
			const stream = await mediaDeviceUtil.getStream({audio: true});
			mediaStreamStore.setStream(stream);
			mediaStreamStore.setMicrophonePermission(MediaPermissionKind.GRANTED);
			mediaStreamStore.setCameraFacing(null);
			const videoElement = <IVideoComponent> this.element("video-element");
			videoElement.srcObject = stream.stream;
			await videoElement.play();
			this.cameraActive = false;
			this.microphoneActive = true;
			this.blockedMicrophonePermission = false;
		} catch (ex) {
			// The user denied the request.
			mediaStreamStore.setMicrophonePermission(MediaPermissionKind.DENIED);
			this.blockedMicrophonePermission = true;
			this.cameraActive = false;
			this.microphoneActive = false;
		}
	}
}