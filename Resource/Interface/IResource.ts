export declare type DirectoryGetter = (steps?: number) => string;

export interface ICommonPath {
	directory: DirectoryGetter;
	polyfill: IPolyfillPath;
	favicon: DirectoryGetter;
}

export interface IDistPath extends ICommonPath {
	asset: IAssetDistPath;
	bundle: DirectoryGetter;
	indexHtml: DirectoryGetter;
	sharedCss: DirectoryGetter;
	manifest: DirectoryGetter;
}

export interface IImagePath {
	directory: DirectoryGetter;
}

export interface IIconPath {
	directory: DirectoryGetter;
	product: IProductIconsPath;
	standard: IStandardIconsPath;
}

export interface IProductIconsPath {
	directory: DirectoryGetter;
	productIcons: DirectoryGetter;
}

export interface IStandardIconsPath {
	directory: DirectoryGetter;
	ios: DirectoryGetter;
	material: DirectoryGetter;
}

export interface IAssetDistPath {
	directory: DirectoryGetter;
	image: IImagePath;
}

export interface IAssetSrcPath {
	directory: DirectoryGetter;
	image: IImagePath;
	icon: IIconPath;
}

export interface ISrcPath extends ICommonPath {
	asset: IAssetSrcPath;
	entry: DirectoryGetter;
	indexHtmlJS: DirectoryGetter;
	sharedCssJS: DirectoryGetter;
	manifestJS: DirectoryGetter;
}

export interface IAppPath {
	src: ISrcPath;
	dist: IDistPath;
}

export interface IBrowserPath {
	root: () => string;
}

export interface IBrowserResource {
	path: IBrowserPath;
}

export interface IDevServerTLS {
	key: string;
	cert: string;
}

export interface IDevServerResource {
	meta: IDevServerMeta;
	tls: IDevServerTLS;
}

export interface IDevServerMeta {
	host: string;
	port: number;
}

export interface IAppResource {
	meta: IAppMeta;
	path: IAppPath;
}

export interface IPolyfillPath {
	directory: DirectoryGetter;
	webAnimations: DirectoryGetter;
	pointerEvents: DirectoryGetter;
}

export interface IStaticAsset {
	from: DirectoryGetter;
	to: DirectoryGetter;
}

export interface IBuildResource {
	format: string;
	sourceMap: boolean;
	treeshake: boolean;
	staticAssets: IStaticAsset[];
}

export interface IAppMeta {
	title: string;
	shortName: string;
	direction: string;
	language: string;
	display: string;
	orientation: string;
	description: string;
	startUrl: string;
}

export interface IResource {
	browser: IBrowserResource;
	app: IAppResource;
	devServer: IDevServerResource;
	build: IBuildResource;
}