import {Component, selector, uses} from "../../Component/Component/Component";
import {IFrame} from "./Interface/IFrame";
import {AppBarComponent} from "../../Component/AppBarComponent/AppBarComponent";
import {AppBarItemComponent} from "../../Component/AppBarItemComponent/AppBarItemComponent";
import {IconComponent} from "../../Component/IconComponent/IconComponent";
import {AppDrawerComponent} from "../../Component/AppDrawerComponent/AppDrawerComponent";
import {ButtonComponent} from "../../Component/ButtonComponent/ButtonComponent";
import {GlobalObject} from "@wessberg/globalobject";
import {eventUtil} from "../../Service/Services";
import {EventName} from "../../EventName/EventName";
import {Resource} from "../../../Resource/Resource";

@selector("frame-element")
@uses([IconComponent, ButtonComponent, AppBarComponent, AppBarItemComponent, AppDrawerComponent])
export class Frame extends Component implements IFrame {
	public role = "application";

	public static styles (): string {
		// language=CSS
		return `
        :host {
            transform: translate3d(0, 0, 0);
            backface-visibility: hidden;
            box-sizing: border-box;
            contain: content;
            position: relative;
            display: block;
            width: 100%;
            height: 100vh;
        }

        app-drawer-element > button-element > p {
            padding-left: var(--distance-minimum);
        }
			
		`;
	}

	public static markup (): string {

		// language=HTML
		return `
        <app-bar-element primary>
            <app-bar-item-element id="menuButton" no-underline slot="leftIcon">
                <icon-element icon="menu" light medium></icon-element>
            </app-bar-item-element>
            <h6 slot="title">${Resource.app.meta.title}</h6>
        </app-bar-element>
        <app-drawer-element>
            <button-element no-background dark slot="drawer">
                <icon-element icon="people-fill" light medium></icon-element>
            </button-element>
            <button-element no-background dark slot="drawer">
                <icon-element icon="settings" light medium></icon-element>
            </button-element>
            <slot slot="main"></slot>
        </app-drawer-element>
		`;
	}

	connectedCallback (): void {
		super.connectedCallback();
		eventUtil.fire(EventName.ATTACHED_FRAME, GlobalObject, this);
		eventUtil.listen(this, EventName.CLICK, this.element("menuButton"), this.onClickedMenu);
	}

	private onClickedMenu (): void {
		const appDrawer = this.element("app-drawer-element");
		if (appDrawer.hasAttribute("open")) appDrawer.removeAttribute("open");
		else appDrawer.setAttribute("open", "");
	}
}