import {IPageConstructor} from "../../../Page/Page/Interface/IPage";
import {IRouteHistoryListener} from "./IRouteHistory";

export interface IRoute {
	path: string;
	page: IPageConstructor;
	title: string;
}

export interface IPushStatePayload {
	uid: number;
}

export interface INavigationUtil extends IRouteHistoryListener {
	navigate (path: string): Promise<void>;
}