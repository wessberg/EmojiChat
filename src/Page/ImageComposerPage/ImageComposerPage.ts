import {Page} from "../Page/Page";
import {IImageComposerPage} from "./Interface/IImageComposerPage";
import {prop, selector, uses} from "../../Component/Component/Component";
import {ImageComponent} from "../../Component/ImageComponent/ImageComponent";
import {animationOperations, emojiStore, eventUtil, navigationUtil, waitOperations} from "../../Service/Services";
import {BrowserResource} from "../../../Resource/BrowserResource";
import {INavigationData} from "../../Service/NavigationUtil/Interface/INavigationUtil";
import {IImageComponent} from "../../Component/ImageComponent/Interface/IImageComponent";
import {EventName} from "../../EventName/EventName";
import {SnackbarComponent} from "../../Component/SnackbarComponent/SnackbarComponent";
import {AnchorComponent} from "../../Component/AnchorComponent/AnchorComponent";
import {ISnackbarComponent} from "../../Component/SnackbarComponent/Interface/ISnackbarComponent";
import {ButtonComponent} from "../../Component/ButtonComponent/ButtonComponent";
import {IPropChangeRecord} from "../../Discriminator/PropObserverConsumer/IPropObserverConsumer";

@selector("image-composer-page-element")
@uses([ImageComponent, SnackbarComponent, AnchorComponent, ButtonComponent])
export class ImageComposerPage extends Page implements IImageComposerPage {
	public static routeName = new RegExp(`${BrowserResource.path.root}compose`);
	private static readonly SHUTTER_DURATION: number = 500;
	private static readonly SHUTTER_EASING: string = "linear";
	@prop private src: string|null = null;

	public static styles (): string {
		// language=CSS
		return super.styles() + `

        #toggles {
            display: flex;
            position: absolute;
            bottom: 0;
            left: 0;
            flex-direction: row;
            align-content: flex-start;
            justify-content: flex-start;
            margin: 0;
            z-index: 1;
        }

        #toggles > * {
            margin: 0 0 0 var(--distance-minimum);
        }

        #image, #shutterOverlay {
            position: absolute;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
        }

        #image {
            z-index: 0;
        }

        #shutterOverlay {
            z-index: 1;
            background: var(--color-white-100);
        }
		`;
	}

	public static markup (): string {
		// language=HTML
		return `
        <image-element id="image" contained autoload></image-element>
        <aside id="shutterOverlay"></aside>
        <aside id="toggles">
            <floating-button-element id="closeButton" warning>
                <icon-element id="closeIcon" icon="close"></icon-element>
            </floating-button-element>
            <a id="downloadAction">
                <floating-button-element id="downloadButton" primary>
                    <icon-element id="downloadIcon" icon="download-fill"></icon-element>
                </floating-button-element>
            </a>
        </aside>
        <snackbar-element id="savedInGallerySnackbar" floating right>
            <p slot="message">Your Emoji was saved</p>
            <anchor-element href="/gallery" slot="action">
                <button-element class="snackbarButton" accent no-background width="70">
                    <p>Open</p>
                </button-element>
            </anchor-element>
        </snackbar-element>
		`;
	}

	public async animateIn (): Promise<void> {
		await super.animateIn();

		const element = <HTMLDivElement>this.element("shutterOverlay");
		element.style.willChange = "opacity";
		await waitOperations.wait(0);
		await animationOperations.animate(element,
			{opacity: [1, 0]},
			{duration: ImageComposerPage.SHUTTER_DURATION, easing: ImageComposerPage.SHUTTER_EASING, fill: "forwards"}
		);
		element.style.willChange = null;
	}

	public async animateOut (): Promise<void> {
		await super.animateOut();
	}

	public async didBecomeVisible (data?: INavigationData): Promise<void> {
		await super.didBecomeVisible();
		if (data != null && typeof data.src === "string") {
			this.src = data.src;
		}
	}

	async onPropChanged ({prop, newValue, oldValue}: IPropChangeRecord): Promise<void> {
		await super.onPropChanged({prop, newValue, oldValue});
		switch (prop) {

			case "src":
				const image = <IImageComponent> this.element("image");
				const downloadAction = <HTMLAnchorElement> this.element("downloadAction");

				if (this.src == null) {
					image.removeAttribute("src");
					if (downloadAction.hasAttribute("href")) downloadAction.removeAttribute("href");
					if (downloadAction.hasAttribute("download")) downloadAction.removeAttribute("download");
				} else {
					image.setAttribute("src", this.src);
					downloadAction.href = this.src;
					downloadAction.download = this.src;
					await this.storeComposedImage();
				}
				break;

		}
	}

	protected async connectedCallback (): Promise<void> {
		await super.connectedCallback();
		eventUtil.listen(this, EventName.CLICK, this.element("closeButton"), this.onCloseButtonClicked);

	}

	private async storeComposedImage (): Promise<void> {
		if (this.src == null) throw new ReferenceError(`${this.constructor.name} could not store a composed image: There was no image src!`);

		emojiStore.createEmoji({
			base64Src: this.src,
			date: new Date()
		});
		await this.showSavedInGallerySnackbar();
	}

	private async showSavedInGallerySnackbar (): Promise<void> {
		// Give it a rest
		await waitOperations.waitForIdle();
		if (!this.visible) return;
		const snackbar = <ISnackbarComponent>this.element("savedInGallerySnackbar");
		await snackbar.open();
	}

	private async onCloseButtonClicked (): Promise<void> {
		await navigationUtil.back();
	}
}