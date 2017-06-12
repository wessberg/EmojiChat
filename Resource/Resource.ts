import {IResource, IStaticAsset} from "./Interface/IResource";
import {Config} from "@wessberg/environment";

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
const IMAGE_EMOJI_NAME = "Emoji";
const IMAGE_MANIFEST_NAME = "Manifest";
const IMAGE_MANIFEST_ANDROID_CHROME_192x192_NAME = "android-chrome-192x192.png";
const IMAGE_MANIFEST_ANDROID_CHROME_512x512_NAME = "android-chrome-512x512.png";
const IMAGE_MANIFEST_APPLE_TOUCH_ICON_NAME = "apple-touch-icon.png";
const IMAGE_EMOJI_ANGRY_NAME = "angry_emoji.svg";
const IMAGE_EMOJI_DISGUSTED_NAME = "disgusted_emoji.svg";
const IMAGE_EMOJI_FEAR_NAME = "fear_emoji.svg";
const IMAGE_EMOJI_HAPPY_NAME = "happy_emoji.svg";
const IMAGE_EMOJI_NEUTRAL_NAME = "neutral_emoji.svg";
const IMAGE_EMOJI_SAD_NAME = "sad_emoji.svg";
const IMAGE_EMOJI_SURPRISED_NAME = "surprised_emoji.svg";
const POLYFILL_NAME = "Polyfill";
const LIB_NAME = "Lib";
const TRACKER_LIB_MODEL_NAME = "Model";
const LIB_SRC_PATH = `${SRC_DIRECTORY}/${LIB_NAME}`;
const TRACKER_LIB_DIRECTORY_NAME = "TrackerLib";
const TRACKER_LIB_NAME = "tracker.min.js";
const TRACKER_LIB_MODEL1_NAME = "model1.min.js";
const TRACKER_LIB_MODEL2_NAME = "model2.min.js";
const TRACKER_LIB_MODEL3_NAME = "model3.min.js";
const TRACKER_LIB_MODEL4_NAME = "model4.min.js";
const TRACKER_LIB_MODEL5_NAME = "model5.min.js";
const TRACKER_LIB_MODEL6_NAME = "model6.min.js";
const TRACKER_LIB_DIRECTORY_SRC_PATH = `${LIB_SRC_PATH}/${TRACKER_LIB_DIRECTORY_NAME}`;
const TRACKER_LIB_MODEL_SRC_PATH = `${TRACKER_LIB_DIRECTORY_SRC_PATH}/${TRACKER_LIB_MODEL_NAME}`;
const TRACKER_LIB_SRC_PATH = `${TRACKER_LIB_DIRECTORY_SRC_PATH}/${TRACKER_LIB_NAME}`;
const TRACKER_LIB_MODEL1_SRC_PATH = `${TRACKER_LIB_MODEL_SRC_PATH}/${TRACKER_LIB_MODEL1_NAME}`;
const TRACKER_LIB_MODEL2_SRC_PATH = `${TRACKER_LIB_MODEL_SRC_PATH}/${TRACKER_LIB_MODEL2_NAME}`;
const TRACKER_LIB_MODEL3_SRC_PATH = `${TRACKER_LIB_MODEL_SRC_PATH}/${TRACKER_LIB_MODEL3_NAME}`;
const TRACKER_LIB_MODEL4_SRC_PATH = `${TRACKER_LIB_MODEL_SRC_PATH}/${TRACKER_LIB_MODEL4_NAME}`;
const TRACKER_LIB_MODEL5_SRC_PATH = `${TRACKER_LIB_MODEL_SRC_PATH}/${TRACKER_LIB_MODEL5_NAME}`;
const TRACKER_LIB_MODEL6_SRC_PATH = `${TRACKER_LIB_MODEL_SRC_PATH}/${TRACKER_LIB_MODEL6_NAME}`;
const WEB_ANIMATIONS_POLYFILL_DIRECTORY_NAME = "WebAnimationsPolyfill";
const REQUEST_IDLE_CALLBACK_POLYFILL_DIRECTORY_NAME = "RequestIdleCallbackPolyfill";
const POINTER_EVENTS_POLYFILL_DIRECTORY_NAME = "PointerEventsPolyfill";
const WEB_ANIMATIONS_POLYFILL_NAME = "web-animations.min.js";
const REQUEST_IDLE_CALLBACK_POLYFILL_NAME = "request-idle-callback.min.js";
const POINTER_EVENTS_POLYFILL_NAME = "pointer-events.min.js";
const POLYFILL_SRC_PATH = `${SRC_DIRECTORY}/${POLYFILL_NAME}`;
const WEB_ANIMATIONS_POLYFILL_DIRECTORY_SRC_PATH = `${POLYFILL_SRC_PATH}/${WEB_ANIMATIONS_POLYFILL_DIRECTORY_NAME}`;
const REQUEST_IDLE_CALLBACK_POLYFILL_DIRECTORY_SRC_PATH = `${POLYFILL_SRC_PATH}/${REQUEST_IDLE_CALLBACK_POLYFILL_DIRECTORY_NAME}`;
const POINTER_EVENTS_POLYFILL_DIRECTORY_SRC_PATH = `${POLYFILL_SRC_PATH}/${POINTER_EVENTS_POLYFILL_DIRECTORY_NAME}`;
const WEB_ANIMATIONS_POLYFILL_SRC_PATH = `${WEB_ANIMATIONS_POLYFILL_DIRECTORY_SRC_PATH}/${WEB_ANIMATIONS_POLYFILL_NAME}`;
const REQUEST_IDLE_CALLBACK_POLYFILL_SRC_PATH = `${REQUEST_IDLE_CALLBACK_POLYFILL_DIRECTORY_SRC_PATH}/${REQUEST_IDLE_CALLBACK_POLYFILL_NAME}`;
const POINTER_EVENTS_POLYFILL_SRC_PATH = `${POINTER_EVENTS_POLYFILL_DIRECTORY_SRC_PATH}/${POINTER_EVENTS_POLYFILL_NAME}`;
const PRODUCT_ICONS_DIRECTORY_NAME = "Product";
const STANDARD_ICONS_DIRECTORY_NAME = "Standard";
const EMOJI_ICONS_DIRECTORY_NAME = "Emoji";
const PRODUCT_ICONS_NAME = "ProductIcons.ts";
const EMOJI_ICONS_NAME = "EmojiIcons.ts";
const IOS_ICONS_NAME = "iOSIcons.ts";
const MATERIAL_ICONS_NAME = "MaterialIcons.ts";
const IMAGE_SRC_PATH = `${ASSET_SRC_PATH}/${IMAGE_NAME}`;
const ICON_SRC_PATH = `${ASSET_SRC_PATH}/${ICON_NAME}`;
const IMAGE_EMOJI_DIRECTORY_SRC_PATH = `${IMAGE_SRC_PATH}/${IMAGE_EMOJI_NAME}`;
const IMAGE_MANIFEST_DIRECTORY_SRC_PATH = `${IMAGE_SRC_PATH}/${IMAGE_MANIFEST_NAME}`;
const IMAGE_MANIFEST_ANDROID_CHROME_192x192_SRC_PATH = `${IMAGE_MANIFEST_DIRECTORY_SRC_PATH}/${IMAGE_MANIFEST_ANDROID_CHROME_192x192_NAME}`;
const IMAGE_MANIFEST_ANDROID_CHROME_512x512_SRC_PATH = `${IMAGE_MANIFEST_DIRECTORY_SRC_PATH}/${IMAGE_MANIFEST_ANDROID_CHROME_512x512_NAME}`;
const IMAGE_MANIFEST_APPLE_TOUCH_ICON_SRC_PATH = `${IMAGE_MANIFEST_DIRECTORY_SRC_PATH}/${IMAGE_MANIFEST_APPLE_TOUCH_ICON_NAME}`;
const IMAGE_EMOJI_ANGRY_SRC_PATH = `${IMAGE_EMOJI_DIRECTORY_SRC_PATH}/${IMAGE_EMOJI_ANGRY_NAME}`;
const IMAGE_EMOJI_DISGUSTED_SRC_PATH = `${IMAGE_EMOJI_DIRECTORY_SRC_PATH}/${IMAGE_EMOJI_DISGUSTED_NAME}`;
const IMAGE_EMOJI_FEAR_SRC_PATH = `${IMAGE_EMOJI_DIRECTORY_SRC_PATH}/${IMAGE_EMOJI_FEAR_NAME}`;
const IMAGE_EMOJI_HAPPY_SRC_PATH = `${IMAGE_EMOJI_DIRECTORY_SRC_PATH}/${IMAGE_EMOJI_HAPPY_NAME}`;
const IMAGE_EMOJI_NEUTRAL_SRC_PATH = `${IMAGE_EMOJI_DIRECTORY_SRC_PATH}/${IMAGE_EMOJI_NEUTRAL_NAME}`;
const IMAGE_EMOJI_SAD_SRC_PATH = `${IMAGE_EMOJI_DIRECTORY_SRC_PATH}/${IMAGE_EMOJI_SAD_NAME}`;
const IMAGE_EMOJI_SURPRISED_SRC_PATH = `${IMAGE_EMOJI_DIRECTORY_SRC_PATH}/${IMAGE_EMOJI_SURPRISED_NAME}`;
const PRODUCT_ICONS_DIRECTORY = `${ICON_SRC_PATH}/${PRODUCT_ICONS_DIRECTORY_NAME}`;
const EMOJI_ICONS_DIRECTORY = `${ICON_SRC_PATH}/${EMOJI_ICONS_DIRECTORY_NAME}`;
const STANDARD_ICONS_DIRECTORY = `${ICON_SRC_PATH}/${STANDARD_ICONS_DIRECTORY_NAME}`;
const PRODUCT_ICONS_SRC_PATH = `${PRODUCT_ICONS_DIRECTORY}/${PRODUCT_ICONS_NAME}`;
const EMOJI_ICONS_SRC_PATH = `${EMOJI_ICONS_DIRECTORY}/${EMOJI_ICONS_NAME}`;
const MATERIAL_ICONS_SRC_PATH = `${STANDARD_ICONS_DIRECTORY}/${MATERIAL_ICONS_NAME}`;
const IOS_ICONS_SRC_PATH = `${STANDARD_ICONS_DIRECTORY}/${IOS_ICONS_NAME}`;
const INDEX_NAME = `index.${Config.MOBILE ? "mobile" : "desktop"}`;
const SHARED_CSS_NAME = `shared.${Config.MOBILE ? "mobile" : "desktop"}.css`;
const INDEX_HTML_NAME = `index.html`;
const SERVICE_WORKER_NAME = "service-worker.js";
const INDEX_HTML_JS_NAME = `index.html.js`;
const SHARED_CSS_JS_NAME = `shared.css.js`;
const SHARED_CSS_JS_SRC_PATH = `${SRC_DIRECTORY}/${SHARED_CSS_JS_NAME}`;
const INDEX_HTML_JS_SRC_PATH = `${SRC_DIRECTORY}/${INDEX_HTML_JS_NAME}`;
const BUNDLE_NAME = `${INDEX_NAME}.js`;
const DIST_DIRECTORY = "dist";
const SERVICE_WORKER_DIST_PATH = `${DIST_DIRECTORY}/${SERVICE_WORKER_NAME}`;
const FAVICON_DIST_PATH = `${DIST_DIRECTORY}/${FAVICON_NAME}`;
const MANIFEST_DIST_PATH = `${DIST_DIRECTORY}/${MANIFEST_NAME}`;
const INDEX_HTML_DIST_PATH = `${DIST_DIRECTORY}/${INDEX_HTML_NAME}`;
const SHARED_CSS_DIST_PATH = `${DIST_DIRECTORY}/${SHARED_CSS_NAME}`;
const BUNDLE_DIST_PATH = `${DIST_DIRECTORY}/${BUNDLE_NAME}`;
const ASSET_DIST_PATH = `${DIST_DIRECTORY}/${ASSET_NAME}`;
const IMAGE_DIST_PATH = `${ASSET_DIST_PATH}/${IMAGE_NAME}`;
const IMAGE_EMOJI_DIRECTORY_DIST_PATH = `${IMAGE_DIST_PATH}/${IMAGE_EMOJI_NAME}`;
const IMAGE_MANIFEST_DIRECTORY_DIST_PATH = `${IMAGE_DIST_PATH}/${IMAGE_MANIFEST_NAME}`;
const IMAGE_MANIFEST_ANDROID_CHROME_192x192_DIST_PATH = `${IMAGE_MANIFEST_DIRECTORY_DIST_PATH}/${IMAGE_MANIFEST_ANDROID_CHROME_192x192_NAME}`;
const IMAGE_MANIFEST_ANDROID_CHROME_512x512_DIST_PATH = `${IMAGE_MANIFEST_DIRECTORY_DIST_PATH}/${IMAGE_MANIFEST_ANDROID_CHROME_512x512_NAME}`;
const IMAGE_MANIFEST_APPLE_TOUCH_ICON_DIST_PATH = `${IMAGE_MANIFEST_DIRECTORY_DIST_PATH}/${IMAGE_MANIFEST_APPLE_TOUCH_ICON_NAME}`;
const IMAGE_EMOJI_ANGRY_DIST_PATH = `${IMAGE_EMOJI_DIRECTORY_DIST_PATH}/${IMAGE_EMOJI_ANGRY_NAME}`;
const IMAGE_EMOJI_DISGUSTED_DIST_PATH = `${IMAGE_EMOJI_DIRECTORY_DIST_PATH}/${IMAGE_EMOJI_DISGUSTED_NAME}`;
const IMAGE_EMOJI_FEAR_DIST_PATH = `${IMAGE_EMOJI_DIRECTORY_DIST_PATH}/${IMAGE_EMOJI_FEAR_NAME}`;
const IMAGE_EMOJI_HAPPY_DIST_PATH = `${IMAGE_EMOJI_DIRECTORY_DIST_PATH}/${IMAGE_EMOJI_HAPPY_NAME}`;
const IMAGE_EMOJI_NEUTRAL_DIST_PATH = `${IMAGE_EMOJI_DIRECTORY_DIST_PATH}/${IMAGE_EMOJI_NEUTRAL_NAME}`;
const IMAGE_EMOJI_SAD_DIST_PATH = `${IMAGE_EMOJI_DIRECTORY_DIST_PATH}/${IMAGE_EMOJI_SAD_NAME}`;
const IMAGE_EMOJI_SURPRISED_DIST_PATH = `${IMAGE_EMOJI_DIRECTORY_DIST_PATH}/${IMAGE_EMOJI_SURPRISED_NAME}`;
const POLYFILL_DIST_PATH = `${DIST_DIRECTORY}/${POLYFILL_NAME}`;
const WEB_ANIMATIONS_POLYFILL_DIRECTORY_DIST_PATH = `${POLYFILL_DIST_PATH}/${WEB_ANIMATIONS_POLYFILL_DIRECTORY_NAME}`;
const REQUEST_IDLE_CALLBACK_POLYFILL_DIRECTORY_DIST_PATH = `${POLYFILL_DIST_PATH}/${REQUEST_IDLE_CALLBACK_POLYFILL_DIRECTORY_NAME}`;
const POINTER_EVENTS_POLYFILL_DIRECTORY_DIST_PATH = `${POLYFILL_DIST_PATH}/${POINTER_EVENTS_POLYFILL_DIRECTORY_NAME}`;
const WEB_ANIMATIONS_POLYFILL_DIST_PATH = `${WEB_ANIMATIONS_POLYFILL_DIRECTORY_DIST_PATH}/${WEB_ANIMATIONS_POLYFILL_NAME}`;
const REQUEST_IDLE_CALLBACK_POLYFILL_DIST_PATH = `${REQUEST_IDLE_CALLBACK_POLYFILL_DIRECTORY_DIST_PATH}/${REQUEST_IDLE_CALLBACK_POLYFILL_NAME}`;
const POINTER_EVENTS_POLYFILL_DIST_PATH = `${POINTER_EVENTS_POLYFILL_DIRECTORY_DIST_PATH}/${POINTER_EVENTS_POLYFILL_NAME}`;
const LIB_DIST_PATH = `${DIST_DIRECTORY}/${LIB_NAME}`;
const TRACKER_LIB_DIRECTORY_DIST_PATH = `${LIB_DIST_PATH}/${TRACKER_LIB_DIRECTORY_NAME}`;
const TRACKER_LIB_DIST_PATH = `${TRACKER_LIB_DIRECTORY_DIST_PATH}/${TRACKER_LIB_NAME}`;
const TRACKER_LIB_MODEL_DIST_PATH = `${TRACKER_LIB_DIRECTORY_DIST_PATH}/${TRACKER_LIB_MODEL_NAME}`;
const TRACKER_LIB_MODEL1_DIST_PATH = `${TRACKER_LIB_MODEL_DIST_PATH}/${TRACKER_LIB_MODEL1_NAME}`;
const TRACKER_LIB_MODEL2_DIST_PATH = `${TRACKER_LIB_MODEL_DIST_PATH}/${TRACKER_LIB_MODEL2_NAME}`;
const TRACKER_LIB_MODEL3_DIST_PATH = `${TRACKER_LIB_MODEL_DIST_PATH}/${TRACKER_LIB_MODEL3_NAME}`;
const TRACKER_LIB_MODEL4_DIST_PATH = `${TRACKER_LIB_MODEL_DIST_PATH}/${TRACKER_LIB_MODEL4_NAME}`;
const TRACKER_LIB_MODEL5_DIST_PATH = `${TRACKER_LIB_MODEL_DIST_PATH}/${TRACKER_LIB_MODEL5_NAME}`;
const TRACKER_LIB_MODEL6_DIST_PATH = `${TRACKER_LIB_MODEL_DIST_PATH}/${TRACKER_LIB_MODEL6_NAME}`;

const relativePath = (path: string, steps?: number) => {
	if (steps == null || steps == 0) return path;
	if (steps < 0) return `${"../".repeat(Math.abs(steps))}${path}`;
	const normalizedPath = path.startsWith("/") ? path.slice(1) : path.startsWith("./") ? path.slice(2) : path;
	return normalizedPath.split("/").slice(steps).join("/");
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
	},
	{
		from (steps?: number) {
			return relativePath(REQUEST_IDLE_CALLBACK_POLYFILL_SRC_PATH, steps);
		},
		to (steps?: number) {
			return relativePath(REQUEST_IDLE_CALLBACK_POLYFILL_DIST_PATH, steps);
		}
	},
	{
		from (steps?: number) {
			return relativePath(TRACKER_LIB_SRC_PATH, steps);
		},
		to (steps?: number) {
			return relativePath(TRACKER_LIB_DIST_PATH, steps);
		}
	},
	{
		from (steps?: number) {
			return relativePath(TRACKER_LIB_MODEL4_SRC_PATH, steps);
		},
		to (steps?: number) {
			return relativePath(TRACKER_LIB_MODEL4_DIST_PATH, steps);
		}
	},
	{
		from (steps?: number) {
			return relativePath(IMAGE_MANIFEST_ANDROID_CHROME_192x192_SRC_PATH, steps);
		},
		to (steps?: number) {
			return relativePath(IMAGE_MANIFEST_ANDROID_CHROME_192x192_DIST_PATH, steps);
		}
	},
	{
		from (steps?: number) {
			return relativePath(IMAGE_MANIFEST_ANDROID_CHROME_512x512_SRC_PATH, steps);
		},
		to (steps?: number) {
			return relativePath(IMAGE_MANIFEST_ANDROID_CHROME_512x512_DIST_PATH, steps);
		}
	},
	{
		from (steps?: number) {
			return relativePath(IMAGE_MANIFEST_APPLE_TOUCH_ICON_SRC_PATH, steps);
		},
		to (steps?: number) {
			return relativePath(IMAGE_MANIFEST_APPLE_TOUCH_ICON_DIST_PATH, steps);
		}
	},
	{
		from (steps?: number) {
			return relativePath(IMAGE_EMOJI_ANGRY_SRC_PATH, steps);
		},
		to (steps?: number) {
			return relativePath(IMAGE_EMOJI_ANGRY_DIST_PATH, steps);
		}
	},
	{
		from (steps?: number) {
			return relativePath(IMAGE_EMOJI_DISGUSTED_SRC_PATH, steps);
		},
		to (steps?: number) {
			return relativePath(IMAGE_EMOJI_DISGUSTED_DIST_PATH, steps);
		}
	},
	{
		from (steps?: number) {
			return relativePath(IMAGE_EMOJI_FEAR_SRC_PATH, steps);
		},
		to (steps?: number) {
			return relativePath(IMAGE_EMOJI_FEAR_DIST_PATH, steps);
		}
	},
	{
		from (steps?: number) {
			return relativePath(IMAGE_EMOJI_HAPPY_SRC_PATH, steps);
		},
		to (steps?: number) {
			return relativePath(IMAGE_EMOJI_HAPPY_DIST_PATH, steps);
		}
	},
	{
		from (steps?: number) {
			return relativePath(IMAGE_EMOJI_NEUTRAL_SRC_PATH, steps);
		},
		to (steps?: number) {
			return relativePath(IMAGE_EMOJI_NEUTRAL_DIST_PATH, steps);
		}
	},
	{
		from (steps?: number) {
			return relativePath(IMAGE_EMOJI_SAD_SRC_PATH, steps);
		},
		to (steps?: number) {
			return relativePath(IMAGE_EMOJI_SAD_DIST_PATH, steps);
		}
	},
	{
		from (steps?: number) {
			return relativePath(IMAGE_EMOJI_SURPRISED_SRC_PATH, steps);
		},
		to (steps?: number) {
			return relativePath(IMAGE_EMOJI_SURPRISED_DIST_PATH, steps);
		}
	}
];

export const Resource: IResource = {
	app: {
		meta: {
			title: "EmojiChat",
			shortName: "EmojiChat",
			display: "standalone",
			orientation: "portrait-primary",
			direction: "ltr",
			language: "en",
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
						},
						manifest: {
							directory (steps?: number) {
								return relativePath(IMAGE_MANIFEST_DIRECTORY_DIST_PATH, steps);
							},
							androidChrome192x192 (steps?: number) {
								return relativePath(IMAGE_MANIFEST_ANDROID_CHROME_192x192_DIST_PATH, steps);
							},
							androidChrome512x512 (steps?: number) {
								return relativePath(IMAGE_MANIFEST_ANDROID_CHROME_512x512_DIST_PATH, steps);
							},
							appleTouchIcon (steps?: number) {
								return relativePath(IMAGE_MANIFEST_APPLE_TOUCH_ICON_DIST_PATH, steps);
							},
						},
						emoji: {
							directory (steps?: number) {
								return relativePath(IMAGE_EMOJI_DIRECTORY_DIST_PATH, steps);
							},
							angry (steps?: number) {
								return relativePath(IMAGE_EMOJI_ANGRY_DIST_PATH, steps);
							},
							disgusted (steps?: number) {
								return relativePath(IMAGE_EMOJI_DISGUSTED_DIST_PATH, steps);
							},
							fear (steps?: number) {
								return relativePath(IMAGE_EMOJI_FEAR_DIST_PATH, steps);
							},
							happy (steps?: number) {
								return relativePath(IMAGE_EMOJI_HAPPY_DIST_PATH, steps);
							},
							neutral (steps?: number) {
								return relativePath(IMAGE_EMOJI_NEUTRAL_DIST_PATH, steps);
							},
							sad (steps?: number) {
								return relativePath(IMAGE_EMOJI_SAD_DIST_PATH, steps);
							},
							surprised (steps?: number) {
								return relativePath(IMAGE_EMOJI_SURPRISED_DIST_PATH, steps);
							}
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
					},
					requestIdleCallback (steps?: number) {
						return relativePath(REQUEST_IDLE_CALLBACK_POLYFILL_DIST_PATH, steps);
					}
				},
				lib: {
					directory (steps?: number) {
						return relativePath(LIB_DIST_PATH, steps);
					},
					tracker: {
						directory (steps?: number) {
							return relativePath(TRACKER_LIB_DIRECTORY_DIST_PATH, steps);
						},
						tracker (steps?: number) {
							return relativePath(TRACKER_LIB_DIST_PATH, steps);
						},
						model: {
							directory (steps?: number) {
								return relativePath(TRACKER_LIB_MODEL_DIST_PATH, steps);
							},
							model1 (steps?: number) {
								return relativePath(TRACKER_LIB_MODEL1_DIST_PATH, steps);
							},
							model2 (steps?: number) {
								return relativePath(TRACKER_LIB_MODEL2_DIST_PATH, steps);
							},
							model3 (steps?: number) {
								return relativePath(TRACKER_LIB_MODEL3_DIST_PATH, steps);
							},
							model4 (steps?: number) {
								return relativePath(TRACKER_LIB_MODEL4_DIST_PATH, steps);
							},
							model5 (steps?: number) {
								return relativePath(TRACKER_LIB_MODEL5_DIST_PATH, steps);
							},
							model6 (steps?: number) {
								return relativePath(TRACKER_LIB_MODEL6_DIST_PATH, steps);
							}
						}
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
				serviceWorker (steps?: number) {
					return relativePath(SERVICE_WORKER_DIST_PATH, steps);
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
						},
						manifest: {
							directory (steps?: number) {
								return relativePath(IMAGE_MANIFEST_DIRECTORY_SRC_PATH, steps);
							},
							androidChrome192x192 (steps?: number) {
								return relativePath(IMAGE_MANIFEST_ANDROID_CHROME_192x192_SRC_PATH, steps);
							},
							androidChrome512x512 (steps?: number) {
								return relativePath(IMAGE_MANIFEST_ANDROID_CHROME_512x512_SRC_PATH, steps);
							},
							appleTouchIcon (steps?: number) {
								return relativePath(IMAGE_MANIFEST_APPLE_TOUCH_ICON_SRC_PATH, steps);
							},
						},
						emoji: {
							directory (steps?: number) {
								return relativePath(IMAGE_EMOJI_DIRECTORY_SRC_PATH, steps);
							},
							angry (steps?: number) {
								return relativePath(IMAGE_EMOJI_ANGRY_SRC_PATH, steps);
							},
							disgusted (steps?: number) {
								return relativePath(IMAGE_EMOJI_DISGUSTED_SRC_PATH, steps);
							},
							fear (steps?: number) {
								return relativePath(IMAGE_EMOJI_FEAR_SRC_PATH, steps);
							},
							happy (steps?: number) {
								return relativePath(IMAGE_EMOJI_HAPPY_SRC_PATH, steps);
							},
							neutral (steps?: number) {
								return relativePath(IMAGE_EMOJI_NEUTRAL_SRC_PATH, steps);
							},
							sad (steps?: number) {
								return relativePath(IMAGE_EMOJI_SAD_SRC_PATH, steps);
							},
							surprised (steps?: number) {
								return relativePath(IMAGE_EMOJI_SURPRISED_SRC_PATH, steps);
							}
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
						emoji: {
							directory (steps?: number) {
								return relativePath(EMOJI_ICONS_DIRECTORY, steps);
							},
							emojiIcons (steps?: number) {
								return relativePath(EMOJI_ICONS_SRC_PATH, steps);
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
					},
					requestIdleCallback (steps?: number) {
						return relativePath(REQUEST_IDLE_CALLBACK_POLYFILL_SRC_PATH, steps);
					}
				},
				lib: {
					directory (steps?: number) {
						return relativePath(LIB_SRC_PATH, steps);
					},
					tracker: {
						directory (steps?: number) {
							return relativePath(TRACKER_LIB_DIRECTORY_SRC_PATH, steps);
						},
						tracker (steps?: number) {
							return relativePath(TRACKER_LIB_SRC_PATH, steps);
						},
						model: {
							directory (steps?: number) {
								return relativePath(TRACKER_LIB_MODEL_SRC_PATH, steps);
							},
							model1 (steps?: number) {
								return relativePath(TRACKER_LIB_MODEL1_SRC_PATH, steps);
							},
							model2 (steps?: number) {
								return relativePath(TRACKER_LIB_MODEL2_SRC_PATH, steps);
							},
							model3 (steps?: number) {
								return relativePath(TRACKER_LIB_MODEL3_SRC_PATH, steps);
							},
							model4 (steps?: number) {
								return relativePath(TRACKER_LIB_MODEL4_SRC_PATH, steps);
							},
							model5 (steps?: number) {
								return relativePath(TRACKER_LIB_MODEL5_SRC_PATH, steps);
							},
							model6 (steps?: number) {
								return relativePath(TRACKER_LIB_MODEL6_SRC_PATH, steps);
							}
						}
					},
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
					return relativePath(SHARED_CSS_JS_SRC_PATH, steps);
				}
			}
		}
	},
	build: {
		format: "iife",
		sourceMap: !Config.PRODUCTION,
		treeshake: true,
		staticAssets: STATIC_ASSETS
	}
};

