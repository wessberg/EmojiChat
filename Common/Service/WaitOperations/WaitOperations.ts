import {IWaitOperations} from "./Interface/IWaitOperations";

export class WaitOperations implements IWaitOperations {
	public waitForIdle (): Promise<void> {
		return new Promise<void>(resolve => requestIdleCallback(resolve));
	}

	public async wait (time: number = 0): Promise<void> {
		return new Promise<void>(resolve => setTimeout(resolve, time));
	}

}