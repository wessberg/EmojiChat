import {IRollupOptions} from "../Interface/IRollupPluginOptions";
import {join} from "path";
import {CSSTranspiler} from "../Util/PostCSS/PostCSS";
import {fileLoader, fileSaver, styleGuide} from "../../../Service/Services";
import {sharedCss} from "../../../../src/shared.css";
import {Resource} from "../../../../Resource/Resource";

let isHandling: boolean = false;
let rollupOptions: IRollupOptions;

export default function SharedCSSUpgrader () {

	return {
		name: "SharedCSSUpgrader",

		options (opts: IRollupOptions): void {
			rollupOptions = opts;
		},

		onwrite (): void {
			isHandling = false;
		},

		async transform (_: string, id: string): Promise<null> {
			if (isHandling) return null;
			isHandling = true;
			setTimeout(async () => {
				const DEST_DIR = join(__dirname, Resource.app.path.dist.directory(-5));
				const DESTINATION = join(__dirname, Resource.app.path.dist.sharedCss(-5));

				const updatedSharedCSS = sharedCss(styleGuide);
				const {css} = await CSSTranspiler.process(updatedSharedCSS, {from: id, to: id});
				const exists = await fileLoader.exists(DEST_DIR);

				if (!exists) {
					await fileSaver.makeDirectory(DEST_DIR);
				}
				await fileSaver.save(DESTINATION, css);
			});
			return null;
		}
	};
}