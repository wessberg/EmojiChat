import {IRoute} from "./INavigationUtil";

export declare type uid = number;

export declare interface IState {
	uid: number;
}

export interface IRouteHistoryListener {
	onNavigateTo(route: IRoute): Promise<void>;
}

export interface IRouteHistory {
	forward (): Promise<void>;
	back (): Promise<void>;
	addState(route: IRoute): Promise<void>;
}