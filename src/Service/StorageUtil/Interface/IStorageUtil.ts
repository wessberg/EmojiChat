export declare type CollectionKind = string;
export declare type NativeType = string|null|number|boolean|symbol|undefined|{}[]|object|Date;

export declare type IStorageEntry<T extends {}> = T&{ id: number };

export interface IStorageUtil {
	addCollection (collection: CollectionKind): boolean;
	hasCollection (collection: CollectionKind): boolean;
	get<T extends {}> (id: number, collection: CollectionKind): IStorageEntry<T>|null;
	getAll<T extends {}> (collection: CollectionKind): IStorageEntry<T>[];
	add<T extends {}> (entry: T, collection: CollectionKind): IStorageEntry<T>;
	update<T extends {}> (id: number, entry: T, collection: CollectionKind): boolean;
	remove (id: number, collection: CollectionKind): boolean;
}

