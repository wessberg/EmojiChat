import {IWaitOperations} from "./Interface/IWaitOperations";
import {GlobalObject} from "@wessberg/globalobject";

export class WaitOperations implements IWaitOperations {
	public waitForIdle (): Promise<void> {
		return new Promise<void>(async resolve => {
			if (!("requestIdleCallback" in GlobalObject)) {
				// Expect a polyfill to be on its way.
				await this.wait(100);
				await this.waitForIdle();
				resolve();
			} else requestIdleCallback(resolve);
		});

	}

	public async wait (time: number = 0): Promise<void> {
		return new Promise<void>(resolve => setTimeout(resolve, time));
	}

}