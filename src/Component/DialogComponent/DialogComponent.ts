import {ModalComponent} from "../ModalComponent/ModalComponent";
import {IDialogComponent} from "./Interface/IDialogComponent";
import {KeyboardButtonKind} from "../../Service/KeyboardOperations/KeyboardButtonKind";
import {animationOperations, waitOperations} from "../../Service/Services";
import {selector} from "../Component/Component";

@selector("dialog-element")
export class DialogComponent extends ModalComponent implements IDialogComponent {
	private static readonly ENTERING_DURATION: number = 225;
	private static readonly ENTERING_EASING: string = "cubic-bezier(0.4, 0.0, 0.6, 1)";
	private static readonly LEAVING_DURATION: number = DialogComponent.ENTERING_DURATION * 2;
	private static readonly LEAVING_EASING: string = "cubic-bezier(0.4, 0.0, 0.2, 1)";

	public get dismissable (): boolean {
		return this.hasAttribute("dismissable");
	}

	public static markup (): string {
		// language=HTML
		return `
        <div id="container">
						<slot></slot>
        </div>
		`;
	}

	public static styles (): string {
		// language=CSS
		return `

        :host {
            box-sizing: border-box;
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
            align-content: center;
            justify-content: center;
            z-index: 1000;
            transform: translate3d(0, 0, 0);
        }

        #container {
            transform: translate3d(0, 0, 0);
            box-sizing: border-box;
            contain: content;
            display: flex;
            justify-content: flex-start;
            flex-direction: column;
            position: relative;
            background-color: #FAFAFA;
            padding: 24px;
            min-width: 250px;
            max-width: calc(100% - 80px);
            max-height: calc(100% - 48px);
            border-radius: var(--box-radius);
            box-shadow: var(--shadow-level5);
            overflow: hidden;
            opacity: 0;
            outline: none;
            margin: auto;
        }

        :host(:not([animating]):not([visible])) {
            display: none;
        }
		`;
	}

	protected onDismissRequest (e?: MouseEvent): void {
		if (e == null || e.target === this && this.dismissable) this.close();
	}

	protected async onKeyboardButtonPressed (e: KeyboardEvent): Promise<void> {

		switch (e.keyCode) {
			case KeyboardButtonKind.ESCAPE:
			case KeyboardButtonKind.BACKSPACE:
			case KeyboardButtonKind.ENTER:
				if (this.visible && this.dismissable) return this.onDismissRequest();
				break;
		}
	}

	protected async animateFocusIn (): Promise<void> {
		this.style.willChange = "opacity";
		await waitOperations.wait(100);
		await animationOperations.animate(this.element("container"), {opacity: [0, 1]}, {
			duration: DialogComponent.ENTERING_DURATION,
			easing: DialogComponent.ENTERING_EASING,
			fill: "forwards"
		});
		this.style.willChange = null;
	}

	protected async animateFocusOut (): Promise<void> {
		this.style.willChange = "opacity";
		await waitOperations.wait(100);
		await animationOperations.animate(this.element("container"), {opacity: [1, 0]}, {
			duration: DialogComponent.LEAVING_DURATION,
			easing: DialogComponent.LEAVING_EASING,
			fill: "forwards"
		});
		this.style.willChange = null;
	}
}