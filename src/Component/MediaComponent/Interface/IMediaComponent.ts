import {IComponent} from "../../Component/IComponent";

export interface IMediaComponent extends IComponent {
	load (): Promise<void>;
	unload (): Promise<void>;
}