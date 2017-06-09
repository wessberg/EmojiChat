import {FeedbackComposite} from "../FeedbackComposite/FeedbackComposite";
import {IRippleComposite} from "./Interface/IRippleComposite";
import {selector} from "../../Component/Component/Component";
import {animationOperations, waitOperations} from "../../Service/Services";

@selector("ripple-composite")
export class RippleComposite extends FeedbackComposite implements IRippleComposite {
	private static readonly RIPPLE_ADDITIONAL_SIZE: number = 50;
	private static readonly ANIMATION_FRAME_DELAY: number = 20;
	private static readonly RIPPLE_HIGHLIGHT_AMOUNT: number = 0.30;
	private static readonly HIGHLIGHT_AMOUNT: number = 0.2;
	private static readonly RIPPLE_LIGHT_HIGHLIGHT_AMOUNT: number = 0.18;
	private static readonly HIGHLIGHT_LIGHT_AMOUNT: number = 0.08;

	public rippleEasing: string = "linear";
	public highlightAmount: number = RippleComposite.HIGHLIGHT_AMOUNT;
	public rippleHighlightAmount: number = RippleComposite.RIPPLE_HIGHLIGHT_AMOUNT;
	public highlightDuration: number = 0.7;
	public rippleDuration: number = 5;
	private lastRipple: HTMLDivElement|null;

	static get observedAttributes () {
		return ["light", "one-shot-animating", "complex-animating", "pointer-down"];
	}

	public static markup (): string {
		return `<aside id="highlight"></aside>`;
	}

	public static styles (): string {
		return `

			#highlight {
				visibility: hidden;
				background-color: currentcolor;
				opacity: 0;
				width: 100%;
				height: 100%;
				top: 0;
				left: 0;
				right: 0;
				bottom: 0;
			}

			:host([one-shot-animating]) #highlight,
			:host([complex-animating]) #highlight {
				visibility: visible;
			}

			:host > div, #highlight {
				user-select: none;
				position: absolute;
				pointer-events: none;
				contain: strict;
			}

			:host > div {
				position: absolute;
				display: block;
				border-radius: 50%;
				background-color: currentcolor;
				transform: scale(0) translateZ(0);
				width: 0;
  			height: 0;
				opacity: 0;
			}
		`;
	}

	public async animateOneShot (ripple?: HTMLDivElement|null): Promise<void> {

		if (ripple == null) ripple = await this.createAndAddRipple();
		if (ripple == null) return;

		await Promise.all<Animation|void>([
			animationOperations.animate(ripple, {
				opacity: [this.rippleHighlightAmount, 0],
				transform: ["scale(0) translateZ(0)", "scale(1) translateZ(0)"]
			}, {duration: this.oneShotAnimationDuration * 1000, easing: this.rippleEasing}),

			this.element("highlight") == null ? Promise.resolve() :
				animationOperations.animate(this.element("highlight"), {opacity: [0, this.highlightAmount, 0]}, {
					duration: this.oneShotAnimationDuration * 1000,
					easing: this.rippleEasing
				})]);
		this.clearRipple(ripple);
	}

	protected async attributeChangedCallback (attrName: string, _: string, newVal: string): Promise<void> {
		await super.attributeChangedCallback(attrName, _, newVal);
		switch (attrName) {

			case "light":
				if (newVal) {
					this.rippleHighlightAmount = RippleComposite.RIPPLE_LIGHT_HIGHLIGHT_AMOUNT;
					this.highlightAmount = RippleComposite.HIGHLIGHT_LIGHT_AMOUNT;
				}
				break;

			case "one-shot-animating":
				if (this.oneShotAnimating) {
					await Promise.all([this.animateOneShot(), this.whenAllRipplesHasFinishedAnimating()]);
					this.oneShotAnimating = false;
					if (this.hasAttribute("one-shot-animating")) this.removeAttribute("one-shot-animating");
				}
				break;

			case "complex-animating":
				if (this.complexAnimating) {
					await this.animateIn();
				}
				break;

			case "pointer-down":

				if (this.complexAnimating && !this.pointerDown && !this.oneShotAnimating) {
					await this.animateOut();
					this.complexAnimating = false;
					if (this.hasAttribute("complex-animating")) this.removeAttribute("complex-animating");
				}
				break;

		}

	}

	protected connectedCallback (): void {
		super.connectedCallback();

		if (this.target != null) {
			this.prepareTarget(this.target);
		}
	}

	private getTargetDimensions (): ClientRect|void {
		if (this.target == null) return;
		return this.target.getBoundingClientRect();
	}

	private computeRippleDimensions (): { width: number, height: number, size: number }|void {
		// Get the width and height of the surrounding container.
		// The ripple will always have equal width and height.
		const dimensions = this.getTargetDimensions();
		if (dimensions == null) return;

		const {width, height} = dimensions;

		// The size should be equal to the greater of the two axis.
		// Add half of the size to it to make sure that the circle fills the entire square.
		let size = Math.max(width, height) + (Math.max(width, height) / 2);

		// Add in whatever pixels are floating beyond the visible square in relation to the offset position of the pointer event.
		if (this.lastCoordinates != null && !this.hasAttribute("center")) {
			const xDiff = Math.abs((width / 2) - this.lastCoordinates.offsetX);
			const yDiff = Math.abs((height / 2) - this.lastCoordinates.offsetY);
			size += xDiff + yDiff + RippleComposite.RIPPLE_ADDITIONAL_SIZE;
		}
		return {width, height, size};
	}

	private getRippleStyles (): { prop: "top"|"left"|"width"|"height", value: string }[]|void {
		const dimensions = this.computeRippleDimensions();
		if (dimensions == null) return;

		const {width, height, size} = dimensions;

		const top = this.hasAttribute("center") || this.lastCoordinates == null
			? (height / 2) - (size / 2)
			: this.lastCoordinates.offsetY - (size / 2);

		const left = this.hasAttribute("center") || this.lastCoordinates == null
			? (width / 2) - (size / 2)
			: this.lastCoordinates.offsetX - (size / 2);

		return [
			{prop: "top", value: `${top}px`},
			{prop: "left", value: `${left}px`},
			{prop: "width", value: `${size}px`},
			{prop: "height", value: `${size}px`}
		];
	}

	private createRipple (): HTMLDivElement|void {
		const styles = this.getRippleStyles();
		if (styles == null) throw new ReferenceError(`RippleComposite could not get styles for undefined target!`);

		const div = document.createElement("div");
		styles.forEach(style => div.style[style.prop] = style.value);
		return div;
	}

	private async whenAllRipplesHasFinishedAnimating (): Promise<void> {
		if (this.lastRipple == null) return;
		else await waitOperations.wait(100);
		return await this.whenAllRipplesHasFinishedAnimating();
	}

	private clearRipple (ripple: HTMLDivElement): void {
		if (this.shadowRoot == null) return;
		if (!this.shadowRoot.contains(ripple)) return;
		this.shadowRoot.removeChild(ripple);
		if (this.lastRipple === ripple) this.lastRipple = null;
	}

	private async createAndAddRipple (): Promise<HTMLDivElement|null> {
		const ripple = this.createRipple();
		if (ripple == null) return null;
		this.shadowRoot == null ? this.appendChild(ripple) : this.shadowRoot.appendChild(ripple);
		this.lastRipple = ripple;

		await waitOperations.wait(RippleComposite.ANIMATION_FRAME_DELAY);
		return ripple;
	}

	private async animateHighlightIn (): Promise<void> {
		await animationOperations.animate(this.element("highlight"), {opacity: [0, this.highlightAmount]}, {
			duration: this.highlightDuration * 1000,
			easing: this.rippleEasing,
			fill: "forwards"
		});
	}

	private async animateHighlightOut (): Promise<void> {
		let opacity: string|number|null = window.getComputedStyle(this.element("highlight")).opacity;
		if (opacity == null) opacity = this.highlightAmount;

		await animationOperations.animate(this.element("highlight"), {opacity: [opacity, 0]}, {
			duration: this.oneShotAnimationDuration * 1000,
			easing: this.rippleEasing,
			fill: "forwards"
		});
	}

	private async animateIn (): Promise<void> {

		await this.animateHighlightIn();

		if (!this.pointerDown) return;

		const ripple = await this.createAndAddRipple();
		if (ripple == null) return;

		await animationOperations.animate(ripple, {
			opacity: [this.rippleHighlightAmount, 0],
			transform: ["scale(0) translateZ(0)", "scale(1) translateZ(0)"]
		}, {duration: this.rippleDuration * 1000, easing: this.rippleEasing});
	}

	private async animateOut (): Promise<void> {

		// If there is no ripple to animate, just animate the highlight.
		if (this.lastRipple == null) return await this.animateHighlightOut();

		const style = window.getComputedStyle(this.lastRipple);
		const opacity = style.opacity == null ? this.rippleHighlightAmount : style.opacity;
		const transform = style.transform == null ? "scale(0) translateZ(0)" : style.transform;

		await Promise.all([
			animationOperations.animate(this.lastRipple, {
				opacity: [opacity, 0],
				transform: [transform, "scale(1) translateZ(0)"]
			}, {duration: this.oneShotAnimationDuration * 1000, easing: this.rippleEasing}),
			this.animateHighlightOut()
		]);

		this.clearRipple(this.lastRipple);
	}

	private prepareTarget (target: HTMLElement): void {
		target.style.overflow = target.style.overflow || "hidden";
	}

}