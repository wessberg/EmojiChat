import { Config } from "@wessberg/environment";
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
const EMOJI_ICONS_DIRECTORY_NAME = "Emoji";
const PRODUCT_ICONS_NAME = "ProductIcons.ts";
const EMOJI_ICONS_NAME = "EmojiIcons.ts";
const IOS_ICONS_NAME = "iOSIcons.ts";
const MATERIAL_ICONS_NAME = "MaterialIcons.ts";
const IMAGE_SRC_PATH = `${ASSET_SRC_PATH}/${IMAGE_NAME}`;
const ICON_SRC_PATH = `${ASSET_SRC_PATH}/${ICON_NAME}`;
const IMAGE_EMOJI_DIRECTORY_SRC_PATH = `${IMAGE_SRC_PATH}/${IMAGE_EMOJI_NAME}`;
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
const IMAGE_EMOJI_DIRECTORY_DIST_PATH = `${IMAGE_DIST_PATH}/${IMAGE_EMOJI_NAME}`;
const IMAGE_EMOJI_ANGRY_DIST_PATH = `${IMAGE_EMOJI_DIRECTORY_DIST_PATH}/${IMAGE_EMOJI_ANGRY_NAME}`;
const IMAGE_EMOJI_DISGUSTED_DIST_PATH = `${IMAGE_EMOJI_DIRECTORY_DIST_PATH}/${IMAGE_EMOJI_DISGUSTED_NAME}`;
const IMAGE_EMOJI_FEAR_DIST_PATH = `${IMAGE_EMOJI_DIRECTORY_DIST_PATH}/${IMAGE_EMOJI_FEAR_NAME}`;
const IMAGE_EMOJI_HAPPY_DIST_PATH = `${IMAGE_EMOJI_DIRECTORY_DIST_PATH}/${IMAGE_EMOJI_HAPPY_NAME}`;
const IMAGE_EMOJI_NEUTRAL_DIST_PATH = `${IMAGE_EMOJI_DIRECTORY_DIST_PATH}/${IMAGE_EMOJI_NEUTRAL_NAME}`;
const IMAGE_EMOJI_SAD_DIST_PATH = `${IMAGE_EMOJI_DIRECTORY_DIST_PATH}/${IMAGE_EMOJI_SAD_NAME}`;
const IMAGE_EMOJI_SURPRISED_DIST_PATH = `${IMAGE_EMOJI_DIRECTORY_DIST_PATH}/${IMAGE_EMOJI_SURPRISED_NAME}`;
const POLYFILL_DIST_PATH = `${DIST_DIRECTORY}/${POLYFILL_NAME}`;
const WEB_ANIMATIONS_POLYFILL_DIRECTORY_DIST_PATH = `${POLYFILL_DIST_PATH}/${WEB_ANIMATIONS_POLYFILL_DIRECTORY_NAME}`;
const POINTER_EVENTS_POLYFILL_DIRECTORY_DIST_PATH = `${POLYFILL_DIST_PATH}/${POINTER_EVENTS_POLYFILL_DIRECTORY_NAME}`;
const WEB_ANIMATIONS_POLYFILL_DIST_PATH = `${WEB_ANIMATIONS_POLYFILL_DIRECTORY_DIST_PATH}/${WEB_ANIMATIONS_POLYFILL_NAME}`;
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
const relativePath = (path, steps) => {
    if (steps == null || steps == 0)
        return path;
    if (steps < 0)
        return `${"../".repeat(Math.abs(steps))}${path}`;
    const normalizedPath = path.startsWith("/") ? path.slice(1) : path.startsWith("./") ? path.slice(2) : path;
    return normalizedPath.split("/").slice(steps).join("/");
};
const STATIC_ASSETS = [
    {
        from(steps) {
            return relativePath(FAVICON_SRC_PATH, steps);
        },
        to(steps) {
            return relativePath(FAVICON_DIST_PATH, steps);
        }
    },
    {
        from(steps) {
            return relativePath(IMAGE_SRC_PATH, steps);
        },
        to(steps) {
            return relativePath(IMAGE_DIST_PATH, steps);
        }
    },
    {
        from(steps) {
            return relativePath(WEB_ANIMATIONS_POLYFILL_SRC_PATH, steps);
        },
        to(steps) {
            return relativePath(WEB_ANIMATIONS_POLYFILL_DIST_PATH, steps);
        }
    },
    {
        from(steps) {
            return relativePath(POINTER_EVENTS_POLYFILL_SRC_PATH, steps);
        },
        to(steps) {
            return relativePath(POINTER_EVENTS_POLYFILL_DIST_PATH, steps);
        }
    },
    {
        from(steps) {
            return relativePath(TRACKER_LIB_SRC_PATH, steps);
        },
        to(steps) {
            return relativePath(TRACKER_LIB_DIST_PATH, steps);
        }
    },
    {
        from(steps) {
            return relativePath(TRACKER_LIB_MODEL1_SRC_PATH, steps);
        },
        to(steps) {
            return relativePath(TRACKER_LIB_MODEL1_DIST_PATH, steps);
        }
    },
    {
        from(steps) {
            return relativePath(TRACKER_LIB_MODEL2_SRC_PATH, steps);
        },
        to(steps) {
            return relativePath(TRACKER_LIB_MODEL2_DIST_PATH, steps);
        }
    },
    {
        from(steps) {
            return relativePath(TRACKER_LIB_MODEL3_SRC_PATH, steps);
        },
        to(steps) {
            return relativePath(TRACKER_LIB_MODEL3_DIST_PATH, steps);
        }
    },
    {
        from(steps) {
            return relativePath(TRACKER_LIB_MODEL4_SRC_PATH, steps);
        },
        to(steps) {
            return relativePath(TRACKER_LIB_MODEL4_DIST_PATH, steps);
        }
    },
    {
        from(steps) {
            return relativePath(TRACKER_LIB_MODEL5_SRC_PATH, steps);
        },
        to(steps) {
            return relativePath(TRACKER_LIB_MODEL5_DIST_PATH, steps);
        }
    },
    {
        from(steps) {
            return relativePath(TRACKER_LIB_MODEL6_SRC_PATH, steps);
        },
        to(steps) {
            return relativePath(TRACKER_LIB_MODEL6_DIST_PATH, steps);
        }
    },
    {
        from(steps) {
            return relativePath(IMAGE_EMOJI_ANGRY_SRC_PATH, steps);
        },
        to(steps) {
            return relativePath(IMAGE_EMOJI_ANGRY_DIST_PATH, steps);
        }
    },
    {
        from(steps) {
            return relativePath(IMAGE_EMOJI_DISGUSTED_SRC_PATH, steps);
        },
        to(steps) {
            return relativePath(IMAGE_EMOJI_DISGUSTED_DIST_PATH, steps);
        }
    },
    {
        from(steps) {
            return relativePath(IMAGE_EMOJI_FEAR_SRC_PATH, steps);
        },
        to(steps) {
            return relativePath(IMAGE_EMOJI_FEAR_DIST_PATH, steps);
        }
    },
    {
        from(steps) {
            return relativePath(IMAGE_EMOJI_HAPPY_SRC_PATH, steps);
        },
        to(steps) {
            return relativePath(IMAGE_EMOJI_HAPPY_DIST_PATH, steps);
        }
    },
    {
        from(steps) {
            return relativePath(IMAGE_EMOJI_NEUTRAL_SRC_PATH, steps);
        },
        to(steps) {
            return relativePath(IMAGE_EMOJI_NEUTRAL_DIST_PATH, steps);
        }
    },
    {
        from(steps) {
            return relativePath(IMAGE_EMOJI_SAD_SRC_PATH, steps);
        },
        to(steps) {
            return relativePath(IMAGE_EMOJI_SAD_DIST_PATH, steps);
        }
    },
    {
        from(steps) {
            return relativePath(IMAGE_EMOJI_SURPRISED_SRC_PATH, steps);
        },
        to(steps) {
            return relativePath(IMAGE_EMOJI_SURPRISED_DIST_PATH, steps);
        }
    }
];
export const Resource = {
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
                directory(steps) {
                    return relativePath(DIST_DIRECTORY, steps);
                },
                asset: {
                    directory(steps) {
                        return relativePath(ASSET_DIST_PATH, steps);
                    },
                    image: {
                        directory(steps) {
                            return relativePath(IMAGE_DIST_PATH, steps);
                        },
                        emoji: {
                            directory(steps) {
                                return relativePath(IMAGE_EMOJI_DIRECTORY_DIST_PATH, steps);
                            },
                            angry(steps) {
                                return relativePath(IMAGE_EMOJI_ANGRY_DIST_PATH, steps);
                            },
                            disgusted(steps) {
                                return relativePath(IMAGE_EMOJI_DISGUSTED_DIST_PATH, steps);
                            },
                            fear(steps) {
                                return relativePath(IMAGE_EMOJI_FEAR_DIST_PATH, steps);
                            },
                            happy(steps) {
                                return relativePath(IMAGE_EMOJI_HAPPY_DIST_PATH, steps);
                            },
                            neutral(steps) {
                                return relativePath(IMAGE_EMOJI_NEUTRAL_DIST_PATH, steps);
                            },
                            sad(steps) {
                                return relativePath(IMAGE_EMOJI_SAD_DIST_PATH, steps);
                            },
                            surprised(steps) {
                                return relativePath(IMAGE_EMOJI_SURPRISED_DIST_PATH, steps);
                            }
                        }
                    }
                },
                polyfill: {
                    directory(steps) {
                        return relativePath(POLYFILL_DIST_PATH, steps);
                    },
                    webAnimations(steps) {
                        return relativePath(WEB_ANIMATIONS_POLYFILL_DIST_PATH, steps);
                    },
                    pointerEvents(steps) {
                        return relativePath(POINTER_EVENTS_POLYFILL_DIST_PATH, steps);
                    }
                },
                lib: {
                    directory(steps) {
                        return relativePath(LIB_DIST_PATH, steps);
                    },
                    tracker: {
                        directory(steps) {
                            return relativePath(TRACKER_LIB_DIRECTORY_DIST_PATH, steps);
                        },
                        tracker(steps) {
                            return relativePath(TRACKER_LIB_DIST_PATH, steps);
                        },
                        model: {
                            directory(steps) {
                                return relativePath(TRACKER_LIB_MODEL_DIST_PATH, steps);
                            },
                            model1(steps) {
                                return relativePath(TRACKER_LIB_MODEL1_DIST_PATH, steps);
                            },
                            model2(steps) {
                                return relativePath(TRACKER_LIB_MODEL2_DIST_PATH, steps);
                            },
                            model3(steps) {
                                return relativePath(TRACKER_LIB_MODEL3_DIST_PATH, steps);
                            },
                            model4(steps) {
                                return relativePath(TRACKER_LIB_MODEL4_DIST_PATH, steps);
                            },
                            model5(steps) {
                                return relativePath(TRACKER_LIB_MODEL5_DIST_PATH, steps);
                            },
                            model6(steps) {
                                return relativePath(TRACKER_LIB_MODEL6_DIST_PATH, steps);
                            }
                        }
                    }
                },
                bundle(steps) {
                    return relativePath(BUNDLE_DIST_PATH, steps);
                },
                indexHtml(steps) {
                    return relativePath(INDEX_HTML_DIST_PATH, steps);
                },
                manifest(steps) {
                    return relativePath(MANIFEST_DIST_PATH, steps);
                },
                favicon(steps) {
                    return relativePath(FAVICON_DIST_PATH, steps);
                },
                sharedCss(steps) {
                    return relativePath(SHARED_CSS_DIST_PATH, steps);
                }
            },
            src: {
                directory(steps) {
                    return relativePath(SRC_DIRECTORY, steps);
                },
                asset: {
                    directory(steps) {
                        return relativePath(ASSET_SRC_PATH, steps);
                    },
                    image: {
                        directory(steps) {
                            return relativePath(IMAGE_SRC_PATH, steps);
                        },
                        emoji: {
                            directory(steps) {
                                return relativePath(IMAGE_EMOJI_DIRECTORY_SRC_PATH, steps);
                            },
                            angry(steps) {
                                return relativePath(IMAGE_EMOJI_ANGRY_SRC_PATH, steps);
                            },
                            disgusted(steps) {
                                return relativePath(IMAGE_EMOJI_DISGUSTED_SRC_PATH, steps);
                            },
                            fear(steps) {
                                return relativePath(IMAGE_EMOJI_FEAR_SRC_PATH, steps);
                            },
                            happy(steps) {
                                return relativePath(IMAGE_EMOJI_HAPPY_SRC_PATH, steps);
                            },
                            neutral(steps) {
                                return relativePath(IMAGE_EMOJI_NEUTRAL_SRC_PATH, steps);
                            },
                            sad(steps) {
                                return relativePath(IMAGE_EMOJI_SAD_SRC_PATH, steps);
                            },
                            surprised(steps) {
                                return relativePath(IMAGE_EMOJI_SURPRISED_SRC_PATH, steps);
                            }
                        }
                    },
                    icon: {
                        directory(steps) {
                            return relativePath(ICON_SRC_PATH, steps);
                        },
                        product: {
                            directory(steps) {
                                return relativePath(PRODUCT_ICONS_DIRECTORY, steps);
                            },
                            productIcons(steps) {
                                return relativePath(PRODUCT_ICONS_SRC_PATH, steps);
                            }
                        },
                        emoji: {
                            directory(steps) {
                                return relativePath(EMOJI_ICONS_DIRECTORY, steps);
                            },
                            emojiIcons(steps) {
                                return relativePath(EMOJI_ICONS_SRC_PATH, steps);
                            }
                        },
                        standard: {
                            directory(steps) {
                                return relativePath(STANDARD_ICONS_DIRECTORY, steps);
                            },
                            ios(steps) {
                                return relativePath(IOS_ICONS_SRC_PATH, steps);
                            },
                            material(steps) {
                                return relativePath(MATERIAL_ICONS_SRC_PATH, steps);
                            }
                        }
                    }
                },
                polyfill: {
                    directory(steps) {
                        return relativePath(POLYFILL_SRC_PATH, steps);
                    },
                    webAnimations(steps) {
                        return relativePath(WEB_ANIMATIONS_POLYFILL_SRC_PATH, steps);
                    },
                    pointerEvents(steps) {
                        return relativePath(POINTER_EVENTS_POLYFILL_SRC_PATH, steps);
                    }
                },
                lib: {
                    directory(steps) {
                        return relativePath(LIB_SRC_PATH, steps);
                    },
                    tracker: {
                        directory(steps) {
                            return relativePath(TRACKER_LIB_DIRECTORY_SRC_PATH, steps);
                        },
                        tracker(steps) {
                            return relativePath(TRACKER_LIB_SRC_PATH, steps);
                        },
                        model: {
                            directory(steps) {
                                return relativePath(TRACKER_LIB_MODEL_SRC_PATH, steps);
                            },
                            model1(steps) {
                                return relativePath(TRACKER_LIB_MODEL1_SRC_PATH, steps);
                            },
                            model2(steps) {
                                return relativePath(TRACKER_LIB_MODEL2_SRC_PATH, steps);
                            },
                            model3(steps) {
                                return relativePath(TRACKER_LIB_MODEL3_SRC_PATH, steps);
                            },
                            model4(steps) {
                                return relativePath(TRACKER_LIB_MODEL4_SRC_PATH, steps);
                            },
                            model5(steps) {
                                return relativePath(TRACKER_LIB_MODEL5_SRC_PATH, steps);
                            },
                            model6(steps) {
                                return relativePath(TRACKER_LIB_MODEL6_SRC_PATH, steps);
                            }
                        }
                    },
                },
                entry(steps) {
                    return relativePath(ENTRY_PATH, steps);
                },
                manifestJS(steps) {
                    return relativePath(MANIFEST_JS_SRC_PATH, steps);
                },
                favicon(steps) {
                    return relativePath(FAVICON_SRC_PATH, steps);
                },
                indexHtmlJS(steps) {
                    return relativePath(INDEX_HTML_JS_SRC_PATH, steps);
                },
                sharedCssJS(steps) {
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
//# sourceMappingURL=Resource.js.map