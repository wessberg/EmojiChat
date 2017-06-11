import {IOpenCloseableComponent} from "../../OpenCloseableComponent/Interface/IOpenCloseableComponent";

export interface ISnackbarAnimationOptions {
	duration: number;
	easing: string;
	height: number;
	delay: number;
}

export interface ISnackbarComponent extends IOpenCloseableComponent {

}