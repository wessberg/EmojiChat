import {IPage} from "../../Page/Interface/IPage";
import {IChildMutationObserverConsumer} from "../../../Discriminator/ChildMutationObserverConsumer/Interface/IChildMutationObserverConsumer";

export interface IGalleryPage extends IPage, IChildMutationObserverConsumer {
}