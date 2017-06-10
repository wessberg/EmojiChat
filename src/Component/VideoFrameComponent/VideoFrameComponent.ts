import {Component, prop, selector, uses} from "../Component/Component";
import {IVideoFrameComponent} from "./Interface/IVideoFrameComponent";
import {VideoComponent} from "../VideoComponent/VideoComponent";
import {FloatingButtonComponent} from "../FloatingButtonComponent/FloatingButtonComponent";
import {IconComponent} from "../IconComponent/IconComponent";
import {emotionClassifierUtil, eventUtil, faceTrackingModelStore, mediaDeviceUtil, mediaStreamStore, mediaStreamUtil, waitOperations} from "../../Service/Services";
import {CameraFacingKind, MediaStreamKind} from "../../Service/MediaDeviceUtil/Interface/IMediaDeviceUtil";
import {IVideoComponent} from "../VideoComponent/Interface/IVideoComponent";
import {EventName} from "../../EventName/EventName";
import {IPropChangeRecord} from "../../Discriminator/PropObserverConsumer/IPropObserverConsumer";
import {IFloatingButtonComponent} from "../FloatingButtonComponent/Interface/IFloatingButtonComponent";
import {ITrackerModelPath} from "../../../Resource/Interface/IResource";
import {IEmotion} from "../../Model/EmotionModel/Interface/IEmotionModel";
import {IFaceDeformerElement} from "../../Service/FaceDeformerUtil/Interface/IFaceDeformerUtil";
import {EmotionPredictionPrecisionKind} from "../../Service/EmotionClassifierUtil/Interface/IEmotionClassifierUtil";
import {IIconComponent} from "../IconComponent/Interface/IIconComponent";
import {Config} from "@wessberg/environment";

@selector("video-frame-element")
@uses([VideoComponent, FloatingButtonComponent, IconComponent])
export class VideoFrameComponent extends Component implements IVideoFrameComponent {
	private static readonly MICROPHONE_ACTIVE_ATTRIBUTE = "microphone-active";
	private static readonly CAMERA_ACTIVE_ATTRIBUTE = "camera-active";
	private static readonly HAS_MULTIPLE_CAMERAS_ATTRIBUTE = "has-multiple-cameras";
	private static readonly BLOCKED_CAMERA_PERMISSION_ATTRIBUTE = "blocked-camera-permission";
	private static readonly BLOCKED_MICROPHONE_PERMISSION_ATTRIBUTE = "blocked-microphone-permission";
	private static readonly FACE_TRACKING_ATTRIBUTE = "face-tracking";
	private static readonly HAS_FOUND_FACE = "has-found-face";

	@prop isFaceTracking: boolean = false;
	@prop hasFoundFace: boolean = false;
	@prop private microphoneActive: boolean = false;
	@prop private cameraActive: boolean = false;
	@prop private blockedCameraPermission: boolean = false;
	@prop private blockedMicrophonePermission: boolean = false;
	@prop private hasMultipleCameras: boolean = false;
	@prop private currentEmotion: IEmotion|null = null;

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

        img {
            display: none;
        }

        :host(:not([has-multiple-cameras])) #switchCameraButton,
        :host([blocked-camera-permission]) {
            display: none;
        }

        :host([blocked-microphone-permission]) #microphoneButton {
            display: none;
        }

        :host, #toggles, #info {
            display: flex;
        }
				
				#info {
						position: absolute;
						top: 0;
						left: 0;
						right: 0;
						opacity: 0;
						height: 100%;
						width: 100%;
						margin: auto;
						flex-direction: column;
						align-content: center;
						justify-content: center;
            transition: opacity var(--duration-medium) var(--easing-standard-curve);
				}
				
				:host([face-tracking]:not([has-found-face])) #info {
						opacity: 1;
				}
				
				#info > * {
						color: var(--color-primary-text-light);
						text-align: center;
				}

        #toggles {
            flex-direction: row;
            align-content: start;
            justify-content: start;
            margin: 0 0 0 var(--distance-minimum);
						z-index: 1;
        }

        #toggles > floating-button-element {
            margin-right: var(--distance-minimum);
        }

        #video, canvas {
            position: absolute;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
						z-index: 0;
        }

        canvas {
            position: absolute;
            top: 0;
            left: 0;
        }

        #emoji {
            position: absolute;
            top: 0;
            left: 0;
						opacity: 1;
            display: flex;
            align-content: center;
            justify-content: center;
            transform-origin: center;
						transform-style: preserve-3d;
						transition: opacity var(--duration-medium) var(--easing-standard-curve);
        }

        :host(:not([face-tracking])) canvas,
				:host(:not([face-tracking])) #emoji {
            display: none;
        }
			
			:host(:not([has-found-face])) #emoji {
					opacity: 0;
			}
		`;
	}

	public static markup (): string {
		// language=HTML
		return `
        <video-element id="video" cover></video-element>
        <canvas id="overlay"></canvas>
        <icon-element id="emoji" icon="neutral-emoji" orange></icon-element>
        <aside id="toggles">
            <floating-button-element id="microphoneButton" primary>
                <icon-element id="microphoneIcon" icon="microphone-fill"></icon-element>
            </floating-button-element>
            <floating-button-element id="switchCameraButton" primary>
                <icon-element icon="reverse-camera-fill"></icon-element>
            </floating-button-element>
            <floating-button-element id="toggleStreamButton" primary>
                <icon-element id="toggleStreamIcon" icon="close"></icon-element>
            </floating-button-element>
        </aside>
			<aside id="info">
					<h5>Looking for your face...</h5>
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

				const toggleStreamButton = <IFloatingButtonComponent> this.element("toggleStreamButton");
				const toggleStreamIcon = this.element("toggleStreamIcon");

				toggleStreamButton.toggleAttribute("active", this.cameraActive);
				toggleStreamIcon.setAttribute("icon", this.cameraActive ? "close" : "video-camera-fill");

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

			case "isFaceTracking":
				this.toggleAttribute(VideoFrameComponent.FACE_TRACKING_ATTRIBUTE, this.isFaceTracking);
				break;
			case "currentEmotion":
				const emojiElement = <IIconComponent> this.element("emoji");
				emojiElement.setAttribute("icon", `${this.currentEmotion == null ? "neutral" : this.currentEmotion}-emoji`);
				break;
			case "hasFoundFace":
				this.toggleAttribute(VideoFrameComponent.HAS_FOUND_FACE, this.hasFoundFace);
		}
	}

	public async startVideoStream (facing?: CameraFacingKind|null): Promise<boolean> {
		try {
			await mediaStreamUtil.startVideoStream(<IVideoComponent>this.element("video"), facing == null ? CameraFacingKind.FRONT : facing);
			this.microphoneActive = false;
			this.cameraActive = true;
			this.blockedCameraPermission = false;
			return true;
		} catch (ex) {
			this.microphoneActive = false;
			this.cameraActive = false;
			this.blockedCameraPermission = true;
			return false;
		}
	}

	public async startVideoAndAudioStream (facing?: CameraFacingKind|null): Promise<boolean> {
		try {
			await mediaStreamUtil.startVideoAndAudioStream(<IVideoComponent>this.element("video"), facing == null ? CameraFacingKind.FRONT : facing);
			this.microphoneActive = true;
			this.cameraActive = true;
			this.blockedCameraPermission = false;
			this.blockedMicrophonePermission = false;
			return true;
		} catch (ex) {
			this.microphoneActive = false;
			this.cameraActive = false;
			this.blockedCameraPermission = true;
			this.blockedMicrophonePermission = true;
			return false;
		}
	}

	public async startAudioStream (facing?: CameraFacingKind|null): Promise<boolean> {
		try {
			await mediaStreamUtil.startVideoAndAudioStream(<IVideoComponent>this.element("video"), facing == null ? CameraFacingKind.FRONT : facing);
			this.microphoneActive = true;
			this.cameraActive = false;
			this.blockedMicrophonePermission = false;
			return true;
		} catch (ex) {
			this.microphoneActive = false;
			this.cameraActive = false;
			this.blockedMicrophonePermission = true;
			return false;
		}
	}

	public async stopStream (): Promise<void> {
		await mediaStreamUtil.stopStream(<IVideoComponent>this.element("video"));
		if (this.isFaceTracking) await this.stopTracking();
		this.cameraActive = false;
		this.microphoneActive = false;
	}

	public async stopTracking (): Promise<void> {
		await faceTrackingModelStore.clearTracker();
		this.isFaceTracking = false;
	}

	public async startTracking (): Promise<void> {
		await this.drawModel("model4");
		this.isFaceTracking = true;
	}

	private async onResize (): Promise<void> {
		this.setDimensions();
		if (this.isFaceTracking) {
			await this.stopTracking();
			await this.startTracking();
		}
	}

	private setDimensions (): void {
		const video = <HTMLVideoElement> this.element("video");
		const overlay = this.element("overlay");
		const {offsetWidth, offsetHeight} = video;
		video.setAttribute("width", `${offsetWidth}`);
		overlay.setAttribute("width", `${offsetWidth}`);
		video.setAttribute("height", `${offsetHeight}`);
		overlay.setAttribute("height", `${offsetHeight}`);
	}

	protected async connectedCallback (): Promise<void> {
		super.connectedCallback();

		// TODO: Remove this!
		(<any>window).foo = this.element("emoji");

		// (<HTMLImageElement>this.element("test")).src = HAPPY_EMOJI_BASE64;

		eventUtil.listen(this, EventName.CLICK, this.element("microphoneButton"), this.onMicrophoneButtonClicked);
		eventUtil.listen(this, EventName.CLICK, this.element("switchCameraButton"), this.onSwitchCameraButtonClicked);
		eventUtil.listen(this, EventName.CLICK, this.element("toggleStreamButton"), this.onToggleStreamButtonClicked);
		eventUtil.listen(this, EventName.RESIZE, window, this.onResize);
		await waitOperations.waitForIdle();
		this.setDimensions();

		await this.startStream();
	}

	private async onToggleStreamButtonClicked (): Promise<void> {
		if (this.cameraActive) await this.stopStream();
		else await this.startStream();
	}

	private async startStream (): Promise<void> {
		await this.startVideoAndAudioStream(); {
			await this.startTracking();
		}
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
		if (this.isFaceTracking) return;

		// Let's load the face tracking stuff
		const tracker = await faceTrackingModelStore.getTracker();
		const model = await faceTrackingModelStore.getModel(modelKey);
		const videoElement = <IVideoComponent>this.element("video");
		const overlay = <HTMLCanvasElement> this.element("overlay");
		const emoji = <IFaceDeformerElement> this.element("emoji");
		const overlayContext = overlay.getContext("2d");

		tracker.init(model);
		tracker.start(videoElement.nativeVideoElement);
		this.isFaceTracking = true;

		const self = this;

		// Start looping!
		(function drawLoop () {
			if (!self.isFaceTracking) {

				// Clear the canvas context
				if (overlayContext != null) overlayContext.clearRect(0, 0, overlay.width, overlay.height);
			} else {


				const currentPosition = tracker.getCurrentPosition();
				if (overlayContext != null) overlayContext.clearRect(0, 0, overlay.width, overlay.height);

				// Position the emoji in top of the user's face.
				if (!currentPosition) {
					self.hasFoundFace = false;
				}
				else {

					self.hasFoundFace = true;
					// Add the overlay if we're debugging.
					if (Config.DEBUG) tracker.draw(overlay);

					const left = currentPosition[1][0];
					const right = currentPosition[13][0];
					const top = currentPosition[20][1];
					const bottom = currentPosition[7][1];

					const topX = currentPosition[33][0];
					const bottomX = currentPosition[7][0];

					const rotation = (topX - bottomX) / 3;

					const width = right - left;
					const height = bottom - top;
					const enlargedWidth = width * 1.5;
					const enlargedHeight = height * 1.5;

					const widthPlusRotation = enlargedWidth + ((Math.abs(rotation) * enlargedWidth) / 100);
					const heightPlusRotation = enlargedHeight + ((Math.abs(rotation) * enlargedHeight) / 100);

					const widthDiff = widthPlusRotation - width;
					const heightDiff = heightPlusRotation - height;
					const x = left - (widthDiff / 2);
					const y = top - (heightDiff / 2);

					emoji.style.width = `${widthPlusRotation}px`;
					emoji.style.height = `${heightPlusRotation}px`;
					emoji.style.transform = `translate3d(${x}px, ${y -20}px, 0)`;

					const parameters = tracker.getCurrentParameters();
					const meanPrediction = emotionClassifierUtil.meanPredict(parameters);

					if (typeof meanPrediction !== "boolean") {
						// Let's get the most likely emotion!
						const max = meanPrediction.reduce((prev, curr) => curr.value > prev.value ? curr : prev);
						if (max.precision === EmotionPredictionPrecisionKind.CERTAIN) {
							// Only toggle the current emotion if we're certain of it.
							self.currentEmotion = <IEmotion>max.emotion;
						} else self.currentEmotion = null;
					}

				}

				requestAnimationFrame(drawLoop);
			}
		})();
	}
}