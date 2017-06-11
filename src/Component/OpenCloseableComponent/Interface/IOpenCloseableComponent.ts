import {IComponent} from "../../Component/IComponent";
import {IVisibleable} from "../../../Discriminator/Visibleable/Interface/IVisibleable";

export interface IOpenCloseableComponent extends IComponent, IVisibleable {
	open (): void;
	close (): void;
}