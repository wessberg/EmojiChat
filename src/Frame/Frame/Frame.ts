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
import {AnchorComponent} from "../../Component/AnchorComponent/AnchorComponent";
import {BackdropComponent} from "../../Component/BackdropComponent/BackdropComponent";

@selector("frame-element")
@uses([IconComponent, ButtonComponent, AppBarComponent, AppBarItemComponent, AppDrawerComponent, AnchorComponent, BackdropComponent])
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
			
			app-drawer-element > anchor-element > button-element {
          position: relative;
          width: 70px;
					margin: 5px auto;
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
        <anchor-element slot="drawer" href="/">
        	<button-element no-background dark>
                <icon-element icon="camera-fill" light medium></icon-element>
            </button-element>
				</anchor-element>
        <anchor-element slot="drawer" href="/gallery">
        	<button-element no-background dark>
                <icon-element icon="image" light medium></icon-element>
            </button-element>
				</anchor-element>
            <slot slot="main"></slot>
        </app-drawer-element>
        <backdrop-element></backdrop-element>
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