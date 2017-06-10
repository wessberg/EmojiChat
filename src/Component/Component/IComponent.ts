import {IPropObserverConsumer} from "../../Discriminator/PropObserverConsumer/IPropObserverConsumer";

export interface IComponent extends HTMLElement, IPropObserverConsumer {
	role: string;
	tabindex: string;
	domRoot: ShadowRoot|HTMLElement;
	element (selector: string): HTMLElement;
	addAttribute (name: string, value?: string): void;
	toggleAttribute (name: string, condition?: boolean): void;
}

export interface IComponentConstructor {
	template: HTMLTemplateElement|null;
	new (): IComponent;
	styles (): string|null;
	markup (): string|null;
}