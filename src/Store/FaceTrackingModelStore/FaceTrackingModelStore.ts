import {Store} from "../Store/Store";
import {IFaceTrackingModel, IFaceTrackingModelStore, IFaceTrackingTracker, IFaceTrackingWrapper} from "./Interface/IFaceTrackingModelStore";
import {ITrackerModelPath} from "../../../Resource/Interface/IResource";
import {waitOperations} from "../../Service/Services";
import {addScript} from "../../Loader";
import {Resource} from "../../../Resource/Resource";

export class FaceTrackingModelStore extends Store implements IFaceTrackingModelStore {
	private static READY: boolean = false;
	private static readonly LOADED_MODELS: Map<keyof ITrackerModelPath, IFaceTrackingModel> = new Map();
	private static TRACKER: IFaceTrackingTracker|null = null;

	private get isReady () {
		return FaceTrackingModelStore.READY;
	}

	public clearTracker (): void {
		if (FaceTrackingModelStore.TRACKER == null) return;
		FaceTrackingModelStore.TRACKER.stop();

		// Remove the renderCanvas.
		const renderCanvas = document.getElementById("renderCanvas");
		if (renderCanvas != null && renderCanvas.parentNode != null) {
			renderCanvas.parentNode.removeChild(renderCanvas);
		}
	}

	public async getTracker (): Promise<IFaceTrackingTracker> {
		const existing = FaceTrackingModelStore.TRACKER;
		if (existing != null) return existing;

		await this.prepare();

		// The tracker is bound to "clm" on the global object.
		const wrapper = <IFaceTrackingWrapper>(<any>window).clm;
		const instance = new wrapper.tracker({
			useWebGL: true
		});
		instance.getWebGLContext = (canvas: HTMLCanvasElement): WebGLRenderingContext => (<any>window).getWebGLContext(canvas);
		instance.loadShader = (context: WebGLRenderingContext, program: string, kind: number): WebGLShader => (<any>window).loadShader(context, program, kind);
		instance.createProgram = (context: WebGLRenderingContext, shaders: WebGLShader[]): WebGLProgram => (<any>window).createProgram(context, shaders);
		FaceTrackingModelStore.TRACKER = instance;
		return instance;
	}

	public async getModel (model: keyof ITrackerModelPath): Promise<IFaceTrackingModel> {
		await this.prepare();
		const existing = FaceTrackingModelStore.LOADED_MODELS.get(model);
		if (existing != null) return existing;

		await waitOperations.waitForIdle();
		await addScript(Resource.app.path.dist.lib.tracker.model[model](1));

		// It will be bound to the global object on key "__model[N]__".
		const faceTrackingModel = <IFaceTrackingModel>(<any>window)[`__${model}__`];

		// set eigenvector 9 and 11 to not be regularized. This is to better detect motion of the eyebrows
		faceTrackingModel.shapeModel.nonRegularizedVectors.push(9);
		faceTrackingModel.shapeModel.nonRegularizedVectors.push(11);

		FaceTrackingModelStore.LOADED_MODELS.set(model, faceTrackingModel);
		return faceTrackingModel;
	}

	private async prepare (): Promise<void> {
		if (this.isReady) {
			return;
		}

		// Give it a rest
		await waitOperations.waitForIdle();
		await addScript(Resource.app.path.dist.lib.tracker.tracker(1));
		FaceTrackingModelStore.READY = true;
	}
}