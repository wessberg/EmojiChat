import {IPage} from "../../Page/Interface/IPage";
import {IActionable} from "../../../Discriminator/Actionable/Interface/IActionable";

export interface IImageComposerPage extends IPage, IActionable<string, boolean> {
	setSrc (src: string): void;
}