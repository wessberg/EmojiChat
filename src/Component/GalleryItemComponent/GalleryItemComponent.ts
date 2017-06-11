import {Component, selector, uses} from "../Component/Component";
import {IGalleryItemComponent} from "./Interface/IGalleryItemComponent";
import {CardComponent} from "../CardComponent/CardComponent";

@selector("gallery-item-element")
@uses([CardComponent])
export class GalleryItemComponent extends Component implements IGalleryItemComponent {

	public static styles (): string {
		// language=CSS
		return `
        :host, card-element {
            width: 320px;
        }

        card-element {
            padding: 0;
            width: inherit;
            max-width: inherit;
        }

        #imageSlot::slotted(*) {
            height: 230px;
        }

        ::slotted(*) {
            cursor: pointer !important;
        }

        #dateSlot::slotted(*) {
            color: var(--color-primary-text-light) !important;
            font-size: var(--font-size-body) !important;
            line-height: var(--line-height-body) !important;
            padding-left: var(--distance-minimum) !important;
        }

        #actionSlot::slotted(*) {
            padding-left: 10px;
        }

        #actions {
            padding: 0 10px 10px 0;
            display: flex;
            flex-direction: row;
            align-items: flex-end;
            justify-content: flex-end;
        }

        #dateContainer > icon-element {
            fill: var(--color-primary-text-light) !important;
        }

        #dateContainer {
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: center;
            width: 100%;
            margin: 0 auto -40px auto;
            padding: var(--distance-minimum);
            background: var(--color-black-38);
            transform: translate3d(0, -56px, 0);
        }
		`;
	}

	public static markup (): string {
		// language=HTML
		return `
        <card-element primary-action>
            <slot id="imageSlot" name="image"></slot>
            <section id="dateContainer">
                <icon-element icon="calendar-fill"></icon-element>
                <slot id="dateSlot" name="date"></slot>
            </section>
            <div id="actions">
                <slot id="actionSlot" name="action"></slot>
            </div>
        </card-element>
		`;
	}
}