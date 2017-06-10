export interface IPropChangeRecord {
	prop: string;
	newValue: {}|null|undefined;
	oldValue?: {}|null|undefined;
}

export interface IPropObserverConsumer {
	onPropChanged (change: IPropChangeRecord): Promise<void>;
	onBeforePropChanged? (change: IPropChangeRecord): {}|null|undefined;
}