import {ImageComponent} from "../ImageComponent/ImageComponent";
import {IZoomableImageComponent} from "./Interface/IZoomableImageComponent";
import {prop, selector, uses} from "../Component/Component";
import {ZoomableMediaComposite} from "../../Composite/ZoomableMediaComposite/ZoomableMediaComposite";
import {IPropChangeRecord} from "../../Discriminator/PropObserverConsumer/IPropObserverConsumer";
import {IZoomableMediaComposite} from "../../Composite/ZoomableMediaComposite/Interface/IZoomableMediaComposite";

@selector("zoomable-image-element")
@uses([ZoomableMediaComposite])
export class ZoomableImageComponent extends ImageComponent implements IZoomableImageComponent {
	@prop public zoomableElement: HTMLImageElement;
	public readonly tabindex: string = "0";

	public static markup (): string {
		return super.markup() + `
			<zoomable-media-composite id="zoomer"></zoomable-media-composite>
		`;
	}

	public static styles (): string {
		// language=CSS
		return super.styles() + `

        #placeholderImage,
        #mainImage,
        :host {
            cursor: pointer;
        }
		`;
	}

	public async onPropChanged ({prop, newValue, oldValue}: IPropChangeRecord): Promise<void> {
		await super.onPropChanged({prop, newValue, oldValue});

		switch (prop) {
			case "loaded":
				this.zoomableElement = this.loaded ? <HTMLImageElement>this.element("mainImage") : <HTMLImageElement>this.element("placeholderImage");
				// Force the zoomer composite component to re-bind event listeners.
				const zoomer = <IZoomableMediaComposite>this.element("zoomer");
				await zoomer.onPropChanged({prop: "target", newValue: this});
				break;
		}
	}

	public async toggleZoom (): Promise<void> {
		const zoomer = <IZoomableMediaComposite> this.element("zoomer");
		await zoomer.toggleZoom();
	}

	protected connectedCallback (): void {
		super.connectedCallback();
		this.zoomableElement = <HTMLImageElement>this.element("placeholderImage");
		const zoomer = <IZoomableMediaComposite>this.element("zoomer");
		zoomer.target = this;
	}
}