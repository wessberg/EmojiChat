import {PointerEventsPolyfill} from "./PointerEventsPolyfill/PointerEventsPolyfill";
import {WebAnimationsPolyfill} from "./WebAnimationsPolyfill/WebAnimationsPolyfill";
import {addScript} from "../Loader";
import {RequestIdleCallbackPolyfill} from "./RequestIdleCallbackPolyfill/RequestIdleCallbackPolyfill";

function loadPolyfills (): void {
	if (PointerEventsPolyfill.condition) addScript(PointerEventsPolyfill.path).then();
	if (WebAnimationsPolyfill.condition) addScript(WebAnimationsPolyfill.path).then();
	if (RequestIdleCallbackPolyfill.condition) addScript(RequestIdleCallbackPolyfill.path).then();
}

loadPolyfills();