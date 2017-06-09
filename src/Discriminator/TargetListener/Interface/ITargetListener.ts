export interface ITargetListener {
	listenForTarget (target: Element): void;
	unlistenFromTarget (target: Element): void;
}