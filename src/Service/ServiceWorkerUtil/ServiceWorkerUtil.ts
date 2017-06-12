import {IServiceWorkerUtil} from "./Interface/IServiceWorkerUtil";

export class ServiceWorkerUtil implements IServiceWorkerUtil {
	private static readonly SUPPORTS_SERVICE_WORKER: boolean = ("serviceWorker" in navigator);

	public async register (path: string): Promise<ServiceWorkerRegistration|null> {
		if (!ServiceWorkerUtil.SUPPORTS_SERVICE_WORKER) return null;
		return await navigator.serviceWorker.register(path);
	}
}