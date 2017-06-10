import {Component, prop, selector, uses} from "../Component/Component";
import {IVideoFrameComponent} from "./Interface/IVideoFrameComponent";
import {VideoComponent} from "../VideoComponent/VideoComponent";
import {FloatingButtonComponent} from "../FloatingButtonComponent/FloatingButtonComponent";
import {IconComponent} from "../IconComponent/IconComponent";
import {eventUtil, faceTrackingModelStore, mediaDeviceUtil, mediaStreamStore, mediaStreamUtil} from "../../Service/Services";
import {CameraFacingKind, MediaStreamKind} from "../../Service/MediaDeviceUtil/Interface/IMediaDeviceUtil";
import {IVideoComponent} from "../VideoComponent/Interface/IVideoComponent";
import {EventName} from "../../EventName/EventName";
import {IPropChangeRecord} from "../../Discriminator/PropObserverConsumer/IPropObserverConsumer";
import {IFloatingButtonComponent} from "../FloatingButtonComponent/Interface/IFloatingButtonComponent";
import {ITrackerModelPath} from "../../../Resource/Interface/IResource";

@selector("video-frame-element")
@uses([VideoComponent, FloatingButtonComponent, IconComponent])
export class VideoFrameComponent extends Component implements IVideoFrameComponent {
	private static readonly MICROPHONE_ACTIVE_ATTRIBUTE = "microphone-active";
	private static readonly CAMERA_ACTIVE_ATTRIBUTE = "camera-active";
	private static readonly HAS_MULTIPLE_CAMERAS_ATTRIBUTE = "has-multiple-cameras";
	private static readonly BLOCKED_CAMERA_PERMISSION_ATTRIBUTE = "blocked-camera-permission";
	private static readonly BLOCKED_MICROPHONE_PERMISSION_ATTRIBUTE = "blocked-microphone-permission";
	@prop private microphoneActive: boolean = false;
	@prop private cameraActive: boolean = false;
	@prop private blockedCameraPermission: boolean = false;
	@prop private blockedMicrophonePermission: boolean = false;
	@prop private hasMultipleCameras: boolean = false;

	constructor () {
		super();
		this.detectMultipleCameras().then();
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

        video-element, canvas {
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
        <video-element width="300" height="300" cover></video-element>
        <canvas height="300px" width="300px"></canvas>
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

	async onPropChanged ({prop}: IPropChangeRecord): Promise<void> {
		switch (prop) {

			case "microphoneActive":
				const microphoneButton = <IFloatingButtonComponent> this.element("microphoneButton");
				const microphoneIcon = this.element("microphoneIcon");

				microphoneButton.toggleAttribute("active", this.microphoneActive);
				microphoneIcon.setAttribute("icon", this.microphoneActive ? "microphone-fill" : "microphone-off");

				this.toggleAttribute(VideoFrameComponent.MICROPHONE_ACTIVE_ATTRIBUTE, this.microphoneActive);
				break;

			case "cameraActive":
				this.toggleAttribute(VideoFrameComponent.CAMERA_ACTIVE_ATTRIBUTE, this.cameraActive);
				break;

			case "blockedCameraPermission":
				this.toggleAttribute(VideoFrameComponent.BLOCKED_CAMERA_PERMISSION_ATTRIBUTE, this.blockedCameraPermission);
				break;

			case "blockedMicrophonePermission":
				this.toggleAttribute(VideoFrameComponent.BLOCKED_MICROPHONE_PERMISSION_ATTRIBUTE, this.blockedMicrophonePermission);
				break;

			case "hasMultipleCameras":
				this.toggleAttribute(VideoFrameComponent.HAS_MULTIPLE_CAMERAS_ATTRIBUTE, this.hasMultipleCameras);
				break;
		}
	}

	public async startVideoStream (facing?: CameraFacingKind|null): Promise<void> {
		try {
			await mediaStreamUtil.startVideoStream(<IVideoComponent>this.element("video-element"), facing == null ? CameraFacingKind.FRONT : facing);
			this.microphoneActive = false;
			this.cameraActive = true;
			this.blockedCameraPermission = false;
		} catch (ex) {
			this.microphoneActive = false;
			this.cameraActive = false;
			this.blockedCameraPermission = true;
		}
	}

	public async startVideoAndAudioStream (facing?: CameraFacingKind|null): Promise<void> {
		try {
			await mediaStreamUtil.startVideoAndAudioStream(<IVideoComponent>this.element("video-element"), facing == null ? CameraFacingKind.FRONT : facing);
			this.microphoneActive = true;
			this.cameraActive = true;
			this.blockedCameraPermission = false;
			this.blockedMicrophonePermission = false;
		} catch (ex) {
			this.microphoneActive = false;
			this.cameraActive = false;
			this.blockedCameraPermission = true;
			this.blockedMicrophonePermission = true;
		}
	}

	public async startAudioStream (facing?: CameraFacingKind|null): Promise<void> {
		try {
			await mediaStreamUtil.startVideoAndAudioStream(<IVideoComponent>this.element("video-element"), facing == null ? CameraFacingKind.FRONT : facing);
			this.microphoneActive = true;
			this.cameraActive = false;
			this.blockedMicrophonePermission = false;
		} catch (ex) {
			this.microphoneActive = false;
			this.cameraActive = false;
			this.blockedMicrophonePermission = true;
		}
	}

	protected async connectedCallback (): Promise<void> {
		super.connectedCallback();

		eventUtil.listen(this, EventName.CLICK, this.element("microphoneButton"), this.onMicrophoneButtonClicked);
		eventUtil.listen(this, EventName.CLICK, this.element("switchCameraButton"), this.onSwitchCameraButtonClicked);

		await this.startVideoAndAudioStream();

		// Let's start drawing!
		await this.drawModel("model6");

	}

	private async onMicrophoneButtonClicked (): Promise<void> {
		const stream = mediaStreamStore.getStream();
		if (stream == null) return; // Do nothing if no stream is currently active.

		switch (stream.kind) {

			case MediaStreamKind.AUDIO_AND_VIDEO:
			case MediaStreamKind.AUDIO:

				// The user intents to disable audio from the stream.
				if (this.microphoneActive) {
					mediaStreamUtil.disableAudioStream(stream.stream);
					this.microphoneActive = false;

					// The user intents to enable audio on the stream.
				} else {
					mediaStreamUtil.enableAudioStream(stream.stream);
					this.microphoneActive = true;
				}
				break;

			case MediaStreamKind.VIDEO:
				// Start an audio and video stream. The user wants to add audio to a video stream.
				const currentFacing = mediaStreamStore.getCameraFacing();
				await this.startVideoAndAudioStream(currentFacing);
				break;
		}
	}

	private async onSwitchCameraButtonClicked (): Promise<void> {
		const stream = mediaStreamStore.getStream();
		if (stream == null) return; // Do nothing if no stream is currently active.

		const currentFacing = mediaStreamStore.getCameraFacing();

		switch (stream.kind) {

			case MediaStreamKind.VIDEO:

				if (!this.cameraActive) {
					// The user intents to re-enable the stream.
					await this.startVideoStream(currentFacing);
				} else {

					// The user intents to switch to the other camera.
					await this.startVideoStream(currentFacing == null ? null : currentFacing === CameraFacingKind.FRONT ? CameraFacingKind.REAR : CameraFacingKind.FRONT);
				}
				break;

			case MediaStreamKind.AUDIO_AND_VIDEO:
				if (!this.cameraActive) {
					// The user intents to re-enable the stream.
					await this.startVideoAndAudioStream(currentFacing);
				} else {

					// The user intents to switch to the other camera.
					await this.startVideoAndAudioStream(currentFacing == null ? null : currentFacing === CameraFacingKind.FRONT ? CameraFacingKind.REAR : CameraFacingKind.FRONT);
				}
				break;

			case MediaStreamKind.AUDIO:
				// The user intents to active an audio + video stream.
				await this.startVideoStream(currentFacing);
				break;
		}
	}

	private async detectMultipleCameras (): Promise<void> {
		const kinds = await mediaDeviceUtil.getCameraFacingKinds();
		this.hasMultipleCameras = kinds.length > 1;
	}

	private async drawModel (modelKey: keyof ITrackerModelPath): Promise<void> {
		// Let's load the face tracking stuff
		const tracker = await faceTrackingModelStore.getTracker();
		const model = await faceTrackingModelStore.getModel(modelKey);
		const videoElement = <IVideoComponent>this.element("video-element");
		const canvas = <HTMLCanvasElement> this.element("canvas");
		const context = canvas.getContext("2d");
		tracker.init(model);
		tracker.start(videoElement.nativeVideoElement);

		// Start looping!
		(function drawLoop () {
			requestAnimationFrame(drawLoop);
			if (context != null) context.clearRect(0, 0, canvas.width, canvas.height);
			tracker.draw(canvas);
		})();
	}
}