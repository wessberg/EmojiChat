export interface IWaitOperations {
	wait (time: number): Promise<void>;
	waitForIdle (): Promise<void>;
}