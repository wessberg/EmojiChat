import {DialogComponent} from "../DialogComponent/DialogComponent";
import {IWelcomeGuideComponent} from "./Interface/IWelcomeGuideComponent";
import {selector, uses} from "../Component/Component";
import {IconComponent} from "../IconComponent/IconComponent";
import {ButtonComponent} from "../ButtonComponent/ButtonComponent";

@selector("welcome-guide-element")
@uses([IconComponent, ButtonComponent])
export class WelcomeGuideComponent extends DialogComponent implements IWelcomeGuideComponent {

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
            <icon-element icon="emoji-people"></icon-element>
            <h6>Welcome to EmojiChat!</h6>
            <p>
                It's simple. EmojiChat tracks your emotions and paints an emoji
                in top of your head. You can take all the pictures you want and
                send them to your friends! Oh, and it works offline.
            </p>
            <button-element light no-background width="70" accent as-color>
                <p>Okay</p>
            </button-element>
        </div>
		`;
	}
}