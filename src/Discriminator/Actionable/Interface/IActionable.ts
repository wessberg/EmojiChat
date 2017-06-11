export interface IActionable<T, U> {
	onAction (payload: T): Promise<U>;
}