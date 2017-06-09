import {Page} from "../Page/Page";
import {IHomePage} from "./Interface/IHomePage";
import {selector} from "../../Component/Component/Component";
import {Resource} from "../../../Resource/Resource";

@selector("home-page-element")
export class HomePage extends Page implements IHomePage {
	public static routeName = new RegExp(Resource.browser.path.root());

	public static markup (): string {
		return `
		`;
	}

	public static styles () {
		return super.styles() + `

		`;
	}

}