import {INavigationData} from "../../../Service/NavigationUtil/Interface/INavigationUtil";

export interface IPathChangeSubscriber {
	didBecomeVisible (data?: INavigationData): Promise<void>;
	didBecomeInvisible (): Promise<void>;
}