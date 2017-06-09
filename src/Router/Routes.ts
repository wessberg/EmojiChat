import {IRoute} from "../Service/NavigationUtil/Interface/INavigationUtil";
import {Resource} from "../../Resource/Resource";
import {HomePage} from "../Page/HomePage/HomePage";

export const Routes: IRoute[] = [
	{
		path: Resource.browser.path.root(),
		title: Resource.app.meta.title,
		page: HomePage
	}
];