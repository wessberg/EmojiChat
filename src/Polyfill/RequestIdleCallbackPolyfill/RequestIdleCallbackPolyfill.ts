import {IPolyfill} from "../Interface/IPolyfill";
import {GlobalObject} from "@wessberg/globalobject";
import {Resource} from "../../../Resource/Resource";

export const RequestIdleCallbackPolyfill: IPolyfill = {
	path: Resource.app.path.dist.polyfill.requestIdleCallback(1),
	condition: !("requestIdleCallback" in GlobalObject)
};