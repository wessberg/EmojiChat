import {IRoute} from "../Service/NavigationUtil/Interface/INavigationUtil";
import {Resource} from "../../Resource/Resource";
import {HomePage} from "../Page/HomePage/HomePage";
import {ImageComposerPage} from "../Page/ImageComposerPage/ImageComposerPage";
import {BrowserResource} from "../../Resource/BrowserResource";
import {GalleryPage} from "../Page/GalleryPage/GalleryPage";

export const Routes: IRoute[] = [
	{
		path: BrowserResource.path.root,
		title: Resource.app.meta.title,
		page: HomePage
	},
	{
		path: `${BrowserResource.path.root}compose`,
		title: "Compose",
		page: ImageComposerPage
	},
	{
		path: `${BrowserResource.path.root}gallery`,
		title: "Gallery",
		page: GalleryPage
	}
];