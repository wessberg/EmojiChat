import {CollectionKind, IStorageEntry, IStorageUtil, NativeType} from "./Interface/IStorageUtil";

export class StorageUtil implements IStorageUtil {
	private static readonly LOCAL_STORAGE_MAX_UID_KEY = "__MAX__UID__";
	private static readonly DATE_PREFIX = "_____DATE_____";

	public hasCollection (collection: CollectionKind): boolean {
		return this.getFromStorage(collection) != null;
	}

	public addCollection (collection: CollectionKind): boolean {
		if (this.hasCollection(collection)) return false;
		this.setInStorage(collection, []);
		return true;
	}

	public getAll<T extends {}> (collection: CollectionKind): IStorageEntry<T>[] {
		// Make sure that the collection exists.
		this.addCollection(collection);

		return <IStorageEntry<T>[]> this.getFromStorage(collection) || [];
	}

	public get<T extends {}> (id: number, collection: CollectionKind): IStorageEntry<T>|null {
		// Make sure that the collection exists.
		this.addCollection(collection);

		const all = this.getAll<T>(collection);
		return all.find(item => item.id === id) || null;
	}

	public add<T extends {}> (entry: T, collection: CollectionKind): IStorageEntry<T> {
		// Make sure that the collection exists.
		this.addCollection(collection);

		const id = this.getMaxUid() + 1;
		const normalizedEntry = <IStorageEntry<T>>{...(<{}>entry), ...{id}};
		const all: IStorageEntry<T>[] = this.getAll<T>(collection) || [];
		all.push(normalizedEntry);

		this.setInStorage(collection, all);
		this.setMaxUid(id);
		return normalizedEntry;
	}

	public update<T extends {}> (id: number, entry: T, collection: CollectionKind): boolean {
		// If the collection doesn't exist, throw an exception.
		if (!this.hasCollection(collection)) throw new ReferenceError(`${this.constructor.name} could not update an item for collection: ${collection}: It didn't exist!`);

		// Make sure that the entry has an ID.
		const normalizedEntry = <IStorageEntry<T>>{...(<{}>entry), ...{id}};
		const all: IStorageEntry<T>[] = this.getAll<T>(collection);
		if (all == null) throw new ReferenceError(`${this.constructor.name} could not update an item for collection: ${collection}: No entries exist within it!`);

		const filtered = all.filter(item => item.id !== id);

		// No entry had the given ID.
		if (filtered.length === all.length) return false;

		filtered.push(normalizedEntry);

		this.setInStorage(collection, filtered);
		return true;
	}

	public remove (id: number, collection: CollectionKind): boolean {
		// If the collection doesn't exist, throw an exception.
		if (!this.hasCollection(collection)) throw new ReferenceError(`${this.constructor.name} could not remove items for collection: ${collection}: It didn't exist!`);

		const entry = this.getAll(collection);
		if (entry == null) return false;
		const filtered = entry.filter(item => item.id !== id);

		// If nothing was matched, return false.
		if (filtered.length === entry.length) return false;

		this.setInStorage(collection, filtered);
		return true;
	}

	private getFromStorage (item: string|number): NativeType|null {
		const entry = localStorage.getItem(typeof item === "string" ? item : `${item}`);
		const native = this.toNative(entry);
		if (native == null) return null;
		return native;
	}

	private setInStorage (key: string|number, value: NativeType): void {
		localStorage.setItem(typeof key === "string" ? key : `${key}`, this.toJSON(value));
	}

	private setMaxUid (maxUid: number): number {
		this.setInStorage(StorageUtil.LOCAL_STORAGE_MAX_UID_KEY, maxUid);
		return maxUid;
	}

	private getMaxUid (): number {
		const entry = <number|null> this.getFromStorage(StorageUtil.LOCAL_STORAGE_MAX_UID_KEY);
		if (entry != null) return entry;

		// Otherwise, create a new one.
		return this.setMaxUid(0);
	}

	private toNative (item: string|null|undefined): NativeType {
		if (item === "undefined" || item === undefined) return undefined;
		if (item === "null" || item === null) return null;

		// It might be a boolean.
		if (item === "true") return true;
		if (item === "false") return false;
		if (item === "NaN") return NaN;
		if (item === "Infinity") return Infinity;
		if (typeof item === "string" && this.isStringifiedDate(item)) return this.nativefyDate(item);

		// It might be a Symbol.
		if (/Symbol\(([^)]*)\)/.test(item)) {
			const content = item.match(/Symbol\(([^)]*)\)/);
			if (content != null) return Symbol(content[1]);
		}

		// It might be a number.
		const toNum = Number.parseFloat(item);
		if (!isNaN(toNum)) {
			// If it parses as a float but is in fact a string (such as "0, 0, 0"), return the string.
			if (/^\d+[.]*[^\d.]+/.test(item.trim()))
				return item;
			return toNum;
		}

		// It might be an object or an array.
		try {
			return this.nativefyDates(JSON.parse(item));
		}
		catch (e) {
			// Fall back to the item itself.
			return item;
		}
	}

	private toJSON (input: NativeType): string {
		if (input === null) return "null";
		if (input === undefined) return "undefined";
		if (typeof input === "boolean") return `${input}`;
		if (typeof input === "number") return `${input}`;
		if (typeof input === "symbol") return `${input.toString()}`;
		if (Array.isArray(input)) return JSON.stringify(this.stringifyDates(input));
		if (this.isObject(input)) return JSON.stringify(this.stringifyDates(input));
		if (input instanceof Date) return this.stringifyDate(input);
		if (typeof input === "string") return input;
		throw new TypeError(`${this.constructor.name} could not stringify the given input`);
	}

	private stringifyDate (date: Date): string {
		return `${StorageUtil.DATE_PREFIX}${date.toISOString()}`;
	}

	private nativefyDate (date: string): Date {
		return new Date(date.slice(StorageUtil.DATE_PREFIX.length));
	}

	private nativefyDates (input: {}[]|{}): {}[]|{} {
		if (Array.isArray(input)) return this.nativefyArrayDates(input);
		else return this.nativefyObjectDates(input);
	}

	private nativefyArrayDates (input: {}[]): {}[] {
		return input.map(item => Array.isArray(item) ? this.nativefyArrayDates(item) : this.isObject(item) ? this.nativefyObjectDates(item) : this.isStringifiedDate(item) ? this.nativefyDate(item) : item);
	}

	private nativefyObjectDates (input: {}): {} {
		const indexable = <{ [key: string]: {} }> input;
		const keys = Object.keys(indexable);
		const obj: { [key: string]: {} } = {};

		keys.forEach(key => {
			const value = indexable[key];
			obj[key] = Array.isArray(value) ? this.nativefyArrayDates(value) : this.isObject(value) ? this.nativefyObjectDates(value) : this.isStringifiedDate(value) ? this.nativefyDate(value) : value;
		});
		return obj;
	}

	private stringifyDates (input: {}[]|{}): {}[]|{} {
		if (Array.isArray(input)) return this.stringifyArrayDates(input);
		else return this.stringifyObjectDates(input);
	}

	private isObject (item: {}): item is {} {
		return item && item.constructor === {}.constructor;
	}

	private isStringifiedDate (date: string): boolean {
		return typeof date === "string" && date.startsWith(StorageUtil.DATE_PREFIX);
	}

	private stringifyArrayDates (input: {}[]): {}[] {
		return input.map(item => Array.isArray(item) ? this.stringifyArrayDates(item) : this.isObject(item) ? this.stringifyObjectDates(item) : item instanceof Date ? this.stringifyDate(item) : item);
	}

	private stringifyObjectDates (input: {}): {} {
		const indexable = <{ [key: string]: {} }> input;
		const keys = Object.keys(indexable);
		const obj: { [key: string]: {} } = {};

		keys.forEach(key => {
			const value = indexable[key];
			obj[key] = Array.isArray(value) ? this.stringifyArrayDates(value) : this.isObject(value) ? this.stringifyObjectDates(value) : value instanceof Date ? this.stringifyDate(value) : value;
		});
		return obj;
	}

}