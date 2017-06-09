import {Component, selector} from "../Component/Component";
import {IAppBarItemComponent} from "./Interface/IAppBarItemComponent";
import "../ButtonComponent/ButtonComponent";

@selector("app-bar-item-element")
export class AppBarItemComponent extends Component implements IAppBarItemComponent {

	public static styles (): string {
		// language=CSS
		return `
			:host {
				position: relative;
				display: flex;
				flex-direction: column;
				align-content: center;
				justify-content: center;
				padding-top: 3px;
			}
			
			:host(:hover) hr {
				visibility: visible;
				opacity: 1;
			}

			::slotted(*) {
				font-size: var(--font-size-subheading) !important;
				color: var(--color-primary-text-light) !important;
			}
			
			button-element {
				width: inherit;
			}
			
			hr {
				visibility: hidden;
				opacity: 0;
				transition: opacity var(--duration-medium) var(--easing-standard-curve);
				display: block;
				position: relative;
				height: 3px;
				transform: translate3d(0, 5px, 0);
				background-color: var(--color-primary-text-light);
			}
			
			:host([no-underline]) {
				padding-top: 0;
			}
			
			:host([no-underline]) hr {
				display: none;
			}
		`;
	}

	public static markup (): string {
		return `
			<button-element dark keep-case no-background>
				<slot></slot>
			</button-element>
			<hr>
		`;
	}
}