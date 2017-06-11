import {IPage} from "./Interface/IPage";
import {ScrollComponent} from "../../Component/ScrollComponent/ScrollComponent";
import {selector} from "../../Component/Component/Component";
import {BrowserResource} from "../../../Resource/BrowserResource";
import {animationOperations, eventUtil, waitOperations} from "../../Service/Services";
import {EventName} from "../../EventName/EventName";
import {ISnackbarAnimationOptions} from "../../Component/SnackbarComponent/Interface/ISnackbarComponent";

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

	public get visible (): boolean {
		return this.hasAttribute("visible");
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
						z-index: 600;
        }
		`;
	}

	public async didBecomeVisible (): Promise<void> {
		this.addAttribute("visible");
		eventUtil.listen(this, EventName.SNACKBAR_OPEN, window, this.onSnackbarOpen);
		eventUtil.listen(this, EventName.SNACKBAR_CLOSE, window, this.onSnackbarClose);
	}

	public async didBecomeInvisible (): Promise<void> {
		this.removeAttribute("visible");
		eventUtil.unlisten(this, EventName.SNACKBAR_OPEN, window, this.onSnackbarOpen);
		eventUtil.unlisten(this, EventName.SNACKBAR_CLOSE, window, this.onSnackbarClose);
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

	private async onSnackbarOpen ({detail}: Event&{ detail: ISnackbarAnimationOptions }): Promise<void> {
		await waitOperations.wait(detail.delay);
		await animationOperations.animate(this,
			{transform: [`translate3d(0,0,0)`, `translate3d(0,-${detail.height}px,0)`]},
			{duration: detail.duration, easing: detail.easing, fill: "forwards"}
		);
	}

	private async onSnackbarClose ({detail}: Event&{ detail: ISnackbarAnimationOptions }): Promise<void> {
		await waitOperations.wait(detail.delay);
		await animationOperations.animate(this,
			{transform: [`translate3d(0,-${detail.height}px,0)`, `translate3d(0,0,0)`]},
			{duration: detail.duration, easing: detail.easing, fill: "forwards"}
		);
	}

}