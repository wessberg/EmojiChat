export interface IChildMutationObserverConsumer extends HTMLElement {
	onChildBecameAdded (element: Element): void;
	onChildBecameRemoved (element: Element): void;
	unbindChildMutationObserver (): void;
	observeChildMutations (): void;
}