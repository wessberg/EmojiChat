import {IPage} from "./Interface/IPage";
import {ScrollComponent} from "../../Component/ScrollComponent/ScrollComponent";
import {selector} from "../../Component/Component/Component";
import {Resource} from "../../../Resource/Resource";

@selector("page-element")
export class Page extends ScrollComponent implements IPage {
	public static routeName = new RegExp("");
	private static didFirstPageRender: boolean = false;
	public role = "main";
	protected inDuration: number = 200;
	protected outDuration: number = this.inDuration;

	static get observedAttributes () {
		return ["visible"];
	}

	public static testRoute (path: string): boolean {
		if (`${this.routeName }` === `${new RegExp(Resource.browser.path.root())}`) return path === "/" || path === "" || path === Resource.browser.path.root() || path === Resource.browser.path.root().slice(0, Resource.browser.path.root().length - 1);
		return this.routeName.test(path);
	}

	public static styles (): string {
		return super.styles() + `
			:host {
				display: none;
				contain: strict;
				height: calc(100vh - var(--app-bar-portrait-height));
				top: var(--app-bar-portrait-height);
				margin-bottom: var(--app-bar-portrait-height);
				position: absolute;
			}
		`;
	}

	public async didBecomeVisible (): Promise<void> {
		this.setAttribute("visible", "");
	}

	public async didBecomeInvisible (): Promise<void> {
		if (this.hasAttribute("visible")) this.removeAttribute("visible");
	}

	public async animateIn (): Promise<void> {
		this.style.display = "block";
		if (!Page.didFirstPageRender) {
			Page.didFirstPageRender = true;
			return;
		}
	}

	public async animateOut (): Promise<void> {
		this.style.display = "none";
	}

	protected async attributeChangedCallback (attrName: string, _: string, newValue: string): Promise<void> {
		switch (attrName) {
			case "visible":
				newValue == null ? await this.animateOut() : await this.animateIn();
				break;
		}
	}

}