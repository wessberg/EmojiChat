import {IPolyfill} from "../Interface/IPolyfill";
import {Resource} from "../../../Resource/Resource";

export const WebAnimationsPolyfill: IPolyfill = {
	path: Resource.app.path.dist.polyfill.webAnimations(1),
	condition: !(typeof document.head.animate === "function")
};