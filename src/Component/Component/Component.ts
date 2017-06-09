import {IComponent, IComponentConstructor} from "./IComponent";
import {Resource} from "../../../Resource/Resource";

export function selector (selector: string) {
	return (prototype: IComponentConstructor) => {
		customElements.define(selector, prototype);
		const styles = prototype.styles();
		const markup = prototype.markup();
		if (styles == null && markup == null) return;

		const actualStyles = styles == null ? "" : `
		<link rel="stylesheet" href="${Resource.app.path.dist.sharedCss(1)}" />
		<style>${styles}</style>`;
		const actualMarkup = markup == null ? "" : markup;

		const template = document.createElement("template");
		template.innerHTML = `
		${actualStyles}
		${actualMarkup}
	`;
		prototype.template = template;
	};
}

@selector("component-element")
export class Component extends HTMLElement implements IComponent {
	public static template: HTMLTemplateElement|null = null;
	public role: string = "presentation";
	public tabindex: string = "-1";
	private cachedElementLookups: Map<string, HTMLElement> = new Map();

	constructor () {
		super();
		this.injectTemplate();
	}

	public get domRoot (): ShadowRoot|HTMLElement {
		return this.shadowRoot == null ? this : this.shadowRoot;
	}

	public static styles (): string|null {
		return null;
	}

	public static markup (): string|null {
		return null;
	}

	injectTemplate () {
		const ctor = <IComponentConstructor>(<any>this.constructor);
		if (ctor.template == null) return;

		const root = this.attachShadow({mode: "open"});
		const temp = document.importNode(ctor.template.content, true);

		root.appendChild(temp);
	}

	public element (selector: string): HTMLElement {
		const cached = this.getCachedElement(selector);
		if (cached != null) return cached;

		const firstPass = <HTMLElement> (this.shadowRoot == null ? this.querySelector(`#${selector}`) : this.shadowRoot.querySelector(`#${selector}`));
		if (firstPass != null) return this.setCachedElement(selector, firstPass);
		return this.setCachedElement(selector, <HTMLElement> (this.shadowRoot == null ? document.querySelector(selector) : this.shadowRoot.querySelector(selector)));
	}

	protected connectedCallback () {
		this.setAttribute("role", this.role);
		this.setAttribute("tabindex", this.tabindex);
	}

	protected disconnectedCallback () {
	}

	private getCachedElement (selector: string): HTMLElement|undefined {
		return this.cachedElementLookups.get(selector);
	}

	private setCachedElement (selector: string, element: HTMLElement): HTMLElement {
		this.cachedElementLookups.set(selector, element);
		return element;
	}
}