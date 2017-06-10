import "./Loader";
import {agentDetector, globalEventBlocker} from "./Service/Services";
import {SvgIconUtil} from "./Service/SvgIconUtil/SvgIconUtil";
import {MENU, MICROPHONE_FILL, MICROPHONE_OFF, PEOPLE_FILL, REVERSE_CAMERA_FILL, SETTINGS} from "./Asset/Icon/Standard/MaterialIcons";
import "./Frame/Frame/Frame";

// Set up icons
SvgIconUtil.addIcons([MENU, PEOPLE_FILL, SETTINGS, MICROPHONE_FILL, MICROPHONE_OFF, REVERSE_CAMERA_FILL]);

// Block undesirable global events
globalEventBlocker.block("dragstart");
if (agentDetector.isMobile) globalEventBlocker.block("contextmenu");