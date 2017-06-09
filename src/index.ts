import "./Polyfill/Loader";
import "./Frame/Frame/Frame";
import {agentDetector, globalEventBlocker} from "./Service/Services";
import {SvgIconUtil} from "./Service/SvgIconUtil/SvgIconUtil";
import {MENU} from "./Asset/Icon/Standard/MaterialIcons";

// Set up icons
SvgIconUtil.addIcons([MENU]);

// Block undesirable global events
globalEventBlocker.block("dragstart");
if (agentDetector.isMobile) globalEventBlocker.block("contextmenu");