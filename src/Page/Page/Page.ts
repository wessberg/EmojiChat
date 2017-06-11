import {IPage} from "./Interface/IPage";
import {ScrollComponent} from "../../Component/ScrollComponent/ScrollComponent";
import {selector} from "../../Component/Component/Component";
import {BrowserResource} from "../../../Resource/BrowserResource";

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
		if (`${this.routeName }` === `${new RegExp(BrowserResource.path.root)}`) return path === "/" || path === "" || path === BrowserResource.path.root || path === BrowserResource.path.root.slice(0, BrowserResource.path.root.length - 1);
		return this.routeName.test(path);
	}

	public static styles (): string {
		// language=CSS
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
		this.addAttribute("visible");
	}

	public async didBecomeInvisible (): Promise<void> {
		this.removeAttribute("visible");
	}

	public get visible (): boolean {
		return this.hasAttribute("visible");
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