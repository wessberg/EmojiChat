import "./Loader";
import {agentDetector, globalEventBlocker} from "./Service/Services";
import {SvgIconUtil} from "./Service/SvgIconUtil/SvgIconUtil";
import {CALENDAR_FILL, CAMERA_FILL, CLOSE, DOWNLOAD_FILL, IMAGE, MENU, MICROPHONE_FILL, MICROPHONE_OFF, PEOPLE_FILL, REVERSE_CAMERA_FILL, SEND_FILL, VIDEO_CAMERA_FILL} from "./Asset/Icon/Standard/MaterialIcons";
import "./Frame/Frame/Frame";
import {ANGRY_EMOJI, DISGUSTED_EMOJI, FEAR_EMOJI, HAPPY_EMOJI, NEUTRAL_EMOJI, SAD_EMOJI, SURPRISED_EMOJI} from "./Asset/Icon/Emoji/EmojiIcons";
import {EMOJI_PEOPLE} from "./Asset/Icon/Product/ProductIcons";

// Set up icons
SvgIconUtil.addIcons([MENU, PEOPLE_FILL, MICROPHONE_FILL, MICROPHONE_OFF, REVERSE_CAMERA_FILL, CLOSE, HAPPY_EMOJI, SAD_EMOJI, ANGRY_EMOJI, FEAR_EMOJI, SURPRISED_EMOJI, DISGUSTED_EMOJI, NEUTRAL_EMOJI, VIDEO_CAMERA_FILL, CAMERA_FILL, SEND_FILL, DOWNLOAD_FILL, IMAGE, CALENDAR_FILL, EMOJI_PEOPLE]);

// Block undesirable global events
globalEventBlocker.block("dragstart");
if (agentDetector.isMobile) globalEventBlocker.block("contextmenu");