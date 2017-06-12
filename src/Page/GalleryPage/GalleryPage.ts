import {Page} from "../Page/Page";
import {IGalleryPage} from "./Interface/IGalleryPage";
import {prop, selector, uses} from "../../Component/Component/Component";
import {BrowserResource} from "../../../Resource/BrowserResource";
import {GalleryItemComponent} from "../../Component/GalleryItemComponent/GalleryItemComponent";
import {childMutationObserver, dateUtil, emojiStore, eventUtil} from "../../Service/Services";
import {IImageComponent} from "../../Component/ImageComponent/Interface/IImageComponent";
import {IEmoji} from "../../Model/Emoji/Interface/IEmoji";
import {IconComponent} from "../../Component/IconComponent/IconComponent";
import {IPropChangeRecord} from "../../Discriminator/PropObserverConsumer/IPropObserverConsumer";
import {EventName} from "../../EventName/EventName";
import {IGalleryItemComponent} from "../../Component/GalleryItemComponent/Interface/IGalleryItemComponent";
import {ZoomableImageComponent} from "../../Component/ZoomableImageComponent/ZoomableImageComponent";

@selector("gallery-page-element")
@uses([GalleryItemComponent, IconComponent, ZoomableImageComponent])
export class GalleryPage extends Page implements IGalleryPage {
	public static routeName = new RegExp(`${BrowserResource.path.root}gallery`);
	private static readonly HAS_CONTENT_ATTRIBUTE_NAME = "has-content";
	@prop protected boundIntersectionObserver: IntersectionObserver|null;
	@prop private gridSize: number = 0;
	private gridMap: Map<IEmoji, IGalleryItemComponent> = new Map();

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
						align-content: center;
						justify-content: center;
        }

        #grid > gallery-item-element {
            margin: calc(var(--distance-minimum) / 2);
						max-width: 100%;
        }

        #placeholderSection {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            margin: auto;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
        }

        #placeholderText {
            color: var(--color-hint-text-light);
            margin-top: var(--distance-minimum);
        }

        :host([has-content]) #placeholderSection {
            display: none;
        }
		`;
	}

	public static markup (): string {
		// language=HTML
		return `
        <section id="placeholderSection">
            <icon-element icon="sad-emoji" huge accent></icon-element>
            <h6 id="placeholderText">There are no emojis in your gallery yet</h6>
            <anchor-element href="/">
                <button-element primary>
                    <p>Let's get started</p>
                </button-element>
            </anchor-element>
        </section>
        <section id="grid">
        </section>
		`;
	}

	private static gridItemMarkup ({base64Src, date}: IEmoji): string {
		// language=HTML
		return `
        <zoomable-image-element cover slot="image" src="${base64Src}"></zoomable-image-element>
        <small slot="date">${dateUtil.toRelative(date)}</small>
        <button-element class="removeButton" width="80" slot="action">
                <p>Remove</p>
            </button-element>
		`;
	}

	public onChildBecameAdded (element: Element): void {
		this.observeChild(element);
	}

	public onChildBecameRemoved (element: Element): void {
		this.unobserveChild(element);
	}

	public observeChildMutations (): void {
		childMutationObserver.observe(this, this.element("grid"));
	}

	public unbindChildMutationObserver (): void {
		childMutationObserver.unobserve(this, this.element("grid"));
	}

	async onPropChanged ({prop, newValue, oldValue}: IPropChangeRecord): Promise<void> {
		await super.onPropChanged({prop, newValue, oldValue});

		switch (prop) {
			case "gridSize":
				this.toggleAttribute(GalleryPage.HAS_CONTENT_ATTRIBUTE_NAME, this.gridSize > 0);
		}
	}

	public async didBecomeVisible (): Promise<void> {
		await super.didBecomeVisible();
		await this.addToGrid(await emojiStore.getNewEmojis([...this.gridMap.keys()], {key: "date"}));
	}

	protected async connectedCallback (): Promise<void> {
		await super.connectedCallback();

		this.bindIntersectionObservers();
		this.observeChildMutations();
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
		this.unbindChildMutationObserver();
	}

	private constructGridItem (emoji: IEmoji): IGalleryItemComponent {
		const galleryItem = <IGalleryItemComponent> document.createElement("gallery-item-element");
		galleryItem.innerHTML = GalleryPage.gridItemMarkup(emoji);
		const removeButton = galleryItem.getElementsByClassName("removeButton")[0];
		if (removeButton != null) eventUtil.listen(this, EventName.CLICK, removeButton, () => this.onRemoveButtonClicked(emoji));
		return galleryItem;
	}

	private addToGrid (emojis: IEmoji[]): void {
		const grid = this.element("grid");

		emojis.forEach(emoji => {
			const galleryItem = this.constructGridItem(emoji);
			grid.insertBefore(galleryItem, grid.firstChild);
			this.gridMap.set(emoji, galleryItem);
		});
		this.gridSize = this.gridSize + emojis.length;
	}

	private removeFromGrid (emojis: IEmoji[]): void {
		emojis.forEach(emoji => {
			const element = this.gridMap.get(emoji);
			if (element == null) throw new ReferenceError(`${this.constructor.name} could not remove an emoji from the grid: No element was associated with it!`);
			if (element.parentNode != null) element.parentNode.removeChild(element);
			this.gridMap.delete(emoji);
		});
		this.gridSize = this.gridSize - emojis.length;
	}

	private async handleVisibilityChange (target: Element, isInView: boolean): Promise<void> {

		if (target instanceof GalleryItemComponent) {
			const image = <IImageComponent> target.getElementsByTagName("zoomable-image-element")[0];
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

	private onRemoveButtonClicked (emoji: IEmoji): void {
		emojiStore.deleteEmoji(emoji.id);
		this.removeFromGrid([emoji]);
	}
}