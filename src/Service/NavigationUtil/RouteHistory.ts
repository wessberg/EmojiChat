import {IRouteHistory, IRouteHistoryListener, IState, uid} from "./Interface/IRouteHistory";
import {IRoute} from "./Interface/INavigationUtil";
import {GlobalObject} from "@wessberg/globalobject";

export class RouteHistory implements IRouteHistory {
	private static readonly POPSTATE_EVENT_NAME = "popstate";
	private uid: number = 0;
	private didRequestNavigation: boolean = false;
	private uidMap: Map<uid, IRoute> = new Map();

	constructor (private routeHistoryListener: IRouteHistoryListener) {
		this.listenForPopstate();
	}

	public async forward (): Promise<void> {
		history.forward();
		await this.routeHistoryListener.onNavigateTo(this.getRouteForUid(this.uid - 1));
	}

	public async back (): Promise<void> {
		history.back();
		await this.routeHistoryListener.onNavigateTo(this.getRouteForUid(this.uid - 2));
	}

	public async addState (route: IRoute): Promise<void> {
		this.uidMap.set(this.uid, route);
		history.pushState({uid: this.uid}, route.title, route.path);
		this.uid++;
		await this.forward();
	}

	private getRouteForUid (uid: uid = this.uid): IRoute {
		const route = this.uidMap.get(uid);
		if (route == null) throw new ReferenceError(`${this.constructor.name} could not get a route for uid: ${uid}`);
		return route;
	}

	private async onStateChanged ({uid}: IState): Promise<void> {
		this.uid = uid;

		await this.routeHistoryListener.onNavigateTo(this.getRouteForUid(uid));
	}

	private listenForPopstate (): void {
		GlobalObject.addEventListener(RouteHistory.POPSTATE_EVENT_NAME, async e => {
			if (this.didRequestNavigation) this.didRequestNavigation = false;
			else {
				await this.onStateChanged(e.state == null ? {uid: Math.max(0, this.uid - 1)} : e.state);
			}
		});
	}

}