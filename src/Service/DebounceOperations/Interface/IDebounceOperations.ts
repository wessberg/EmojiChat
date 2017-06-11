export interface IDebounceOperations {
	debounce (scope: {}, func: Function, waitTime?: number, immediate?: boolean): void;
}