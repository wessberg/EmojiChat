import {MediaComponent} from "../MediaComponent/MediaComponent";
import {IImageComponent} from "./Interface/IImageComponent";
import {selector} from "../Component/Component";

@selector("image-element")
export class ImageComponent extends MediaComponent implements IImageComponent {
	public role = "img";
	public placeholderMedia = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cGF0aCBmaWxsPSJyZ2JhKDAsMCwwLDAuMTIpIiBkPSJNOS43IDEyLjZsMS42IDIgMi4zLTMgMyA0SDcuM20xMC40LjZ2LTljMC0uOC0uNi0xLjQtMS4zLTEuNGgtOUM2LjYgNS44IDYgNi40IDYgN3Y5LjJjMCAuNy43IDEuMyAxLjQgMS4zaDljLjggMCAxLjQtLjYgMS40LTEuM3oiLz4KPC9zdmc+";

	static get observedAttributes (): string[] {
		return [...super.observedAttributes, "width", "height"];
	}

	public static markup (): string {
		return `
		<img id="placeholderImage"/>
		<img id="mainImage" />`;
	}

	public static styles (): string {
		// language=CSS
		return `

			:host {
				backface-visibility: hidden;
				transform: translate3d(0,0,0);
				box-sizing: border-box;
				height: 250px;
				position: relative;
				display: block;
				width: 100%;
				max-width: 100%;
				padding: 0;
				overflow: hidden;
				contain: strict;
				border: none;
			}
			
			img {
					cursor: inherit;
			}

			:host(:not([loaded])) #mainImage,
			:host([loaded]) #placeholderImage {
				opacity: 0;
				pointer-events: none;
			}

			#placeholderImage,
			#mainImage {
				position: absolute;
				top: 0;
				left: 0;
				right: 0;
				bottom: 0;
				user-select: none;
				backface-visibility: hidden;
				box-sizing: border-box;
				contain: strict;
				transition: opacity var(--duration-entering) ease;
				height: inherit;
				width: inherit;
				margin: 0 auto;
				opacity: 1;
				visibility: visible;
			}

			:host([contained]) #placeholderImage,
			:host([contained]) #mainImage {
				 object-fit: contain;
			}

			:host([cover]) #placeholderImage,
			:host([cover]) #mainImage {
			 	object-fit: cover;
			}
		`;
	}

	public async onPlaceholderTapped (): Promise<void> {
		if (this.loaded || this.loading) return;
		await this.load();
	}

	protected connectedCallback (): void {
		const placeholder = <HTMLImageElement> this.element("placeholderImage");
		placeholder.addEventListener("click", () => this.onPlaceholderTapped());
		placeholder.src = this.placeholderMedia;
	}

	protected async loadMedia (media: string): Promise<void> {
		const mainImage = <HTMLImageElement>this.element("mainImage");
		mainImage.src = media;

		mainImage.onload = () => {
			(<any>mainImage).onload = null;
			this.onLoadMediaSuccessAction();
		};
		mainImage.onerror = () => {
			(<any>mainImage).onload = null;
			this.onLoadMediaFailedAction();
		};

	}

	protected async setInitialState (): Promise<void> {
		this.element("mainImage").removeAttribute("src");
		this.loaded = false;
	}

	protected async attributeChangedCallback (attrName: string, _: string, newValue: string): Promise<void> {
		await super.attributeChangedCallback(attrName, _, newValue);

		switch (attrName) {

			case "width":
			case "height":
				const placeholder = this.element("placeholderImage");
				const mainImage = this.element("mainImage");
				if (newValue == null) {
					if (placeholder.hasAttribute(attrName)) placeholder.removeAttribute(attrName);
					if (mainImage.hasAttribute(attrName)) mainImage.removeAttribute(attrName);
				} else {
					placeholder.setAttribute(attrName, newValue);
					mainImage.setAttribute(attrName, newValue);
				}
				break;
		}
	}
}