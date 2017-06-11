import {INavigationData, INavigationUtil, IRoute} from "./Interface/INavigationUtil";
import {GlobalObject} from "@wessberg/globalobject";
import {eventUtil} from "../Services";
import {IFrame} from "../../Frame/Frame/Interface/IFrame";
import {IPage, IPageConstructor} from "../../Page/Page/Interface/IPage";
import {Config} from "@wessberg/environment";
import {IRouteHistory} from "./Interface/IRouteHistory";
import {RouteHistory} from "./RouteHistory";
import {EventName} from "../../EventName/EventName";

export class NavigationUtil implements INavigationUtil {
	private routes: Map<string, IRoute>;
	private routeToPageInstanceMap: Map<IPageConstructor, IPage> = new Map();
	private frame: IFrame;
	private currentPageInstance: IPage|null;
	private routeHistory: IRouteHistory = new RouteHistory(this);

	constructor (routes: IRoute[]) {
		this.setRoutes(routes);
		this.navigate(location.pathname).then();
	}

	public async onNavigateTo (route: IRoute, data?: INavigationData): Promise<void> {
		await this.attachRoute(route, data);
	}

	public async navigate (path: string, data?: INavigationData): Promise<void> {
		if (Config.DEBUG) console.log("navigation intent:", path);
		if (this.isCurrentRoute(path)) return;

		const route = this.getRoute(path);
		if (route == null) throw new ReferenceError(`${this.constructor.name} could not find a route for location: ${path}`);
		await this.routeHistory.addState(route, data);
	}

	public async back (): Promise<void> {
		await this.routeHistory.back();
	}

	private isCurrentRoute (path: string): boolean {
		if (this.currentPageInstance == null) return false;
		const ctor = <IPageConstructor>this.currentPageInstance.constructor;
		return ctor.testRoute(path);
	}

	private getRoute (path: string): IRoute|null {
		return this.routes.get(path) || this.matchPathWithRoutes(path);
	}

	private matchPathWithRoutes (path: string): IRoute|null {
		for (const entry of this.routes.entries()) {
			const [, route] = entry;
			if (route.page.testRoute(path)) {
				// Duplicate the path as an alias for O(1) lookups
				this.routes.set(path, route);
				return route;
			}
		}
		return null;
	}

	private async whenReady (): Promise<void> {
		if (this.frame != null) return;
		const {detail} = <CustomEvent> await eventUtil.waitFor(EventName.ATTACHED_FRAME, GlobalObject);
		this.frame = <IFrame>detail;
	}

	private async attachRoute (route: IRoute, data?: INavigationData): Promise<void> {

		await this.whenReady();
		if (this.isCurrentRoute(route.path)) return;
		const instance = this.getInstance(route);
		const old = this.currentPageInstance;
		this.currentPageInstance = instance;
		await Promise.all([
			instance.didBecomeVisible(data),
			old != null ? old.didBecomeInvisible() : Promise.resolve()
		]);
	}

	private getInstance (route: IRoute): IPage {
		if (route.page == null) throw new ReferenceError(`${this.constructor.name} could not find a page for route: ${route.path}`);

		let instance = this.routeToPageInstanceMap.get(route.page);
		if (instance == null) {
			instance = new route.page();
			this.frame.appendChild(instance);
			this.routeToPageInstanceMap.set(route.page, instance);
		}
		return instance;
	}

	private setRoutes (routes: IRoute[]): void {
		const mapped: [string, IRoute][] = <[string, IRoute][]> routes.map(route => [route.path, route]);
		this.routes = new Map(mapped);
	}

}