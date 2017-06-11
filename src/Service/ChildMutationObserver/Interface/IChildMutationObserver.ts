import {IChildMutationObserverConsumer} from "../../../Discriminator/ChildMutationObserverConsumer/Interface/IChildMutationObserverConsumer";

export interface IChildMutationObserver {
	observe (consumer: IChildMutationObserverConsumer, node?: Node): void;
	unobserve (consumer: IChildMutationObserverConsumer, node?: Node): void;
}

