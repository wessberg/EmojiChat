import {Component, prop, selector, uses} from "../../Component/Component/Component";
import {IZoomableComposite} from "./Interface/IZoomableComposite";
import {IZoomable} from "../../Discriminator/Zoomable/Interface/IZoomable";
import {animationOperations, domUtil, eventUtil, waitOperations} from "../../Service/Services";
import {EventName} from "../../EventName/EventName";
import {RippleComposite} from "../RippleComposite/RippleComposite";
import {FocusableComposite} from "../FocusableComposite/FocusableComposite";
import {FloatingButtonComponent} from "../../Component/FloatingButtonComponent/FloatingButtonComponent";
import {IPropChangeRecord} from "../../Discriminator/PropObserverConsumer/IPropObserverConsumer";
import {IFocusableComposite} from "../FocusableComposite/Interface/IFocusableComposite";

@selector("zoomable-composite")
@uses([RippleComposite, FocusableComposite, FloatingButtonComponent])
export class ZoomableComposite extends Component implements IZoomableComposite {
	protected static readonly DURATION: number = 225;
	protected static readonly EASING: string = "cubic-bezier(0.4, 0.0, 0.2, 1)";
	protected static readonly ACCELERATION_EASING: string = "cubic-bezier(0.4, 0.0, 1, 1)";
	public role = "presentation";
	@prop public zoomed: boolean = false;
	@prop public zooming: boolean = false;
	@prop public disabled: boolean = false;
	@prop public target: IZoomable;

	private transformValues: { scale: number, x: number, y: number };

	constructor () {
		super();

		eventUtil.listen(this, EventName.RESIZE, window, this.onGlobalResize);
	}

	private get innerDimensions (): ClientRect {
		return this.target == null ? this.getBoundingClientRect() : this.target.zoomableElement.getBoundingClientRect();
	}

	private get containingRadius (): string|null {
		if (this.target == null) return null;
		const computed = window.getComputedStyle(this.target);
		return computed.getPropertyValue("border-radius");
	}

	private get maxScale (): number {
		const {width, height} = this.innerDimensions;
		const widthScaleFactor = window.innerWidth / width;
		const heightScaleFactor = window.innerHeight / height;
		return Math.max(1, Math.min(widthScaleFactor, heightScaleFactor));
	}

	public static markup (): string {
		return `
			<ripple-composite class="ripple" light></ripple-composite>
			<focusable-composite id="focusable"></focusable-composite>
			<floating-button-element shadow="5" primary id="closeAction">
				<icon-element icon="close"></icon-element>
			</floating-button-element>
			
		`;
	}

	public listenForTarget (target: IZoomable): void {
		eventUtil.listen(this, EventName.CLICK, target.zoomableElement, this.onZoomablePressed, false);
	}

	public unlistenFromTarget (target: IZoomable): void {
		eventUtil.unlisten(this, EventName.CLICK, target.zoomableElement, this.onZoomablePressed);
	}

	public async onPropChanged ({prop, newValue, oldValue}: IPropChangeRecord): Promise<void> {
		await super.onPropChanged({prop, newValue, oldValue});
		switch (prop) {

			case "target":
				if (this.target) {
					const focusable = <IFocusableComposite> this.element("focusable");
					focusable.target = this.target;
					focusable.actionTarget = this.target.zoomableElement;

					return this.listenForTarget(<IZoomable>newValue);
				}
				else if (oldValue) return this.unlistenFromTarget(<IZoomable>oldValue);
				break;
			case "zoomed":
				this.toggleAttribute("zoomed", this.zoomed);
				if (this.target == null) break;
				if (this.zoomed) this.target.focus();
				else this.target.blur();
				break;

			case "zooming":
				this.toggleAttribute("zooming", this.zooming);
				if (this.target == null) break;
				if (this.zooming) {
					if (this.zoomed) {
						await this.zoomOut();
					}
					else {
						await this.zoomIn();
					}
					this.zoomed ? this.onZoomOutSuccessfulAction() : this.onZoomInSuccessfulAction();
				}
				break;
		}
	}

	public async toggleZoom (e?: MouseEvent): Promise<void> {
		if (this.zooming || this.target == null || this.disabled) return;

		if (e != null) {
			e.preventDefault();
			e.cancelBubble = true;
		}

		this.zoomed ? this.onZoomOutAction() : this.onZoomInAction();
	}

	protected async onZoomablePressed (e: MouseEvent): Promise<void> {
		await this.toggleZoom(e);
	}

	protected setZoomedStyles (innerDimensions: ClientRect): void {
		if (this.target == null) return;
		const {width, height, top, left} = innerDimensions;
		const style = this.target.zoomableElement.style;

		style.contain = "strict";
		style.cursor = "-webkit-zoom-out";
		style.backfaceVisibility = "hidden";
		style.position = "absolute";
		style.top = `${top}px`;
		style.left = `${left}px`;
		style.width = `${width}px`;
		style.right = "auto";
		style.bottom = "auto";
		style.height = `${height}px`;
		style.pointerEvents = "auto";
		style.zIndex = "1000";
		style.willChange = "transform";
		style.userSelect = "none";
		style.transformOrigin = "left top";
		this.setZoomedStylesOnCloseAction();
	}

	protected setZoomedStylesOnCloseAction (): void {
		this.element("closeAction").style.display = "flex";
	}

	protected setInlineStylesOnCloseAction (): void {
		const closeAction = this.element("closeAction");
		closeAction.style.display = "none";
		closeAction.style.opacity = "0";
		closeAction.style.zIndex = "1000";
		closeAction.style.position = "fixed";
		closeAction.style.bottom = "30px";
		closeAction.style.left = closeAction.style.right = "0";
		closeAction.style.margin = "0 auto";
		closeAction.style.textAlign = "center";
	}

	protected clearZoomedStylesOnCloseAction (): void {
		this.element("closeAction").style.display = "none";
	}

	protected connectedCallback (): void {
		super.connectedCallback();
		eventUtil.listen(this, EventName.CLICK, this.element("closeAction"), this.toggleZoom, false);
		this.setInlineStylesOnCloseAction();
	}

	protected clearZoomedStyles (): void {
		if (this.target == null) return;
		const style = this.target.zoomableElement.style;
		style.contain = style.willChange = style.cursor = style.backfaceVisibility = style.webkitBackfaceVisibility =
			style.position = style.top = style.left = style.width = style.height = style.pointerEvents = style.zIndex =
				style.transformOrigin = style.webkitTransformOrigin = style.userSelect = style.webkitUserSelect =
					style.msUserSelect = null;

		this.clearZoomedStylesOnCloseAction();
	}

	protected beginPreZoomInAnimations (): Promise<Animation>[] {
		if (this.target == null) return [];
		const animations: Promise<Animation>[] = [];

		// Check if the image parent has a radius.
		const radius = this.hasRadius();
		if (radius != null) {
			animations.push(
				animationOperations.animate(this.target.zoomableElement, {borderRadius: [radius, 0]}, {
					duration: ZoomableComposite.DURATION,
					easing: ZoomableComposite.EASING
				})
			);
		}
		return animations;
	}

	protected beginPostZoomInAnimations (): Promise<Animation>[] {
		return [];
	}

	protected beginZoomInAnimations (): Promise<Animation>[] {
		if (this.target == null) return [];
		const {scale, x, y} = this.transformValues = this.getMissingTransform();
		return [
			animationOperations.animate(this.target.zoomableElement, {
				transform: ["none", `scale(${scale}) translate3d(${x}px, ${y}px, 0)`]
			}, {
				duration: ZoomableComposite.DURATION,
				easing: ZoomableComposite.EASING,
				fill: "forwards"
			}),
			animationOperations.animate(this.element("closeAction"), {
				opacity: [0, 1],
				transform: ["translate3d(0, 100px, 0)", "translate3d(0, 0, 0)"]
			}, {
				duration: ZoomableComposite.DURATION,
				easing: ZoomableComposite.EASING,
				delay: ZoomableComposite.DURATION,
				fill: "forwards"
			})
		];

	}

	protected beginZoomOutAnimations (): Promise<Animation>[] {
		if (this.target == null) return [];

		return [

			animationOperations.animate(this.target.zoomableElement, {
				transform: [`scale(${this.transformValues.scale}) translate3d(${this.transformValues.x}px, ${this.transformValues.y}px, 0)`, `none`]
			}, {
				duration: ZoomableComposite.DURATION,
				easing: ZoomableComposite.EASING,
				fill: "forwards"
			}),
			animationOperations.animate(this.element("closeAction"), {
				opacity: [1, 0],
				transform: ["translate3d(0, 0, 0)", "translate3d(0, 100px, 0)"]
			}, {
				duration: ZoomableComposite.DURATION,
				fill: "forwards",
				easing: ZoomableComposite.ACCELERATION_EASING
			})
		];
	}

	protected beginPostZoomOutAnimations (): Promise<Animation>[] {
		if (this.target == null) return [];
		const animations: Promise<Animation>[] = [];

		// Check if the image parent has a radius.
		const radius = this.hasRadius();

		// Animate the radius (if necessary).
		if (radius != null) {
			animations.push(
				animationOperations.animate(this.target.zoomableElement, {borderRadius: [0, radius]}, {
					duration: ZoomableComposite.DURATION,
					easing: ZoomableComposite.EASING
				})
			);
		}
		return animations;
	}

	protected async zoomIn (): Promise<void> {

		if (this.parentNode == null) throw new ReferenceError(`a ZoomableComposite component must be added to the DOM before you can zoom!`);
		if (this.target == null) return;
		this.setZoomedStyles(this.innerDimensions);
		this.breakOut();
		await waitOperations.wait(100);

		await Promise.all(this.beginPreZoomInAnimations());
		await Promise.all(this.beginZoomInAnimations());
		await Promise.all(this.beginPostZoomInAnimations());
	}

	protected async zoomOut (): Promise<void> {
		if (this.parentNode == null) throw new ReferenceError(`a ZoomableComposite component must be added to the DOM before you can zoom!`);
		if (this.target == null) return;

		await Promise.all(this.beginZoomOutAnimations());
		await Promise.all(this.beginPostZoomOutAnimations());
		this.breakIn();
		this.clearZoomedStyles();
	}

	protected breakIn (): void {
		if (this.target == null) return;
		domUtil.breakIn(this.target.zoomableElement);
		domUtil.breakIn(this.element("closeAction"));
	}

	protected breakOut (): void {
		if (this.target == null) return;
		domUtil.breakOut(this.target, this.target.zoomableElement);
		domUtil.breakOut(this, this.element("closeAction"));
	}

	private onZoomInAction (): void {
		if (this.target == null) return;
		this.zoomed = false;
		this.zooming = true;
		eventUtil.fire(EventName.ZOOM_IN_STARTED, window);
	}

	private onZoomOutAction (): void {
		if (this.target == null) return;
		this.zooming = true;
		eventUtil.fire(EventName.ZOOM_OUT_STARTED, window);
	}

	private onZoomInSuccessfulAction (): void {
		if (this.target == null) return;
		this.zoomed = true;
		this.zooming = false;
		eventUtil.fire(EventName.ZOOM_IN_ENDED, window);
	}

	private onZoomOutSuccessfulAction (): void {
		if (this.target == null) return;
		this.zoomed = false;
		this.zooming = false;
		eventUtil.fire(EventName.ZOOM_OUT_ENDED, window);
	}

	private async onGlobalResize (): Promise<void> {
		if (!this.zoomed) return;
		await this.toggleZoom();
	}

	private getMissingTransform (): { scale: number, x: number, y: number } {
		const scale = this.maxScale;
		const x = this.getMissingXTransform(scale);
		const y = this.getMissingYTransform(scale);
		return {scale, x, y};
	}

	private hasRadius (): string|null {
		const radius = this.containingRadius;
		return (radius != null && parseInt(radius) > 0) ? radius : null;
	}

	private getMissingYTransform (scale: number = 1): number {
		const {height, top} = this.innerDimensions;
		const newHeight = height * scale;
		const newBottom = window.innerHeight - newHeight - top;
		const diff = newBottom - top;
		return (diff / 2) / scale;
	}

	private getMissingXTransform (scale: number = 1): number {
		const {left, width} = this.innerDimensions;
		const newWidth = width * scale;
		const newRight = window.innerWidth - newWidth - left;
		const diff = newRight - left;
		return (diff / 2) / scale;
	}
}