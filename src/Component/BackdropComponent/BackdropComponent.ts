import {Component, prop, selector} from "../Component/Component";
import {IBackdropComponent} from "./Interface/IBackdropComponent";
import {animationOperations, eventUtil, waitOperations} from "../../Service/Services";
import {EventName} from "../../EventName/EventName";
import {IPropChangeRecord} from "../../Discriminator/PropObserverConsumer/IPropObserverConsumer";

@selector("backdrop-element")
export class BackdropComponent extends Component implements IBackdropComponent {
	private static readonly OPACITY: number = 0.6;
	private static readonly DURATION: number = 225;
	private static readonly EASING: string = "ease-out";
	public role = "presentation";
	@prop public visible: boolean = false;

	public static styles (): string {
		// language=CSS
		return `

        :host {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            width: 100%;
            height: 100%;
            user-select: none;
            backface-visibility: hidden;
            transform: translate3d(0, 0, 0);
            contain: strict;
            background-color: #000000;
            z-index: 999;
            opacity: 0;
            display: block;
            pointer-events: auto;
        }

        :host(:not([visible])) {
            pointer-events: none;
            display: none;
        }

		`;
	}

	async onPropChanged ({prop}: IPropChangeRecord): Promise<void> {
		switch (prop) {

			case "visible":
				this.toggleAttribute("visible", this.visible);
				break;
		}
	}

	public async show (): Promise<void> {
		this.visible = true;
		this.style.willChange = "opacity";
		await waitOperations.wait(100);
		await animationOperations.animate(this, {opacity: [0, BackdropComponent.OPACITY]}, {
			duration: BackdropComponent.DURATION,
			easing: BackdropComponent.EASING,
			fill: "forwards"
		});
		this.style.willChange = null;
	}

	public async hide (): Promise<void> {
		this.style.willChange = "opacity";
		await waitOperations.wait(100);
		await animationOperations.animate(this, {opacity: [BackdropComponent.OPACITY, 0]}, {
			duration: BackdropComponent.DURATION,
			easing: BackdropComponent.EASING,
			fill: "forwards"
		});
		this.visible = false;
		this.style.willChange = null;
	}

	protected connectedCallback (): void {
		super.connectedCallback();
		eventUtil.listen(this, EventName.FOCUS_IN_STARTED, window, this.show);
		eventUtil.listen(this, EventName.FOCUS_OUT_STARTED, window, this.hide);
	}
}