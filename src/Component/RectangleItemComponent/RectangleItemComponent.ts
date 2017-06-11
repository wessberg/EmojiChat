import {Component, selector} from "../Component/Component";
import {IRectangleItemComponent} from "./Interface/IRectangleItemComponent";

@selector("rectangle-item-element")
export class RectangleItemComponent extends Component implements IRectangleItemComponent {
	public role = "listitem";

	static get observedAttributes (): string[] {
		return ["width"];
	}

	protected async attributeChangedCallback (attrName: string, _: string, _2: string): Promise<void> {
		switch (attrName) {
			case "width":
				const value = this.getAttribute("width");
				if (value == null || value.length < 1) this.removeAttribute("width");
				else {
					const suffix = isNaN(parseInt(value[value.length -1])) ? "" : "px";
					this.style.width = `${value}${suffix}`;
				}
				break;
		}
	}

	public static markup (): string {
		return `
			<slot></slot>
		`;
	}

	public static styles (): string {
		// language=CSS
		return `

        :host-context([center]),
        :host([center]) {
            align-self: center;
            justify-self: center;
        }

        :host-context([round]),
        :host([round]) {
            border-radius: 50%;
        }

        :host {
            user-select: none;
            backface-visibility: hidden;
            transform: translate3d(0, 0, 0);
            box-sizing: border-box;
            contain: content;
            overflow: hidden;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            text-align: center;
            flex-direction: row;
            position: relative;
            min-height: 46px;
            min-width: 46px;
            width: 200px;
            height: 46px;
            padding: 14px;
            border-radius: var(--box-radius);
            flex-shrink: 0;
            transition: background var(--duration-medium) var(--easing-standard-curve);
            color: var(--color-primary-100) !important;
            font-size: var(--font-size-button) !important;
            line-height: var(--font-size-button) !important;
            font-weight: var(--font-weight-button) !important;
        }

        :host-context([large-text]),
        :host([large-text]) {
            font-size: var(--font-size-title) !important;
        }

        :host-context([keep-case]) ::slotted(*),
        :host([keep-case]) ::slotted(*) {
            text-transform: none;
        }

        ::slotted(*) {
            color: inherit !important;
            font-size: inherit !important;
            line-height: inherit !important;
            font-weight: inherit !important;
            text-transform: uppercase;
        }

        ::slotted(icon-element) {
            fill: var(--color-icon-dark);
        }

        :host(:not([no-background])[primary]) {
            background: var(--color-primary-100);
        }

        :host([primary]) ::slotted(*) {
            color: var(--color-primary-text-light) !important;
        }

        :host([primary]) ::slotted(icon-element) {
            fill: var(--color-icon-light) !important;
        }

        :host(:not([no-background])[accent]) {
            background: var(--color-accent-100);
        }

        :host([accent]) ::slotted(*) {
            color: var(--color-primary-text-light) !important;
        }

        :host([accent]) ::slotted(icon-element) {
            fill: var(--color-icon-light) !important;
        }

        :host(:not([no-background])[dark]) {
            background: var(--color-black-70);
        }

        :host([dark]) ::slotted(*) {
            color: var(--color-primary-text-light) !important;
        }

        :host([dark]) ::slotted(icon-element) {
            fill: var(--color-icon-light) !important;
        }

        :host(:not([no-background])[light]) {
            background: var(--color-white-100);
        }

        :host([light]) ::slotted(*) {
            color: var(--color-primary-text-dark) !important;
        }

        :host([light]) ::slotted(icon-element) {
            fill: var(--color-icon-dark) !important;
        }

        :host(:not([no-background])[warning]) {
            background: var(--color-red-100);
        }

        :host([warning]) ::slotted(*) {
            color: var(--color-primary-text-light) !important;
        }

        :host([warning]) ::slotted(icon-element) {
            fill: var(--color-icon-light) !important;
        }

        :host(:not([no-background])[green]) {
            background: var(--color-green-100);
        }

        :host([green]) ::slotted(*) {
            color: var(--color-primary-text-light) !important;
        }

        :host([green]) ::slotted(icon-element) {
            fill: var(--color-icon-light) !important;
        }

        :host([shadow]) {
            box-shadow: var(--shadow-level1);
        }
		`;
	}
}