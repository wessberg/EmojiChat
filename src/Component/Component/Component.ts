import {IComponent, IComponentConstructor} from "./IComponent";
import {Resource} from "../../../Resource/Resource";
import {IPropChangeRecord, IPropObserverConsumer} from "../../Discriminator/PropObserverConsumer/IPropObserverConsumer";
import {eventUtil} from "../../Service/Services";

/**
 * This is a semantic decorator for making sure that all used elements are in fact imported.
 * @param _
 * @returns {(_: IComponentConstructor)}
 */
export function uses (_: (new () => IComponent)[]) {
	return (_: IComponentConstructor) => {
	};
}

/**
 * Registers the given prototype and selector as a custom element.
 * @param selector
 * @returns {(prototype: IComponentConstructor)=>undefined}
 */
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

/**
 * A helper decorator for attaching getters and setters for properties.
 * @param model
 * @param prop
 */
export function prop (model: IPropObserverConsumer, prop: string): void {

	Object.defineProperty(model, prop, {
		get: function () {
			return (<IPropObserverConsumer>this)[<keyof IPropObserverConsumer>`_${prop}`];
		},
		set: async function (value: IPropObserverConsumer[keyof IPropObserverConsumer]) {
			const self = <IPropObserverConsumer>this;
			const current = self[<keyof IPropObserverConsumer>`_${prop}`];
			if (value !== current) {
				const normalizedValue = self.onBeforePropChanged != null ? self.onBeforePropChanged({prop, newValue: value}) : value;
				(<any>self)[`_${prop}`] = normalizedValue;
				await self.onPropChanged({prop, newValue: normalizedValue, oldValue: current});
			}
		},
		enumerable: true,
		configurable: false
	});
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

	public async onPropChanged ({}: IPropChangeRecord): Promise<void> {

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

	public addAttribute (name: string, value?: string): void {
		if (!this.hasAttribute(name)) this.setAttribute(name, value === undefined ? "" : value);
	}

	public removeAttribute (name: string): void {
		if (this.hasAttribute(name)) super.removeAttribute(name);
	}

	public toggleAttribute (name: string, condition?: boolean): void {
		if (condition === undefined) {
			// Simply remove the attribute if it exists or add it if it doesn't.
			if (this.hasAttribute(name)) super.removeAttribute(name);
			else this.addAttribute(name);
		} else {
			// Add the attribute if the condition is truthy. Remove it otherwise.
			if (condition) this.addAttribute(name);
			else this.removeAttribute(name);
		}
	}

	protected connectedCallback () {
		this.setAttribute("role", this.role);
		this.setAttribute("tabindex", this.tabindex);
	}

	protected disconnectedCallback () {
		if (this.parentElement) return;
		eventUtil.clearListeners(this);
	}

	private getCachedElement (selector: string): HTMLElement|undefined {
		return this.cachedElementLookups.get(selector);
	}

	private setCachedElement (selector: string, element: HTMLElement): HTMLElement {
		this.cachedElementLookups.set(selector, element);
		return element;
	}
}