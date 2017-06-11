import {IComponent} from "../../Component/IComponent";

export interface IMediaComponent extends IComponent {
	loaded: boolean;
	loading: boolean;
	cover: boolean;
	contained: boolean;
	src: string|null;
	load (): Promise<void>;
	unload (): Promise<void>;
}