import {Component, prop, selector} from "../Component/Component";
import {IMediaComponent} from "./Interface/IMediaComponent";
import {IPropChangeRecord} from "../../Discriminator/PropObserverConsumer/IPropObserverConsumer";

@selector("media-element")
export class MediaComponent extends Component implements IMediaComponent {
	public role = "presentation";
	@prop public loading: boolean = false;
	@prop public loaded: boolean = false;
	protected placeholderMedia: string;

	static get observedAttributes (): string[] {
		return ["loading", "loaded", "src", "cover", "contained"];
	}

	public get src (): string|null {
		return this.getAttribute("src");
	}

	public get cover () {
		return this.hasAttribute("cover");
	}

	public get contained () {
		return this.hasAttribute("contained");
	}

	protected get hasMedia (): boolean {
		return this.hasAttribute("src");
	}

	protected get currentMedia (): MediaStream|string|null {
		return this.getAttribute("src");
	}

	async onPropChanged ({prop}: IPropChangeRecord): Promise<void> {
		switch (prop) {

			case "loading":
				this.toggleAttribute("loading", this.loading);
				break;

			case "loaded":
				this.toggleAttribute("loaded", this.loaded);
				break;
		}
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
		if (!this.hasMedia) throw new ReferenceError(`'load()' could not find any media to load!`);

		if (this.loaded || this.loading) return;

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
				else {
					this.loaded = false;
					this.loading = false;
					if (this.hasAttribute("autoload")) await this.load();
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
				if (this.loading && this.hasMedia) {
					return await this.loadMedia(<string>this.currentMedia);
				}
				break;

			case "loaded":
				if (!this.loaded) return await this.setInitialState();
				break;

		}
	}

	protected onUnloadMediaAction (): void {
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