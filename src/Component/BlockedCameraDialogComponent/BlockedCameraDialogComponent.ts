import {DialogComponent} from "../DialogComponent/DialogComponent";
import {selector, uses} from "../Component/Component";
import {ButtonComponent} from "../ButtonComponent/ButtonComponent";
import {IBlockedCameraDialogComponent} from "./Interface/IBlockedCameraDialogComponent";

@selector("blocked-camera-dialog-element")
@uses([ButtonComponent])
export class BlockedCameraDialogComponent extends DialogComponent implements IBlockedCameraDialogComponent {

	public static styles (): string {
		// language=CSS
		return super.styles() + `
        #container {
            width: 300px;
        }

        button-element,
        ::slotted(button-element) {
            align-self: flex-end !important;
            margin-top: var(--distance-minimum);
        }
		`;
	}

	public static markup (): string {
		// language=HTML
		return `
        <div id="container">
            <h6>You have blocked the camera</h6>
            <p>In order to use EmojiChat, you have to give it permission to use your camera.</p>
            <button-element light no-background width="110" accent as-color>
                <p>Understood</p>
            </button-element>
        </div>
		`;
	}
}