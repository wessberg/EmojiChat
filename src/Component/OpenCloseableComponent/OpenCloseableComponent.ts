import {Component, prop, selector} from "../Component/Component";
import {IOpenCloseableComponent} from "./Interface/IOpenCloseableComponent";
import {IPropChangeRecord} from "../../Discriminator/PropObserverConsumer/IPropObserverConsumer";
import {domUtil, eventUtil} from "../../Service/Services";
import {KeyboardButtonKind} from "../../Service/KeyboardOperations/KeyboardButtonKind";

@selector("open-closeable-element")
export class OpenCloseableComponent extends Component implements IOpenCloseableComponent {
	@prop public visible: boolean = false;
	@prop public animating: boolean = false;

	constructor () {
		super();

		eventUtil.listen(this, "keyup", this, this.onKeyboardButtonPressed);
	}

	public open () {
		this.visible = true;
	}

	public close () {
		this.visible = false;
	}

	public async onPropChanged ({prop, newValue, oldValue}: IPropChangeRecord): Promise<void> {
		await super.onPropChanged({prop, newValue, oldValue});

		switch (prop) {

			case "animating":
				this.toggleAttribute("animating", this.animating);
				break;

			case "visible":

				if (!newValue && oldValue == null) return;
				if (this.parentNode !== domUtil.rootElement) domUtil.attachToRoot(this);
				this.toggleAttribute("visible", this.visible);
				if (this.visible) {
					this.animating = true;
					await this.preAnimateFocusIn();
					await this.animateFocusIn();
					await this.postAnimateFocusIn();
					this.animating = false;
				}
				else {
					this.animating = true;
					await this.preAnimateFocusOut();
					await this.animateFocusOut();
					await this.postAnimateFocusOut();
					this.animating = false;
				}
				break;
		}
	}

	protected async preAnimateFocusIn (): Promise<void> {
	}

	protected async postAnimateFocusIn (): Promise<void> {
		this.focus();
	}

	protected async preAnimateFocusOut (): Promise<void> {
	}

	protected async postAnimateFocusOut (): Promise<void> {
		this.blur();
	}

	protected onDismissRequest (e?: MouseEvent): void {
		if (e == null || e.target === this) {
			this.close();
		}
	}

	protected async onKeyboardButtonPressed (e: KeyboardEvent): Promise<void> {

		switch (e.keyCode) {
			case KeyboardButtonKind.ESCAPE:
			case KeyboardButtonKind.BACKSPACE:
				if (this.visible) return this.onDismissRequest();
				break;
		}
	}

	protected async animateFocusIn (): Promise<void> {

	}

	protected async animateFocusOut (): Promise<void> {

	}
}