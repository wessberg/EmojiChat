import {IChildMutationObserver} from "./Interface/IChildMutationObserver";
import {IChildMutationObserverConsumer} from "../../Discriminator/ChildMutationObserverConsumer/Interface/IChildMutationObserverConsumer";

export class ChildMutationObserver implements IChildMutationObserver {
	private consumers: WeakMap<IChildMutationObserverConsumer, Map<Node, MutationObserver>> = new WeakMap();

	public observe (consumer: IChildMutationObserverConsumer, node: Node = consumer): void {
		const entry = this.consumers.get(consumer);
		let nodeSource = entry != null ? entry.get(node) : null;

		if (entry != null && nodeSource != null) return;

		nodeSource = new MutationObserver(mutations => this.handleMutationRecords(mutations, consumer));
		const map = entry || new Map<Node, MutationObserver>();
		map.set(node, nodeSource);
		this.consumers.set(consumer, map);
		nodeSource.observe(node, {attributes: false, childList: true, characterData: false});
	}

	public unobserve (consumer: IChildMutationObserverConsumer, node?: Node): void {
		const observer = this.consumers.get(consumer);
		if (observer == null) return;

		if (node == null) {
			observer.forEach(source => source.disconnect());
			this.consumers.delete(consumer);
			return;
		}

		const nodeSource = observer.get(node);
		if (nodeSource == null) return;
		nodeSource.disconnect();
		observer.delete(node);
		if (observer.size < 1) this.consumers.delete(consumer);
	}

	private handleMutationRecords (records: MutationRecord[], consumer: IChildMutationObserverConsumer): void {
		records.forEach(record => {
			Array.from(record.addedNodes).forEach(node => {
				if (node instanceof Element) consumer.onChildBecameAdded(node);
			});
			Array.from(record.removedNodes).forEach(node => {
				if (node instanceof Element) consumer.onChildBecameRemoved(node);
			});
		});
	}
}