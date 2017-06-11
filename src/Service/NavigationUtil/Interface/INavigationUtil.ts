import {IPageConstructor} from "../../../Page/Page/Interface/IPage";
import {IRouteHistoryListener} from "./IRouteHistory";

export interface IRoute {
	path: string;
	page: IPageConstructor;
	title: string;
}

export interface INavigationData {
	[key: string]: any;
}

export interface IPushStatePayload {
	uid: number;
	data: INavigationData;
}

export interface INavigationUtil extends IRouteHistoryListener {
	navigate (path: string, data?: INavigationData): Promise<void>;
	back(): Promise<void>;
}