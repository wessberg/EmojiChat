import {Page} from "../Page/Page";
import {IGalleryPage} from "./Interface/IGalleryPage";
import {selector, uses} from "../../Component/Component/Component";
import {BrowserResource} from "../../../Resource/BrowserResource";

@selector("gallery-page-element")
@uses([])
export class GalleryPage extends Page implements IGalleryPage {
	public static routeName = new RegExp(`${BrowserResource.path.root}gallery`);

	public static styles (): string {
		// language=CSS
		return super.styles() + `

		`;
	}

	public static markup (): string {
		// language=HTML
		return `			

		`;
	}
}