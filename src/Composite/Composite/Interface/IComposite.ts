import {IComponent} from "../../../Component/Component/IComponent";
import {ITargetListener} from "../../../Discriminator/TargetListener/Interface/ITargetListener";
import {ITargetable} from "../../../Discriminator/Targetable/Interface/ITargetable";

export interface IComposite extends IComponent, ITargetListener, ITargetable {
	actionTarget?: HTMLElement|null;
}