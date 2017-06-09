export interface IGlobalEventBlocker {
	block (eventName: string): void;
}