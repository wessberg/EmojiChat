import {IDebounceOperations} from "./Interface/IDebounceOperations";

export class DebounceOperations implements IDebounceOperations {
	private static timeouts: Map<string, NodeJS.Timer> = new Map();
	private static scopedTimeouts: Map<{}, Map<string, NodeJS.Timer>> = new Map();

	private getExistingTimeout (stringified: string, scope?: {}): [Map<string, NodeJS.Timer>|null, NodeJS.Timer|undefined|null] {
		const timeouts = scope != null ? DebounceOperations.scopedTimeouts.get(scope) : DebounceOperations.timeouts;
		if (timeouts == null) return [null, null];
		return [timeouts, timeouts.get(stringified)];
	}

	public debounce (scope: {}, func: Function, waitTime: number = 0, immediate: boolean = false): void {

		const stringified = func.toString();
		const result = this.getExistingTimeout(stringified, scope);
		let timeouts = result[0];
		const existingTimeout = result[1];

		if (existingTimeout != null) {
			// Clear the existing timeout first.
			clearTimeout(existingTimeout);
			if (timeouts != null) timeouts.delete(stringified);
		} else if (immediate) func(); // That will be true on the first call.

		const timeout: NodeJS.Timer = setTimeout(() => {
			if (!immediate) func(); // If immediate, the function would already have been called previously.
			if (timeouts != null) timeouts.delete(stringified);
		}, waitTime);

		// Debounce the timeout and call the provided function after the given wait time.
		if (timeouts == null) timeouts = new Map();
		timeouts.set(stringified, timeout);
		if (scope != null) DebounceOperations.scopedTimeouts.set(scope, timeouts);
	}

}