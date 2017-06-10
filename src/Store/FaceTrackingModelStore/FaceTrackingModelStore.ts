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

	public async getTracker (): Promise<IFaceTrackingTracker> {
		const existing = FaceTrackingModelStore.TRACKER;
		if (existing != null) return existing;

		await this.prepare();

		// The tracker is bound to "clm" on the global object.
		const wrapper = <IFaceTrackingWrapper>(<any>window).clm;
		const instance = new wrapper.tracker();
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