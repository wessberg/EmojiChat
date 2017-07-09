import {DialogComponent} from "../DialogComponent/DialogComponent";
import {IGalleryGuideComponent} from "./Interface/IGalleryGuideComponent";
import {selector, uses} from "../Component/Component";
import {IconComponent} from "../IconComponent/IconComponent";
import {ButtonComponent} from "../ButtonComponent/ButtonComponent";

@selector("gallery-guide-element")
@uses([IconComponent, ButtonComponent])
export class GalleryGuideComponent extends DialogComponent implements IGalleryGuideComponent {

	public static styles (): string {
		// language=CSS
		return super.styles() + `
        #container {
            width: 300px;
        }

        p {
            text-align: justify;
        }

        #container > h6 {
            text-align: center;
        }

        #container > icon-element {
            align-self: center;
        }

        icon-element {
            display: none;
        }

        button-element,
        ::slotted(button-element) {
            align-self: flex-end !important;
            margin-top: var(--distance-minimum);
        }

        @media screen and (min-height: 366px) {
            icon-element {
                display: block;
            }
        }

        @media screen and (min-height: 392px) {
            icon-element {
                width: 80px;
                height: 80px;
            }
        }

        @media screen and (min-height: 435px) {
            icon-element {
                width: 120px;
                height: 120px;
            }
        }

        @media screen and (min-height: 493px) {
            icon-element {
                width: 180px;
                height: 180px;
            }
        }

		`;
	}

	public static markup (): string {
		// language=HTML
		return `
        <div id="container">
            <h6>This is the shared gallery!</h6>
            <p>
                This is the central hub for everyone's Emojis! When you snap an EmojiChat, it
                will be placed here. You can only remove your own Emojis. New Emojis will be added
                to the gallery in real-time, whether they are yours or someone else's.
            </p>
            <button-element light no-background width="70" accent as-color>
                <p>Alright</p>
            </button-element>
        </div>
		`;
	}
}