import {IWordpressUser} from "../../WordpressUser/Interface/IWordpressPost";

export interface IWordpressPost {
	name: string;
	title: string;
	content: string;
	date: string;
	author: IWordpressUser;
	image?: string;
	categories: string[];
}