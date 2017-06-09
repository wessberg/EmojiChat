import {Page} from "../Page/Page";
import {IHomePage} from "./Interface/IHomePage";
import {selector, uses} from "../../Component/Component/Component";
import {Resource} from "../../../Resource/Resource";
import {VideoFrameComponent} from "../../Component/VideoFrameComponent/VideoFrameComponent";

@selector("home-page-element")
@uses([VideoFrameComponent])
export class HomePage extends Page implements IHomePage {
	public static routeName = new RegExp(Resource.browser.path.root());

	public static markup (): string {
		// language=HTML
		return `
        <video-frame-element></video-frame-element>
		`;
	}

	public static styles () {
		return super.styles() + `

		`;
	}

}