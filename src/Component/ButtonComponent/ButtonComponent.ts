import {selector} from "../Component/Component";
import {IButtonComponent} from "./Interface/IButtonComponent";
import "../../Composite/RippleComposite/RippleComposite";
import "../../Composite/FocusableComposite/FocusableComposite";
import {RectangleItemComponent} from "../RectangleItemComponent/RectangleItemComponent";

@selector("button-element")
export class ButtonComponent extends RectangleItemComponent implements IButtonComponent {
	public tabindex = "0";
	public role = "button";

	public static styles (): string {
		// language=CSS
		return super.styles() + `
			:host {
				cursor: pointer !important;
			}

			.ripple {
				color: var(--color-primary-100);
			}
			
			:host([primary]) .ripple {
				color: var(--color-white-70);
			}
			
			:host([accent]) .ripple {
				color: var(--color-white-70);
			}
			
			:host(:not([no-background])[accent]:hover) {
				background: var(--color-accent-120);
			}
			
			:host([dark]) .ripple {
				color: var(--color-white-70);
			}
		
			:host(:not([no-background])[dark]:hover) {
				background: var(--color-black-87);
			}
			
			:host([light]) .ripple {
				color: var(--color-icon-dark);
			}
		
			:host(:not([no-background])[light]:hover) {
				background: var(--color-white-87);
			}
			
			:host(:not([no-background])[warning]:hover) {
				background: var(--color-red-120);
			}
		
			:host([warning]) .ripple {
				color: var(--color-white-70);
			}
			
			:host([shadow]:hover) {
				box-shadow: var(--shadow-level3);
			}
		
			:host(:not([no-background]):hover) {
				background: var(--color-black-06);
			}
			
			:host(:not([no-background])[primary]:hover) {
				background: var(--color-primary-120) !important;
			}
			
			:host[disabled] {
				pointer-events: none;
				opacity: .6;
			}
			
			::slotted(*) {
				pointer-events: none;
				cursor: pointer !important;
			}
		`;
	}

	public static markup (): string {
		return super.markup() + `
			<ripple-composite class="ripple" light></ripple-composite>
			<focusable-composite></focusable-composite>
		`;
	}
}