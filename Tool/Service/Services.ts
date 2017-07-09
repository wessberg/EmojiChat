import {IWaitOperations} from "../../Common/Service/WaitOperations/Interface/IWaitOperations";
import {WaitOperations} from "../../Common/Service/WaitOperations/WaitOperations";
import {IColorOperations} from "../../Common/Service/ColorOperations/Interface/IColorOperations";
import {ColorOperations} from "../../Common/Service/ColorOperations/ColorOperations";
import {IStyleGuide} from "../../StyleGuide/Interface/IStyleGuide";
import {StyleGuide} from "../../StyleGuide/StyleGuide";
import {FileLoader, IFileLoader} from "@wessberg/fileloader";
import {FileSaver, IFileSaver} from "@wessberg/filesaver";
import {IIteration, Iteration} from "@wessberg/iteration";

export const waitOperations: IWaitOperations = new WaitOperations();
export const colorUtil: IColorOperations = new ColorOperations();
export const styleGuide: IStyleGuide = StyleGuide;
export const fileLoader: IFileLoader = new FileLoader();
export const fileSaver: IFileSaver = new FileSaver();
export const iteration: IIteration = new Iteration();