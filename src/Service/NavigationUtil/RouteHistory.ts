import {IRouteHistory, IRouteHistoryListener, IState, uid} from "./Interface/IRouteHistory";
import {INavigationData, IRoute} from "./Interface/INavigationUtil";
import {GlobalObject} from "@wessberg/globalobject";

export class RouteHistory implements IRouteHistory {
	private static readonly POPSTATE_EVENT_NAME = "popstate";
	private uid: number = 0;
	private uidMap: Map<uid, IRoute> = new Map();
	private dataMap: Map<uid, INavigationData> = new Map();

	constructor (private routeHistoryListener: IRouteHistoryListener) {
		this.listenForPopstate();
	}

	public async forward (): Promise<void> {
		history.forward();
		await this.routeHistoryListener.onNavigateTo(this.getRouteForUid(this.uid), this.getDataForUid(this.uid));
	}

	public async back (): Promise<void> {
		history.back();
		await this.routeHistoryListener.onNavigateTo(this.getRouteForUid(this.uid - 1), this.getDataForUid(this.uid - 1));
	}

	public async addState (route: IRoute, data: INavigationData = {}): Promise<void> {
		this.uid++;
		this.uidMap.set(this.uid, route);
		this.dataMap.set(this.uid, data);
		history.pushState({uid: this.uid, ...data}, route.title, route.path);

		await this.forward();
	}

	private getRouteForUid (uid: uid = this.uid): IRoute {
		const route = this.uidMap.get(uid);
		if (route == null) throw new ReferenceError(`${this.constructor.name} could not get a route for uid: ${uid}`);
		return route;
	}

	private getDataForUid (uid: uid = this.uid): INavigationData|undefined {
		return this.dataMap.get(uid);
	}

	private async onStateChanged ({uid}: IState): Promise<void> {
		this.uid = uid;

		await this.routeHistoryListener.onNavigateTo(this.getRouteForUid(uid), this.getDataForUid(uid));
	}

	private listenForPopstate (): void {
		GlobalObject.addEventListener(RouteHistory.POPSTATE_EVENT_NAME, async e => {
			await this.onStateChanged(e.state == null ? {uid: Math.max(0, this.uid - 1)} : e.state);
		});
	}

}