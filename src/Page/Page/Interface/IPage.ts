import {IComponent} from "../../../Component/Component/IComponent";
import {IPathChangeSubscriber} from "../../../Discriminator/PathChangeSubscriber/Interface/IPathChangeSubscriber";

export interface IPage extends IComponent, IPathChangeSubscriber {
}

export interface IPageConstructor {
	routeName: RegExp;
	new (): IPage;
	testRoute (path: string): boolean;
}