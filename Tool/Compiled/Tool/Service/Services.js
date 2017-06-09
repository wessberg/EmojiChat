import { WaitOperations } from "../../Common/Service/WaitOperations/WaitOperations";
import { ColorOperations } from "../../Common/Service/ColorOperations/ColorOperations";
import { StyleGuide } from "../../StyleGuide/StyleGuide";
import { FileLoader } from "@wessberg/fileloader";
import { FileSaver } from "@wessberg/filesaver";
import { TypeDetector } from "@wessberg/typedetector";
import { Marshaller } from "@wessberg/marshaller";
import { Iteration } from "@wessberg/iteration";
export const waitOperations = new WaitOperations();
export const colorUtil = new ColorOperations();
export const styleGuide = StyleGuide;
export const fileLoader = new FileLoader();
export const fileSaver = new FileSaver();
export const typeDetector = new TypeDetector();
export const marshaller = new Marshaller(typeDetector);
export const iteration = new Iteration();
//# sourceMappingURL=Services.js.map