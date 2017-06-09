import {IComponent} from "../../../Component/Component/IComponent";

export interface IFrame extends IComponent {
}

export interface IFrameConstructor {
	new (): IFrame;
}