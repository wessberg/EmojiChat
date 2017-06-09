import {PointerEventsPolyfill} from "./PointerEventsPolyfill/PointerEventsPolyfill";
import {IPolyfill} from "./Interface/IPolyfill";
import {WebAnimationsPolyfill} from "./WebAnimationsPolyfill/WebAnimationsPolyfill";

const getScript = (): HTMLScriptElement => {
	const script = <HTMLScriptElement> document.createElement("script");
	script.type = "text/javascript";
	script.defer = true;
	return script;
};

function addPolyfill (source: IPolyfill): void {
	const script = getScript();
	script.src = source.path;
	document.head.appendChild(script);
}

function loadPolyfills (): void {
	if (PointerEventsPolyfill.condition) addPolyfill(PointerEventsPolyfill);
	if (WebAnimationsPolyfill.condition) addPolyfill(WebAnimationsPolyfill);
}

loadPolyfills();