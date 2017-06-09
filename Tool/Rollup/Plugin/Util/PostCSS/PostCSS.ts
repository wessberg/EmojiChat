import {Config} from "@wessberg/environment";
import PostCSS from "postcss";
import CSSRemoveHover from "postcss-hover";
import CSSNext from "postcss-cssnext";
import CSSNano from "cssnano";

const extraPlugins = Config.MOBILE ? [CSSRemoveHover] : [];
const basePlugins = [CSSNext({warnForDuplicates: false})];
const productionPlugins = Config.PRODUCTION ? [CSSNano] : [];
export const CSSTranspiler = PostCSS([...extraPlugins, ...basePlugins, ...productionPlugins]);