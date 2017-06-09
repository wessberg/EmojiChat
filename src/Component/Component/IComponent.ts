export interface IComponent extends HTMLElement {
	role: string;
	tabindex: string;
	domRoot: ShadowRoot|HTMLElement;
	element (selector: string): HTMLElement;
}

export interface IComponentConstructor {
	template: HTMLTemplateElement|null;
	new (): IComponent;
	styles (): string|null;
	markup (): string|null;
}