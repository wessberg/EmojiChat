import {IFeedbackComposite} from "../../FeedbackComposite/Interface/IFeedbackComposite";

export interface IRippleComposite extends IFeedbackComposite {
	animateOneShot (ripple?: HTMLDivElement|null): Promise<void>;
}