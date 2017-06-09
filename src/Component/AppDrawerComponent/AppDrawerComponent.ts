import {Component, selector} from "../Component/Component";
import {IAppDrawerComponent} from "./Interface/IAppDrawerComponent";
import {EventName} from "../../EventName/EventName";
import {animationOperations, eventUtil, waitOperations} from "../../Service/Services";

@selector("app-drawer-element")
export class AppDrawerComponent extends Component implements IAppDrawerComponent {
	private static readonly IN_DURATION = 225;
	private static readonly OUT_DURATION = 195;
	private static readonly IN_EASING = "cubic-bezier(0.4, 0.0, 0.2, 1)";
	private static readonly OUT_EASING = "cubic-bezier(0.4, 0.0, 0.2, 1)";

	static get observedAttributes (): string[] {
		return ["open"];
	}

	public static styles (): string {
		// language=CSS
		return `			

        :host {
            position: relative;
            width: 100%;
            min-height: 100%;
            display: block;
            transform: translate3d(-70px, 0, 0);
        }

        #drawer {
            width: 70px;
						display: block;
            background: var(--color-black-26);
						position: absolute;
						top: var(--app-bar-portrait-height);
						left: 0;
						height:  calc(100% - var(--app-bar-portrait-height));
						box-shadow: var(--shadow-level2);
						transform: translate3d(0, 0, 0);
						z-index: 2;
        }
				
				#drawerContent {
						position: relative;
						width: 100%;
						height: 100%;
						flex-direction: column;
						align-content: center;
						justify-content: flex-start;
						padding: var(--distance-minimum) 0;
				}
				
				#drawerSlot::slotted(*) {
						position: relative;
						width: 70px;
						margin: 5px auto !important;
				}
			
				#main {
						width: 100%;
						transform: translate3d(70px, 0, 0);
						backface-visibility: hidden;
						box-sizing: border-box;
						contain: content;
						position: relative;
						display: block;
						height: 100vh;
						z-index: 0;
				}
		`;
	}

	public static markup (): string {
		// language=HTML
		return `
        <aside id="drawer">
						<section id="drawerContent">
								<slot id="drawerSlot" name="drawer"></slot>
						</section>
        </aside>
        <main id="main">
            <slot id="mainSlot" name="main"></slot>
        </main>
		`;
	}

	protected async animateIn (): Promise<void> {
		this.style.willChange = "transform";
		await waitOperations.wait(100);
		await animationOperations.animate(this, {
			transform: ["translate3d(-70px, 0, 0)", "translate3d(0,0,0)"]
		}, {duration: AppDrawerComponent.IN_DURATION, easing: AppDrawerComponent.IN_EASING, fill: "forwards"});
		this.style.willChange = null;
	}

	protected async animateOut (): Promise<void> {
		this.style.willChange = "transform";
		await waitOperations.wait(100);
		await animationOperations.animate(this, {
			transform: ["translate3d(0, 0, 0)", "translate3d(-70px,0,0)"]
		}, {duration: AppDrawerComponent.OUT_DURATION, easing: AppDrawerComponent.OUT_EASING, fill: "forwards"});
		this.style.willChange = null;
	}

	protected async attributeChangedCallback (attrName: string, _: string, newValue: string): Promise<void> {
		switch (attrName) {
			case "open":
				newValue != null ? await this.animateIn() : await this.animateOut();
				break;
		}
	}

	protected connectedCallback (): void {
		super.connectedCallback();
		const mainElement = Array.from(this.children).find(element => element.getAttribute("slot") === "main");
		if (mainElement != null) eventUtil.listen(this, EventName.CLICK, mainElement, this.onClicked);
	}

	private onClicked (): void {
		if (this.hasAttribute("open")) {
			this.removeAttribute("open");
		}
	}
}