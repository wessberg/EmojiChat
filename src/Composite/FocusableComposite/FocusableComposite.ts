import {Component, selector} from "../../Component/Component/Component";
import {IComposite} from "../Composite/Interface/IComposite";
import {KeyboardButtonKind} from "../../Service/KeyboardOperations/KeyboardButtonKind";
import {eventUtil} from "../../Service/Services";

@selector("focusable-composite")
export class FocusableComposite extends Component implements IComposite {
	private static readonly POINTER_INITIATED_DELAY = 1000;
	public target: HTMLElement;
	public actionTarget: HTMLElement|null;
	private lastFiredPointerDownEvent: PointerEvent|null;
	private timeout: NodeJS.Timer|null;
	private pointerInitiated: boolean = false;

	public styles () {
		// language=CSS
		return `
			:host {
				display: none;
			}
		`;
	}

	public listenForTarget (target: Element): void {
		eventUtil.listen(this, "pointerdown", target, this.onTargetPointerDown);
		eventUtil.listen(this, "keydown", target, this.onTargetKeyDown, false);
		eventUtil.listen(this, "focus", target, this.onTargetGotFocus);
		eventUtil.listen(this, "blur", target, this.onTargetLostFocus);
	}

	public unlistenFromTarget (target: Element): void {
		eventUtil.unlisten(this, "pointerdown", target, this.onTargetPointerDown);
		eventUtil.unlisten(this, "keydown", target, this.onTargetKeyDown);
		eventUtil.unlisten(this, "focus", target, this.onTargetGotFocus);
		eventUtil.unlisten(this, "blur", target, this.onTargetLostFocus);
	}

	protected connectedCallback (): void {
		super.connectedCallback();
		const parent = this.getRootNode().host;
		// Force the parent node as target if it hasn't been set yet.
		if (this.target == null && parent != null) {
			this.target = <HTMLElement>parent;
			if (this.actionTarget == null) this.actionTarget = this.target;
			this.listenForTarget(this.target);
		}
	}

	private onTargetKeyDown (e: KeyboardEvent): void {
		switch (e.keyCode) {
			case KeyboardButtonKind.SPACEBAR:
				e.preventDefault();
				this.fireClickEventOnActionTarget();
		}
	}

	private async onTargetPointerDown (e: PointerEvent): Promise<void> {
		if (e === this.lastFiredPointerDownEvent) return;
		this.pointerInitiated = true;

		if (this.timeout != null) {
			clearTimeout(this.timeout);
			this.timeout = null;
		}

		this.timeout = setTimeout(() => {
			this.pointerInitiated = false;
			this.timeout = null;
		}, FocusableComposite.POINTER_INITIATED_DELAY);
	}

	private fireClickEventOnActionTarget (): void {
		if (this.target == null || this.actionTarget == null) return;
		this.target.focus();
		const event = new MouseEvent("click");
		this.actionTarget.dispatchEvent(event);
	}

	private firePointerDownEventOnTarget (): void {
		if (this.target == null) return;
		const event = new PointerEvent("pointerdown", {width: -1, height: -1});
		this.lastFiredPointerDownEvent = event;
		this.target.dispatchEvent(event);
		this.target.focus();
	}

	private firePointerUpEventOnTarget (): void {
		if (this.target == null) return;
		const event = new PointerEvent("pointerup");
		this.target.dispatchEvent(event);
		this.target.blur();
	}

	private async onTargetGotFocus (): Promise<void> {
		if (!this.pointerInitiated) this.firePointerDownEventOnTarget();
	}

	private async onTargetLostFocus (): Promise<void> {
		this.firePointerUpEventOnTarget();
	}
}