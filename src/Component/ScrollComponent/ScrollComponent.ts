import {IScrollComponent} from "./Interface/IScrollComponent";
import {Component, selector} from "../Component/Component";
import {agentDetector, eventUtil, waitOperations} from "../../Service/Services";

@selector("scroll-element")
export class ScrollComponent extends Component implements IScrollComponent {
	private static BOUND_BODY_LISTENER: boolean = false;
	public role = "list";

	constructor () {
		super();

		if (agentDetector.isIOSDevice && !ScrollComponent.BOUND_BODY_LISTENER) {
			ScrollComponent.BOUND_BODY_LISTENER = true;
			eventUtil.listen(this, "touchmove", document.body, ScrollComponent.onBodyTouchMove, false);
		}
	}

	public static markup () {
		return `<slot></slot>`;
	}

	public static styles () {
		return `

			:host {
				transform: translate3d(0,0,0);
				backface-visibility: hidden;
				box-sizing: border-box;
				contain: content;
				position: relative;
				display: block;
				width: 100%;
			}

			:host,
			:host([direction="y"]),
			:host([direction="Y"]) {
				overflow-y: scroll;
				overflow-x: hidden;
			}
			
			:host([direction="x"]),
			:host([direction="X"]) {
				overflow-y: hidden;
				overflow-x: scroll;
			}
			
			:host([direction="x"]),
			:host([direction="X"]) {
				overflow-y: hidden;
				overflow-x: scroll;
			}
			
			:host([direction="both"]),
			:host([direction="both"]) {
				overflow-y: scroll;
				overflow-x: scroll;
				overflow: scroll;
			}
		`;
	}

	private static onBodyTouchMove (e: TouchEvent): void {
		if (e.cancelable && !e._isScroller) {
			return e.preventDefault();
		}
	}

	public disconnectedCallback (): void {
		super.disconnectedCallback();
		this.unlistenForScrollTarget(this);
	}

	protected async connectedCallback (): Promise<void> {
		super.connectedCallback();
		this.listenForScrollTarget(this);
		await this.connectScroller();
	}

	private async connectScroller (): Promise<void> {

		if (agentDetector.isIOSDevice) {
			await waitOperations.wait(1000);
			this.style.webkitOverflowScrolling = "touch";
		}
	}

	private listenForScrollTarget (target: HTMLElement): void {
		if (agentDetector.isIOSDevice) {
			eventUtil.listen(this, "touchstart", target, this.onScrollTargetTouchstart);
			eventUtil.listen(this, "touchmove", target, this.onScrollTargetTouchmove);
		}
	}

	private unlistenForScrollTarget (target: HTMLElement): void {
		if (agentDetector.isIOSDevice) {
			eventUtil.unlisten(this, "touchstart", target, this.onScrollTargetTouchstart);
			eventUtil.unlisten(this, "touchmove", target, this.onScrollTargetTouchmove);
		}
	}

	private canScroll (target: EventTarget): boolean {
		if (!(target instanceof HTMLElement)) return false;
		if (target.scrollHeight === target.offsetHeight) throw new TypeError(`scrollTarget is either not visible or hasn't got a fixed height and display style property. Couldn't decide scrollability`);
		return target.scrollHeight > target.offsetHeight;
	}

	private fixScrollBounds (target: EventTarget): void {
		if (!(target instanceof HTMLElement)) return;
		const {scrollTop} = target;
		if (scrollTop === 0) target.scrollTop = 1;
		else if (scrollTop + target.offsetHeight === target.scrollHeight) {
			target.scrollTop = scrollTop - 1;
		}
	}

	private onScrollTargetTouchstart (e: TouchEvent): void {
		this.fixScrollBounds(e.currentTarget);
	}

	private onScrollTargetTouchmove (e: TouchEvent): void {
		if (this.canScroll(e.currentTarget)) e._isScroller = true;
	}
}