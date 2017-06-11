import {ZoomableComposite} from "../ZoomableComposite/ZoomableComposite";
import {IZoomableMediaComposite} from "./Interface/IZoomableMediaComposite";
import {prop, selector, uses} from "../../Component/Component/Component";
import {IMediaComponent} from "../../Component/MediaComponent/Interface/IMediaComponent";
import {IZoomable} from "../../Discriminator/Zoomable/Interface/IZoomable";
import {IPropChangeRecord} from "../../Discriminator/PropObserverConsumer/IPropObserverConsumer";
import {animationOperations, domUtil} from "../../Service/Services";
import {KeyboardButtonKind} from "../../Service/KeyboardOperations/KeyboardButtonKind";
import {AnchorComponent} from "../../Component/AnchorComponent/AnchorComponent";
import {ButtonComponent} from "../../Component/ButtonComponent/ButtonComponent";
import {IconComponent} from "../../Component/IconComponent/IconComponent";

@selector("zoomable-media-composite")
@uses([AnchorComponent, ButtonComponent, IconComponent])
export class ZoomableMediaComposite extends ZoomableComposite implements IZoomableMediaComposite {
	@prop public target: (IMediaComponent&IZoomable);
	@prop public downloadSrc: string|null;

	public static markup (): string {
		// language=HTML
		return super.markup() + `
        <a id="downloadAction">
            <floating-button-element id="downloadButton" primary shadow="5">
                <icon-element id="downloadIcon" icon="download-fill"></icon-element>
            </floating-button-element>
        </a>
		`;
	}

	public async toggleZoom (e?: MouseEvent): Promise<void> {
		if (this.zooming || this.target == null || this.target.src == null || this.disabled) return;
		await super.toggleZoom(e);
	}

	public async onPropChanged ({prop, newValue, oldValue}: IPropChangeRecord): Promise<void> {
		await super.onPropChanged({prop, newValue, oldValue});
		switch (prop) {

			case "target":
				const downloadAction = <HTMLAnchorElement>this.element("downloadAction");
				if (this.target == null) {
					this.downloadSrc = null;
					if (downloadAction.hasAttribute("href")) downloadAction.removeAttribute("href");
					if (downloadAction.hasAttribute("download")) downloadAction.removeAttribute("download");
				} else {
					this.downloadSrc = this.target.src;
					downloadAction.href = <string> this.downloadSrc;
					downloadAction.download = <string> this.downloadSrc;
				}
				break;
		}
	}

	protected beginPreZoomInAnimations (): Promise<Animation>[] {
		return super.beginPreZoomInAnimations();
	}

	protected beginPostZoomInAnimations (): Promise<Animation>[] {
		return super.beginPostZoomInAnimations();
	}

	protected beginZoomInAnimations (): Promise<Animation>[] {
		if (this.target == null) return [];
		return [
			...super.beginZoomInAnimations(),
			animationOperations.animate(this.element("downloadAction"), {
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
			...super.beginZoomOutAnimations(),
			animationOperations.animate(this.element("downloadAction"), {
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
		return super.beginPostZoomOutAnimations();
	}

	protected async zoomIn (): Promise<void> {
		await super.zoomIn();
	}

	protected async zoomOut (): Promise<void> {
		await super.zoomOut();
	}

	/** @override */
	protected async onKeyboardButtonPressed (e: KeyboardEvent): Promise<void> {
		if (this.target == null) return;
		switch (e.keyCode) {
			case KeyboardButtonKind.ENTER:
			case KeyboardButtonKind.ESCAPE:
			case KeyboardButtonKind.BACKSPACE:
			case KeyboardButtonKind.SPACEBAR:
				if (!this.zoomed && this.target.loaded) return await this.toggleZoom();
				break;
		}
	}

	protected async onZoomablePressed (e: MouseEvent): Promise<void> {
		if (this.target == null) return;
		if (!this.target.loaded) return;
		await super.onZoomablePressed(e);
	}

	protected breakIn (): void {
		super.breakIn();
		domUtil.breakIn(this.element("downloadAction"));
	}

	protected breakOut (): void {
		if (this.target == null) return;
		super.breakOut();
		domUtil.breakOut(this, this.element("downloadAction"));
	}

	protected setZoomedStyles (innerDimensions: ClientRect): void {
		if (this.target == null) return;
		super.setZoomedStyles(innerDimensions);
		const style = this.target.zoomableElement.style;
		style.objectFit = this.target.cover ? "cover" : this.target.contained ? "contained" : null;
		this.setZoomedStylesOnDownloadAction();
	}

	protected setZoomedStylesOnDownloadAction (): void {
		this.element("downloadAction").style.display = "flex";
	}

	protected setInlineStylesOnDownloadAction (): void {
		const downloadAction = this.element("downloadAction");
		downloadAction.style.display = "none";
		downloadAction.style.opacity = "0";
		downloadAction.style.zIndex = "1000";
		downloadAction.style.position = "fixed";
		downloadAction.style.bottom = "30px";
		downloadAction.style.width = downloadAction.style.height = "56px";
		downloadAction.style.right = "0";
		downloadAction.style.left = "80px";
		downloadAction.style.margin = "0 auto";
		downloadAction.style.textAlign = "center";
	}

	protected setInlineStylesOnCloseAction (): void {
		super.setInlineStylesOnCloseAction();
		const closeAction = this.element("closeAction");
		closeAction.style.left = "-80px";
	}

	protected clearZoomedStyles (): void {
		if (this.target == null) return;
		super.clearZoomedStyles();
		const style = this.target.zoomableElement.style;
		style.objectFit = null;
		this.clearZoomedStylesOnDownloadAction();
	}

	protected clearZoomedStylesOnDownloadAction (): void {
		this.element("downloadAction").style.display = "none";
	}

	protected connectedCallback (): void {
		super.connectedCallback();
		this.setInlineStylesOnDownloadAction();
	}

}