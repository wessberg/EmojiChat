/* tslint:disable */
declare interface TouchEvent {
	/* tslint:enable */
	_isScroller?: boolean;
}

/* tslint:disable */
declare interface CSSStyleDeclaration {
	/* tslint:enable */
	willChange: string|null;
	contain: string|null;
	webkitOverflowScrolling: string|null;
	objectFit: string|null;
}

/* tslint:disable */
declare interface Document {
	/* tslint:enable */
	documentMode: boolean;
}

/* tslint:disable */
declare interface Window {
	XMLHttpRequest: XMLHttpRequest;
	device?: { platform: string };
	ActiveXObject?: string;
	cordova: any;
	/* tslint:enable */
	requestIdleCallback(callback: () => void): void;
}

declare function requestIdleCallback(callback: () => void): void;

declare interface Node {
	getRootNode (): ShadowRoot;
}

declare module "postcss";
declare module "html-minifier";
declare module "postcss-hover";
declare module "postcss-cssnext";
declare module "magic-string";
declare module "cssnano";
declare module "rollup-plugin-node-resolve";
declare module "rollup-plugin-babili";
declare module "rollup-plugin-typescript";