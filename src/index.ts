import "./Loader";
import {agentDetector, globalEventBlocker} from "./Service/Services";
import {SvgIconUtil} from "./Service/SvgIconUtil/SvgIconUtil";
import {CLOSE, MENU, MICROPHONE_FILL, MICROPHONE_OFF, PEOPLE_FILL, REVERSE_CAMERA_FILL, SETTINGS, VIDEO_CAMERA_FILL} from "./Asset/Icon/Standard/MaterialIcons";
import "./Frame/Frame/Frame";
import {ANGRY_EMOJI, DISGUSTED_EMOJI, FEAR_EMOJI, HAPPY_EMOJI, NEUTRAL_EMOJI, SAD_EMOJI, SURPRISED_EMOJI} from "./Asset/Icon/Emoji/EmojiIcons";

// Set up icons
SvgIconUtil.addIcons([MENU, PEOPLE_FILL, SETTINGS, MICROPHONE_FILL, MICROPHONE_OFF, REVERSE_CAMERA_FILL, CLOSE, HAPPY_EMOJI, SAD_EMOJI, ANGRY_EMOJI, FEAR_EMOJI, SURPRISED_EMOJI, DISGUSTED_EMOJI, NEUTRAL_EMOJI, VIDEO_CAMERA_FILL]);

// Block undesirable global events
globalEventBlocker.block("dragstart");
if (agentDetector.isMobile) globalEventBlocker.block("contextmenu");