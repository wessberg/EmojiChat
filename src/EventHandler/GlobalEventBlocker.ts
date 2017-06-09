import {IGlobalEventBlocker} from "./GlobalEventBlocker/Interface/IGlobalEventBlocker";

export class GlobalEventBlocker implements IGlobalEventBlocker {
	public block (eventName: string): void {
		window.addEventListener(eventName, e => {
			e.preventDefault();
			e.stopPropagation();
		});
	}
}