import {Page} from "../Page/Page";
import {IImageComposerPage} from "./Interface/IImageComposerPage";
import {selector, uses} from "../../Component/Component/Component";
import {ImageComponent} from "../../Component/ImageComponent/ImageComponent";
import {animationOperations, eventUtil, navigationUtil, waitOperations} from "../../Service/Services";
import {BrowserResource} from "../../../Resource/BrowserResource";
import {INavigationData} from "../../Service/NavigationUtil/Interface/INavigationUtil";
import {IImageComponent} from "../../Component/ImageComponent/Interface/IImageComponent";
import {EventName} from "../../EventName/EventName";
import {SnackbarComponent} from "../../Component/SnackbarComponent/SnackbarComponent";
import {AnchorComponent} from "../../Component/AnchorComponent/AnchorComponent";
import {ISnackbarComponent} from "../../Component/SnackbarComponent/Interface/ISnackbarComponent";
import {ButtonComponent} from "../../Component/ButtonComponent/ButtonComponent";

@selector("image-composer-page-element")
@uses([ImageComponent, SnackbarComponent, AnchorComponent, ButtonComponent])
export class ImageComposerPage extends Page implements IImageComposerPage {
	public static routeName = new RegExp(`${BrowserResource.path.root}compose`);
	private static readonly SHUTTER_DURATION: number = 500;
	private static readonly SHUTTER_EASING: string = "linear";

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
            <floating-button-element id="sendButton" green>
                <icon-element id="sendIcon" icon="send-fill"></icon-element>
            </floating-button-element>
				</aside>
			<snackbar-element id="savedInGallerySnackbar" floating right>
					<p slot="message">Your EmojiChat is saved</p>
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

	public setSrc (src: string): void {
		const image = <IImageComponent> this.element("image");
		const downloadAction = <HTMLAnchorElement> this.element("downloadAction");
		image.setAttribute("src", src);
		downloadAction.href = src;
		downloadAction.download = src;
		this.showSavedInGallerySnackbar().then();
	}

	private async showSavedInGallerySnackbar (): Promise<void> {
		// Give it a rest
		await waitOperations.waitForIdle();
		if (!this.visible) return;
		const snackbar = <ISnackbarComponent>this.element("savedInGallerySnackbar");
		await snackbar.open();
	}

	public async didBecomeVisible (data?: INavigationData): Promise<void> {
		await super.didBecomeVisible();
		if (data != null && typeof data.src === "string") {
			this.setSrc(data.src);
		}
	}

	protected async connectedCallback (): Promise<void> {
		await super.connectedCallback();

		eventUtil.listen(this, EventName.CLICK, this.element("closeButton"), this.onCloseButtonClicked);

	}

	private async onCloseButtonClicked (): Promise<void> {
		await navigationUtil.back();
	}
}