import {Page} from "../Page/Page";
import {IGalleryPage} from "./Interface/IGalleryPage";
import {prop, selector, uses} from "../../Component/Component/Component";
import {BrowserResource} from "../../../Resource/BrowserResource";
import {GalleryItemComponent} from "../../Component/GalleryItemComponent/GalleryItemComponent";
import {Resource} from "../../../Resource/Resource";
import {childMutationObserver} from "../../Service/Services";
import {IImageComponent} from "../../Component/ImageComponent/Interface/IImageComponent";

@selector("gallery-page-element")
@uses([GalleryItemComponent])
export class GalleryPage extends Page implements IGalleryPage {
	public static routeName = new RegExp(`${BrowserResource.path.root}gallery`);
	@prop protected boundIntersectionObserver: IntersectionObserver|null;

	private get galleryItems (): Element[] {
		return Array.from(this.element("grid").children);
	}

	public static styles (): string {
		// language=CSS
		return super.styles() + `
        #grid {
            padding: var(--distance-minimum);
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
        }

        #grid > gallery-item-element {
            margin: calc(var(--distance-minimum) / 2);
        }
		`;
	}

	public static markup (): string {
		// language=HTML
		return `
        <section id="grid">
        </section>
		`;
	}

	public onChildBecameAdded (element: Element): void {
		this.observeChild(element);
	}

	public onChildBecameRemoved (element: Element): void {
		this.unobserveChild(element);
	}

	public observeChildMutations (): void {
		childMutationObserver.observe(this);
	}

	public unbindChildMutationObserver (): void {
		childMutationObserver.unobserve(this);
	}

	protected async connectedCallback (): Promise<void> {
		await super.connectedCallback();
		this.populateGrid();
		this.bindIntersectionObservers();
		this.findChildrenForIntersectionObserver().forEach(child => this.observeChild(child));
	}

	protected observeChild (child: Element): void {
		if (this.boundIntersectionObserver == null || window.IntersectionObserver == null) return;
		this.boundIntersectionObserver.observe(child);
	}

	protected unobserveChild (child: Element): void {
		if (this.boundIntersectionObserver == null || window.IntersectionObserver == null) return;
		this.boundIntersectionObserver.unobserve(child);
	}

	protected findChildrenForIntersectionObserver (): Element[] {
		return this.galleryItems.filter(child => window.getComputedStyle(child).getPropertyValue("visibility") !== "hidden");
	}

	protected disconnectedCallback (): void {
		super.disconnectedCallback();
		this.unbindIntersectionObservers();
	}

	private populateGrid (): void {
		// language=HTML
		const markup = `
        <image-element cover slot="image" src="${Resource.app.path.dist.asset.image.emoji.angry(1)}"></image-element>
        <small slot="date">Yesterday</small>
        <anchor-element href="/learn" slot="action">
            <button-element width="80">
                <p>Remove</p>
            </button-element>
        </anchor-element>
        <anchor-element href="/share" slot="action">
            <button-element width="80">
                <p>Share</p>
            </button-element>
         </anchor-element>
		`;
		const grid = this.element("grid");
		for (let i = 0; i < 10; i++) {
			const galleryItem = document.createElement("gallery-item-element");
			galleryItem.innerHTML = markup;
			grid.appendChild(galleryItem);
		}
	}

	private async handleVisibilityChange (target: Element, isInView: boolean): Promise<void> {

		if (target instanceof GalleryItemComponent) {
			const image = <IImageComponent> target.getElementsByTagName("image-element")[0];
			isInView ? await image.load() : await image.unload();

			// A small performance optimization is done here by hiding the invisible gallery items.
			target.style.visibility = isInView ? "visible" : "hidden";
		}
	}

	private handleIntersectionObserverEntries (entries: IntersectionObserverEntry[]): void {
		entries.forEach(async entry => await this.handleIntersectionObserverEntry(entry));
	}

	private async handleIntersectionObserverEntry (entry: IntersectionObserverEntry): Promise<void> {
		const {intersectionRatio, target} = entry;
		const isInView = intersectionRatio > 0;
		await this.handleVisibilityChange(target, isInView);
	}

	private unbindIntersectionObservers (): void {
		if (this.boundIntersectionObserver == null) return;
		if (window.IntersectionObserver == null) return;

		for (const child of this.galleryItems) this.unobserveChild(child);
		this.boundIntersectionObserver.disconnect();
		this.boundIntersectionObserver = null;
	}

	private bindIntersectionObservers (): void {

		if (this.boundIntersectionObserver != null) return;
		if (window.IntersectionObserver == null) return;

		this.boundIntersectionObserver = new IntersectionObserver(
			this.handleIntersectionObserverEntries.bind(this),
			{root: this, rootMargin: `0px`, threshold: [0, 0.1]}
		);
	}
}