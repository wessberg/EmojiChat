import {Component, selector} from "../../Component/Component/Component";
import {IFrame} from "./Interface/IFrame";
import "../../Component/AppBarComponent/AppBarComponent";
import "../../Component/AppBarItemComponent/AppBarItemComponent";
import "../../Component/IconComponent/IconComponent";
import {GlobalObject} from "@wessberg/globalobject";
import {eventUtil} from "../../Service/Services";
import {EventName} from "../../EventName/EventName";

@selector("frame-element")
export class Frame extends Component implements IFrame {
	public role = "application";

	public static styles (): string {
		// language=CSS
		return `
			:host {
				transform: translate3d(0,0,0);
				backface-visibility: hidden;
				box-sizing: border-box;
				contain: content;
				position: relative;
				display: block;
				width: 100%;
				height: 100vh;
			}
		`;
	}

	public static markup (): string {

		return `
			<app-bar-element primary>
				<app-bar-item-element id="menuButton" no-underline slot="leftIcon">
					<icon-element icon="menu" light medium></icon-element>
				</app-bar-item-element>
			</app-bar-element>
			<slot></slot>
		`;
	}

	connectedCallback (): void {
		super.connectedCallback();
		eventUtil.fire(EventName.ATTACHED_FRAME, GlobalObject, this);
	}
}