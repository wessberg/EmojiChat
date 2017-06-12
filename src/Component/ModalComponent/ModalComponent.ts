import {selector} from "../Component/Component";
import {OpenCloseableComponent} from "../OpenCloseableComponent/OpenCloseableComponent";
import {IModalComponent} from "./Interface/IModalComponent";
import {eventUtil} from "../../Service/Services";
import {EventName} from "../../EventName/EventName";

@selector("modal-element")
export class ModalComponent extends OpenCloseableComponent implements IModalComponent {
	public role = "dialog";

	protected async preAnimateFocusIn (): Promise<void> {
		await super.preAnimateFocusIn();
		eventUtil.fire(EventName.FOCUS_IN_STARTED, window);
	}

	protected async postAnimateFocusIn (): Promise<void> {
		await super.postAnimateFocusIn();
		eventUtil.fire(EventName.FOCUS_IN_ENDED, window);
	}

	protected async preAnimateFocusOut (): Promise<void> {
		await super.preAnimateFocusOut();
		eventUtil.fire(EventName.FOCUS_OUT_STARTED);
	}

	protected async postAnimateFocusOut (): Promise<void> {
		await super.postAnimateFocusOut();
		eventUtil.fire(EventName.FOCUS_OUT_ENDED);
	}

	protected connectedCallback (): void {
		super.connectedCallback();
		eventUtil.listen(this, EventName.CLICK, this, this.onDismissRequest);
	}
}