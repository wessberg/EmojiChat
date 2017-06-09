import {Component, selector} from "../Component/Component";
import {IMediaComponent} from "./Interface/IMediaComponent";

@selector("media-element")
export class MediaComponent extends Component implements IMediaComponent {
	public role = "presentation";
	protected placeholderMedia: string;

	static get observedAttributes (): string[] {
		return ["loading", "loaded", "src", "cover", "contained"];
	}

	public _loading: boolean = false;

	protected get loading (): boolean {
		return this._loading;
	}

	protected set loading (loading: boolean) {
		this._loading = loading;
		if (loading) this.setAttribute("loading", "");
		else if (this.hasAttribute("loading")) this.removeAttribute("loading");
	}

	public _loaded: boolean = false;

	protected get loaded (): boolean {
		return this._loaded;
	}

	protected set loaded (loaded: boolean) {
		this._loaded = loaded;
		if (loaded) this.setAttribute("loaded", "");
		else if (this.hasAttribute("loaded")) this.removeAttribute("loaded");
	}

	public async unload (): Promise<void> {
		if (!this.hasAttribute("src")) return;
		else {
			if (!this.loaded) return;
			// Dispatch an action to inform the outside world that this is happening.
			this.onUnloadMediaAction();
		}
	}

	public async load (): Promise<void> {
		if (!this.hasAttribute("src")) throw new ReferenceError(`'load()' could not find any media to load!`);

		if (this.loaded) throw new TypeError(`'load()' was called, but the media is already loaded!`);
		if (this.loading) return;

		// Dispatch an action to inform the outside world that this is happening.
		this.onLoadMediaAction();
	}

	protected async onPlaceholderTapped (_: MouseEvent): Promise<void> {
	}

	protected async setInitialState (): Promise<void> {
	}

	protected async loadMedia (_: string): Promise<void> {
	}

	protected async attributeChangedCallback (attrName: string, _: string, newValue: string): Promise<void> {
		switch (attrName) {

			case "src":
				if (newValue == null) return await this.unload();
				else if (this.hasAttribute("autoload")) {
					await this.load();
				}
				break;

			case "cover":
				if (this.hasAttribute("cover")) {
					if (this.hasAttribute("contained")) this.removeAttribute("contained");
				}
				break;

			case "contained":
				if (this.hasAttribute("contained")) {
					if (this.hasAttribute("cover")) this.removeAttribute("cover");
				}
				break;

			case "loading":
				if (this.loading && this.hasAttribute("src")) {
					return await this.loadMedia(<string>this.getAttribute("src"));
				}
				break;

			case "loaded":
				if (!this.loaded) return await this.setInitialState();
				break;

		}
	}

	protected onUnloadMediaAction (): void {
		if (this.hasAttribute("src")) this.removeAttribute("src");
		this.loaded = false;
		this.loading = false;
	}

	protected onLoadMediaAction (): void {
		this.loading = true;
		this.loaded = false;
	}

	protected onLoadMediaFailedAction (): void {
		this.onUnloadMediaAction();
		throw new TypeError(`'load()' failed while attempting to load an image with src: '${this.getAttribute("src")}'`);
	}

	protected onLoadMediaSuccessAction (): void {
		this.loaded = true;
		this.loading = false;
	}
}