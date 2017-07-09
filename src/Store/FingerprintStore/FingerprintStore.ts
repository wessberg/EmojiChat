import {Store} from "../Store/Store";
import {IFingerprintStore} from "./Interface/IFingerprintStore";
import {syncdb} from "../../Service/Services";

export class FingerprintStore extends Store implements IFingerprintStore {
	private static readonly FINGERPRINT_STORE_NAME: string = "fingerprint";
	private static CACHED_FINGERPRINT: string|null = null;

	/**
	 * Gets a browser-unique fingerprint. We need it to be able to uniquely identify the client.
	 * @returns {Promise<string>}
	 */
	public async getFingerPrint (): Promise<string> {
		if (FingerprintStore.CACHED_FINGERPRINT != null) return FingerprintStore.CACHED_FINGERPRINT;

		// Make sure that the fingerprint store exists.
		await syncdb.addStore(FingerprintStore.FINGERPRINT_STORE_NAME, true);

		// Extract the existing fingerprint and cache it before returning it.
		let [existing] = await syncdb.getAll(FingerprintStore.FINGERPRINT_STORE_NAME);
		if (existing == null) existing = await syncdb.add(FingerprintStore.FINGERPRINT_STORE_NAME, {}, true);
		FingerprintStore.CACHED_FINGERPRINT = <string>existing.id;
		return FingerprintStore.CACHED_FINGERPRINT;
	}

}