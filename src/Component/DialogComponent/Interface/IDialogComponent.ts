import {IModalComponent} from "../../ModalComponent/Interface/IModalComponent";

export interface IDialogComponent extends IModalComponent {
	dismissable: boolean;
}