import {ICardComponent} from "./ICardComponent";
import {Component, selector} from "../Component/Component";

@selector("card-element")
export class CardComponent extends Component implements ICardComponent {
	public role = "complementary";

	public static styles (): string {
		// language=CSS
		return `

		:host([center]) {
			align-content: center;
			justify-content: center;
			text-align: center;
		}
		
		:host([center]) ::slotted(*) {
			text-align: center;
		}
		
		:host([center]) ::slotted(p),
		:host([center]) ::slotted(strong),
		:host([center]) ::slotted(span),
		::slotted(*) {
			text-align: justify;
		}
		
		::slotted(*) {
			user-select: text !important;
		}
		
		::slotted(button-element),
		::slotted(anchor-element) {
			align-self: flex-end;
			justify-self: flex-end;
		}
		
		:host {
			max-width: 369px;
			min-width: 200px;
			margin: 0;
			padding: var(--distance-regular);
			width: auto;
			position: relative;
			display: flex;
			flex-direction: column;
			background: var(--color-white-100);
			box-shadow: var(--shadow-level4);
			contain: content;
			border-radius: var(--box-radius);
		}
		
		:host([shadow="1"]) {
			box-shadow: var(--shadow-level1);
		}
		
		:host([shadow="2"]) {
			box-shadow: var(--shadow-level2);
		}
		
		:host([shadow="3"]) {
			box-shadow: var(--shadow-level3);
		}
		
		:host([shadow="4"]) {
			box-shadow: var(--shadow-level4);
		}
		
		:host([shadow="5"]) {
			box-shadow: var(--shadow-level5);
		}
		
		:host([shadow="6"]) {
			box-shadow: var(--shadow-level6);
		}
		
		:host([shadow="7"]) {
			box-shadow: var(--shadow-level7);
		}
		
	`;
	}

	public static markup (): string {
		return `
			<slot></slot>
		`;
	}
}