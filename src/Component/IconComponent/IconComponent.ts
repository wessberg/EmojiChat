import {Component, selector} from "../Component/Component";
import {IIconComponent} from "./Interface/IIconComponent";
import {IIcon} from "../../Asset/Icon/Interface/IIcon";
import {svgIconUtil} from "../../Service/Services";

@selector("icon-element")
export class IconComponent extends Component implements IIconComponent {
	public icon: IIcon|null;
	public svg: SVGElement|null;

	static get observedAttributes (): string[] {
		return ["icon"];
	}

	public static styles (): string {
		// language=CSS
		return `
        :host-context([center]),
        :host([center]) {
            margin: 0 auto;
        }

        #fill_target,
        :host {
            fill: var(--color-icon-dark);
        }

        :host([light]) #fill_target,
        :host([light]) {
            fill: var(--color-icon-light);
        }

        :host([dark]) #fill_target,
        :host([dark]) {
            fill: var(--color-icon-dark);
        }

        :host([primary]) #fill_target,
        :host([primary]) {
            fill: var(--color-primary-100);
        }

        :host([accent]) #fill_target,
        :host([accent]) {
            fill: var(--color-accent-100);
        }

        :host([warning]) #fill_target,
        :host([red]) #fill_target,
        :host([warning]),
				:host([red]) {
            fill: var(--color-red-100);
        }
				
        :host([blue]) #fill_target,
        :host([blue]) {
            fill: var(--color-blue-100);
        }

        :host([orange]) #fill_target,
        :host([orange]) {
            fill: var(--color-orange-100);
        }

        :host {
            user-select: none;
            backface-visibility: hidden;
            transform: translate3d(0, 0, 0);
            position: relative;
            vertical-align: middle;
            width: var(--width-icon-small);
            height: var(--height-icon-small);
            pointer-events: none;
            contain: size layout style;
            overflow: hidden;
            flex-shrink: 0;
            display: inline-flex;
            justify-content: center;
            align-items: center;
        }

        :host([small]) {
            width: var(--width-icon-small);
            height: var(--height-icon-small);
        }

        :host([medium]) {
            width: var(--width-icon-medium);
            height: var(--height-icon-medium);
        }

        :host([large]) {
            width: var(--width-icon-large);
            height: var(--height-icon-large);
        }

        :host([larger]) {
            width: var(--width-icon-larger);
            height: var(--height-icon-larger);
        }

        :host([huge]) {
            width: var(--width-icon-huge);
            height: var(--height-icon-huge);
        }

        :host([extreme]) {
            width: var(--width-icon-extreme);
            height: var(--height-icon-extreme);
        }

        :host([brutal]) {
            width: var(--width-icon-brutal);
            height: var(--height-icon-brutal);
        }

		`;
	}

	protected attributeChangedCallback (attrName: string, _: string, newVal: string): void {
		switch (attrName) {

			case "icon":
				if (newVal != null) {
					this.clearSvg();
					const svg = svgIconUtil.buildIconFromName(newVal);
					if (svg == null) throw ReferenceError(`Failed to build an SVG for icon: ${newVal}`);
					this.svg = svg;
					this.setSvg(svg);
				} else {
					this.svg = null;
					this.clearSvg();
				}
				break;
		}
	}

	private setSvg (svg: SVGElement): void {
		if (this.shadowRoot != null) this.shadowRoot.appendChild(svg);
		else this.appendChild(svg);
	}

	private clearSvg (): void {
		const elem = this.shadowRoot != null ? this.shadowRoot : this;
		const svg = elem.querySelector("svg");
		if (svg == null) return;
		elem.removeChild(svg);
	}

}