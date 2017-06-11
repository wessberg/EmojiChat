import {INavigationData, IRoute} from "./INavigationUtil";

export declare type uid = number;

export declare interface IState {
	uid: number;
}

export interface IRouteHistoryListener {
	onNavigateTo(route: IRoute, data?: INavigationData): Promise<void>;
}

export interface IRouteHistory {
	forward (): Promise<void>;
	back (): Promise<void>;
	addState(route: IRoute, data?: INavigationData): Promise<void>;
}