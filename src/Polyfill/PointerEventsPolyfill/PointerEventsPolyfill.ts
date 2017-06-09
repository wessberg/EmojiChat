import {IPolyfill} from "../Interface/IPolyfill";
import {GlobalObject} from "@wessberg/globalobject";
import {Resource} from "../../../Resource/Resource";

export const PointerEventsPolyfill: IPolyfill = {
	path: Resource.app.path.dist.polyfill.pointerEvents(1),
	condition: !("PointerEvent" in GlobalObject)
};