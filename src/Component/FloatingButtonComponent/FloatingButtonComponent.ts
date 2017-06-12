import {ButtonComponent} from "../ButtonComponent/ButtonComponent";
import {IFloatingButtonComponent} from "./Interface/IFloatingButtonComponent";
import {selector} from "../Component/Component";

@selector("floating-button-element")
export class FloatingButtonComponent extends ButtonComponent implements IFloatingButtonComponent {

	public static styles (): string {
		// language=CSS
		return super.styles() + `

        :host {
            border-radius: 50% !important;
            outline: none;
            width: 56px;
            display: flex;
            height: 56px;
            min-width: 56px;
            min-height: 56px;
            margin-bottom: 30px;
            transition: box-shadow var(--duration-medium) var(--easing-standard-curve);
            padding: 0;
        }

        :host {
            box-shadow: var(--shadow-level2);
        }

        :host([active]) {
            box-shadow: var(--shadow-level4);
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

        :host([active][shadow="1"]) {
            box-shadow: var(--shadow-level2);
        }

        :host([active][shadow="2"]) {
            box-shadow: var(--shadow-level3);
        }

        :host([active][shadow="3"]) {
            box-shadow: var(--shadow-level4);
        }

        :host([active][shadow="4"]) {
            box-shadow: var(--shadow-level5);
        }

        :host([active][shadow="5"]) {
            box-shadow: var(--shadow-level6);
        }

        :host([active][shadow="6"]) {
            box-shadow: var(--shadow-level7);
        }

        :host([active][shadow="7"]) {
            box-shadow: var(--shadow-level7);
        }

        :host([mini]) {
            width: 40px;
            height: 40px;
            min-width: 40px;
            min-height: 40px;
        }

        ::slotted(icon-element) {
            width: var(--width-icon-medium) !important;
            height: var(--width-icon-medium) !important;
						margin: auto !important;
        }
		`;
	}
}