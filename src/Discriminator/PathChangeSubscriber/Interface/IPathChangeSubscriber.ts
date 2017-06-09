export interface IPathChangeSubscriber {
	didBecomeVisible (): Promise<void>;
	didBecomeInvisible (): Promise<void>;
}