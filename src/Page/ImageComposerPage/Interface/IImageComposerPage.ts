import {IPage} from "../../Page/Interface/IPage";

export interface IImageComposerPage extends IPage {
	setSrc (src: string): void;
}