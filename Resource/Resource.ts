import {IResource, IStaticAsset} from "./Interface/IResource";
import {Config} from "@wessberg/environment";
import {SERVER_CERT, SERVER_KEY} from "../Tool/DevServer/TLS/Keys";

const SRC_DIRECTORY = "src";
const ENTRY_NAME = "index.ts";
const FAVICON_NAME = "favicon.ico";
const ENTRY_PATH = `${SRC_DIRECTORY}/${ENTRY_NAME}`;
const MANIFEST_NAME = `manifest.webmanifest`;
const MANIFEST_JS_NAME = `${MANIFEST_NAME}.js`;
const MANIFEST_JS_SRC_PATH = `${SRC_DIRECTORY}/${MANIFEST_JS_NAME}`;
const FAVICON_SRC_PATH = `${SRC_DIRECTORY}/${FAVICON_NAME}`;
const ASSET_NAME = "Asset";
const ASSET_SRC_PATH = `${SRC_DIRECTORY}/${ASSET_NAME}`;
const IMAGE_NAME = "Image";
const ICON_NAME = "Image";
const POLYFILL_NAME = "Polyfill";
const WEB_ANIMATIONS_POLYFILL_DIRECTORY_NAME = "WebAnimationsPolyfill";
const POINTER_EVENTS_POLYFILL_DIRECTORY_NAME = "PointerEventsPolyfill";
const WEB_ANIMATIONS_POLYFILL_NAME = "web-animations.min.js";
const POINTER_EVENTS_POLYFILL_NAME = "pointer-events.min.js";
const POLYFILL_SRC_PATH = `${SRC_DIRECTORY}/${POLYFILL_NAME}`;
const WEB_ANIMATIONS_POLYFILL_DIRECTORY_SRC_PATH = `${POLYFILL_SRC_PATH}/${WEB_ANIMATIONS_POLYFILL_DIRECTORY_NAME}`;
const POINTER_EVENTS_POLYFILL_DIRECTORY_SRC_PATH = `${POLYFILL_SRC_PATH}/${POINTER_EVENTS_POLYFILL_DIRECTORY_NAME}`;
const WEB_ANIMATIONS_POLYFILL_SRC_PATH = `${WEB_ANIMATIONS_POLYFILL_DIRECTORY_SRC_PATH}/${WEB_ANIMATIONS_POLYFILL_NAME}`;
const POINTER_EVENTS_POLYFILL_SRC_PATH = `${POINTER_EVENTS_POLYFILL_DIRECTORY_SRC_PATH}/${POINTER_EVENTS_POLYFILL_NAME}`;
const PRODUCT_ICONS_DIRECTORY_NAME = "Product";
const STANDARD_ICONS_DIRECTORY_NAME = "Standard";
const PRODUCT_ICONS_NAME = "ProductIcons.ts";
const IOS_ICONS_NAME = "iOSIcons.ts";
const MATERIAL_ICONS_NAME = "MaterialIcons.ts";
const IMAGE_SRC_PATH = `${ASSET_SRC_PATH}/${IMAGE_NAME}`;
const ICON_SRC_PATH = `${ASSET_SRC_PATH}/${ICON_NAME}`;
const PRODUCT_ICONS_DIRECTORY = `${ICON_SRC_PATH}/${PRODUCT_ICONS_DIRECTORY_NAME}`;
const STANDARD_ICONS_DIRECTORY = `${ICON_SRC_PATH}/${STANDARD_ICONS_DIRECTORY_NAME}`;
const PRODUCT_ICONS_SRC_PATH = `${PRODUCT_ICONS_DIRECTORY}/${PRODUCT_ICONS_NAME}`;
const MATERIAL_ICONS_SRC_PATH = `${STANDARD_ICONS_DIRECTORY}/${MATERIAL_ICONS_NAME}`;
const IOS_ICONS_SRC_PATH = `${STANDARD_ICONS_DIRECTORY}/${IOS_ICONS_NAME}`;
const INDEX_NAME = `index.${Config.MOBILE ? "mobile" : "desktop"}`;
const SHARED_CSS_NAME = `shared.${Config.MOBILE ? "mobile" : "desktop"}.css`;
const INDEX_HTML_NAME = `${INDEX_NAME}.html`;
const INDEX_HTML_JS_NAME = `index.html.js`;
const SHARED_CSS_JS_NAME = `shared.css.js`;
const SHARED_CSS_JS_SRC_PATH = `${SRC_DIRECTORY}/${SHARED_CSS_JS_NAME}`;
const INDEX_HTML_JS_SRC_PATH = `${SRC_DIRECTORY}/${INDEX_HTML_JS_NAME}`;
const BUNDLE_NAME = `${INDEX_NAME}.js`;
const DIST_DIRECTORY = "dist";
const FAVICON_DIST_PATH = `${DIST_DIRECTORY}/${FAVICON_NAME}`;
const MANIFEST_DIST_PATH = `${DIST_DIRECTORY}/${MANIFEST_NAME}`;
const INDEX_HTML_DIST_PATH = `${DIST_DIRECTORY}/${INDEX_HTML_NAME}`;
const SHARED_CSS_DIST_PATH = `${DIST_DIRECTORY}/${SHARED_CSS_NAME}`;
const BUNDLE_DIST_PATH = `${DIST_DIRECTORY}/${BUNDLE_NAME}`;
const ASSET_DIST_PATH = `${DIST_DIRECTORY}/${ASSET_NAME}`;
const IMAGE_DIST_PATH = `${ASSET_DIST_PATH}/${IMAGE_NAME}`;
const POLYFILL_DIST_PATH = `${DIST_DIRECTORY}/${POLYFILL_NAME}`;
const WEB_ANIMATIONS_POLYFILL_DIRECTORY_DIST_PATH = `${POLYFILL_DIST_PATH}/${WEB_ANIMATIONS_POLYFILL_DIRECTORY_NAME}`;
const POINTER_EVENTS_POLYFILL_DIRECTORY_DIST_PATH = `${POLYFILL_DIST_PATH}/${POINTER_EVENTS_POLYFILL_DIRECTORY_NAME}`;
const WEB_ANIMATIONS_POLYFILL_DIST_PATH = `${WEB_ANIMATIONS_POLYFILL_DIRECTORY_DIST_PATH}/${WEB_ANIMATIONS_POLYFILL_NAME}`;
const POINTER_EVENTS_POLYFILL_DIST_PATH = `${POINTER_EVENTS_POLYFILL_DIRECTORY_DIST_PATH}/${POINTER_EVENTS_POLYFILL_NAME}`;

const relativePath = (path: string, steps?: number) => {
	if (steps == null || steps == 0) return path;
	if (steps < 0) return `${"../".repeat(Math.abs(steps))}${path}`;
	const normalizedPath = path.startsWith("/") ? path.slice(1) : path.startsWith("./") ? path.slice(2) : path;
	return normalizedPath.split("/").slice(steps).join("");
};

const STATIC_ASSETS: IStaticAsset[] = [
	{
		from (steps?: number) {
			return relativePath(FAVICON_SRC_PATH, steps);
		},
		to (steps?: number) {
			return relativePath(FAVICON_DIST_PATH, steps);
		}
	},
	{
		from (steps?: number) {
			return relativePath(IMAGE_SRC_PATH, steps);
		},
		to (steps?: number) {
			return relativePath(IMAGE_DIST_PATH, steps);
		}
	},
	{
		from (steps?: number) {
			return relativePath(WEB_ANIMATIONS_POLYFILL_SRC_PATH, steps);
		},
		to (steps?: number) {
			return relativePath(WEB_ANIMATIONS_POLYFILL_DIST_PATH, steps);
		}
	},
	{
		from (steps?: number) {
			return relativePath(POINTER_EVENTS_POLYFILL_SRC_PATH, steps);
		},
		to (steps?: number) {
			return relativePath(POINTER_EVENTS_POLYFILL_DIST_PATH, steps);
		}
	}
];

export const Resource: IResource = {
	app: {
		meta: {
			title: "Fovea",
			shortName: "Fovea",
			display: "standalone",
			orientation: "portrait-primary",
			direction: "ltr",
			language: "dk",
			description: "",
			startUrl: "."
		},
		path: {
			dist: {
				directory (steps?: number) {
					return relativePath(DIST_DIRECTORY, steps);
				},
				asset: {
					directory (steps?: number) {
						return relativePath(ASSET_DIST_PATH, steps);
					},
					image: {
						directory (steps?: number) {
							return relativePath(IMAGE_DIST_PATH, steps);
						}
					}
				},
				polyfill: {
					directory (steps?: number) {
						return relativePath(POLYFILL_DIST_PATH, steps);
					},
					webAnimations (steps?: number) {
						return relativePath(WEB_ANIMATIONS_POLYFILL_DIST_PATH, steps);
					},
					pointerEvents (steps?: number) {
						return relativePath(POINTER_EVENTS_POLYFILL_DIST_PATH, steps);
					}
				},
				bundle (steps?: number) {
					return relativePath(BUNDLE_DIST_PATH, steps);
				},
				indexHtml (steps?: number) {
					return relativePath(INDEX_HTML_DIST_PATH, steps);
				},
				manifest (steps?: number) {
					return relativePath(MANIFEST_DIST_PATH, steps);
				},
				favicon (steps?: number) {
					return relativePath(FAVICON_DIST_PATH, steps);
				},
				sharedCss (steps?: number) {
					return relativePath(SHARED_CSS_DIST_PATH, steps);
				}
			},
			src: {
				directory (steps?: number) {
					return relativePath(SRC_DIRECTORY, steps);
				},
				asset: {
					directory (steps?: number) {
						return relativePath(ASSET_SRC_PATH, steps);
					},
					image: {
						directory (steps?: number) {
							return relativePath(IMAGE_SRC_PATH, steps);
						}
					},
					icon: {
						directory (steps?: number) {
							return relativePath(ICON_SRC_PATH, steps);
						},
						product: {
							directory (steps?: number) {
								return relativePath(PRODUCT_ICONS_DIRECTORY, steps);
							},
							productIcons (steps?: number) {
								return relativePath(PRODUCT_ICONS_SRC_PATH, steps);
							}
						},
						standard: {
							directory (steps?: number) {
								return relativePath(STANDARD_ICONS_DIRECTORY, steps);
							},
							ios (steps?: number) {
								return relativePath(IOS_ICONS_SRC_PATH, steps);
							},
							material (steps?: number) {
								return relativePath(MATERIAL_ICONS_SRC_PATH, steps);
							}
						}
					}
				},
				polyfill: {
					directory (steps?: number) {
						return relativePath(POLYFILL_SRC_PATH, steps);
					},
					webAnimations (steps?: number) {
						return relativePath(WEB_ANIMATIONS_POLYFILL_SRC_PATH, steps);
					},
					pointerEvents (steps?: number) {
						return relativePath(POINTER_EVENTS_POLYFILL_SRC_PATH, steps);
					}
				},
				entry (steps?: number) {
					return relativePath(ENTRY_PATH, steps);
				},
				manifestJS (steps?: number) {
					return relativePath(MANIFEST_JS_SRC_PATH, steps);
				},
				favicon (steps?: number) {
					return relativePath(FAVICON_SRC_PATH, steps);
				},
				indexHtmlJS (steps?: number) {
					return relativePath(INDEX_HTML_JS_SRC_PATH, steps);
				},
				sharedCssJS (steps?: number) {
					return relativePath(SHARED_CSS_JS_SRC_PATH, steps)
				}
			}
		}
	},
	devServer: {
		meta: {
			host: "localhost",
			port: 3000
		},
		tls: {
			key: SERVER_KEY,
			cert: SERVER_CERT
		}
	},
	build: {
		format: "iife",
		sourceMap: !Config.PRODUCTION,
		treeshake: true,
		staticAssets: STATIC_ASSETS
	},
	browser: {
		path: {
			root: () => location.pathname
		}
	}
};

