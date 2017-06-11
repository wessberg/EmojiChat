import {ISnackbarAnimationOptions, ISnackbarComponent} from "./Interface/ISnackbarComponent";
import {OpenCloseableComponent} from "../OpenCloseableComponent/OpenCloseableComponent";
import {prop, selector} from "../Component/Component";
import {animationOperations, debounceUtil, eventUtil} from "../../Service/Services";
import {IAnimationOptions} from "../../Service/AnimationOperations/Interface/IAnimationOperations";
import {waitOperations} from "src/Service/Services";
import {IPropChangeRecord} from "../../Discriminator/PropObserverConsumer/IPropObserverConsumer";
import {EventName} from "../../EventName/EventName";

@selector("snackbar-element")
export class SnackbarComponent extends OpenCloseableComponent implements ISnackbarComponent {
	private static readonly FLOATING_PADDING: number = 24;
	private static readonly LEAVING_DURATION: number = 195;
	private static readonly LEAVING_EASING: string = "cubic-bezier(0.4, 0.0, 0.6, 1)";
	private static readonly ENTERING_DURATION: number = 375;
	private static readonly ENTERING_EASING: string = "cubic-bezier(0.4, 0.0, 0.2, 1)";
	private static readonly DELAY: number = 200;
	public role = "alert";
	@prop public action: string|null;
	public duration: number = 3000;
	private lock: boolean = false;

	public get floating (): boolean {
		return this.hasAttribute("floating");
	}

	public static markup (): string {
		// language=HTML
		return `
        <aside id="container">
            <slot id="messageSlot" name="message"></slot>
            <slot id="actionSlot" name="action"></slot>
        </aside>
		`;
	}

	public static styles (): string {
		// language=CSS
		return `

        :host {
            display: flex;
            flex-direction: row;
            width: 100%;
            position: fixed;
            bottom: 0;
            height: 48px;
            transform: translate3d(0, 48px, 0);
            z-index: 200;
            outline: none;
        }
				
				:host([floating]) {
						width: auto;
				}

        :host(:not([animating]):not([visible])) {
            display: none;
        }

        :host([floating]) {
            transform: translate3d(0, calc(48px + 24px), 0);
        }

        #container {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            margin: 0 auto;
            text-align: center;
            background-color: #323232;
            min-width: 288px;
            max-width: 568px;
            height: inherit;
            padding: 0 0 0 24px;
        }

        :host([floating]) {
            display: flex;
            flex-direction: row;
            justify-content: flex-start;
            bottom: 24px;
        }

        #actionSlot::slotted(*) {
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
            height: inherit !important;
            padding-left: var(--distance-regular);
        }

        #messageSlot::slotted(*) {
            color: var(--color-primary-text-light) !important;
            font-size: var(--font-size-body) !important;
            text-align: left !important;
            backface-visibility: hidden;
            pointer-events: none;
        }

        :host([floating][right]) {
            left: auto;
            right: 24px;
        }

        @media screen and (min-width: 450px) {
            :host([floating]:not([right])) {
                left: 24px;
            }

            :host([floating]) #container {
                margin: 0;
            }
        }

        @media screen and (min-width: 370px) {
            :host([floating]) #container {
                border-radius: var(--box-radius);
            }

            :host(:not([floating])) #container {
                border-radius: var(--box-radius) var(--box-radius) 0 0;
            }
        }

		`;
	}

	public open () {
		super.open();
		debounceUtil.debounce(this, () => {
			if (!this.lock) {
				this.visible = false;
			}
		}, this.duration, false);
	}

	public async onPropChanged ({prop, newValue, oldValue}: IPropChangeRecord): Promise<void> {

		switch (prop) {
			case "visible":
				if ((!newValue && oldValue == null) || this.floating) break;
				const name = this.visible ? EventName.SNACKBAR_OPEN : EventName.SNACKBAR_CLOSE;
				const detail: ISnackbarAnimationOptions = {
					duration: this.visible ? SnackbarComponent.ENTERING_DURATION : SnackbarComponent.LEAVING_DURATION,
					easing: this.visible ? SnackbarComponent.ENTERING_EASING : SnackbarComponent.LEAVING_EASING,
					height: 48 + (this.floating ? SnackbarComponent.FLOATING_PADDING : 0),
					delay: SnackbarComponent.DELAY
				};
				eventUtil.fire(name, window, detail);
				break;
		}
		await super.onPropChanged({prop, newValue, oldValue});

	}

	protected async animateFocusIn (): Promise<void> {
		this.style.willChange = "transform";

		const options: IAnimationOptions = {
			duration: SnackbarComponent.ENTERING_DURATION,
			easing: SnackbarComponent.ENTERING_EASING,
			fill: "forwards"
		};

		await waitOperations.wait(SnackbarComponent.DELAY);
		await Promise.all([
			animationOperations.animate(this, {transform: [`translate3d(0, ${48 + (this.floating ? SnackbarComponent.FLOATING_PADDING : 0)}px, 0)`, `translate3d(0, 0, 0)`]}, options)
		]);

		this.style.willChange = null;
	}

	protected async animateFocusOut (): Promise<void> {
		this.style.willChange = "transform";

		const options: IAnimationOptions = {
			duration: SnackbarComponent.LEAVING_DURATION,
			easing: SnackbarComponent.LEAVING_EASING,
			fill: "forwards"
		};

		await waitOperations.wait(SnackbarComponent.DELAY);
		await animationOperations.animate(this, {transform: [`translate3d(0, 0, 0)`, `translate3d(0, ${48 + (this.floating ? SnackbarComponent.FLOATING_PADDING : 0)}px, 0)`]}, options);

		this.style.willChange = null;
	}

	protected connectedCallback (): void {
		super.connectedCallback();

		const actionElement = Array.from(this.children).find(element => element.getAttribute("slot") === "action");
		if (actionElement != null) {
			Array.from(actionElement.children).forEach(child => eventUtil.listen(this, EventName.CLICK, child, this.close));
		}

	}
}