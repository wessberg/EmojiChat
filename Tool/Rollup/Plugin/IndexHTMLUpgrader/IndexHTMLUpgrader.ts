import {IRollupOptions} from "../Interface/IRollupPluginOptions";
import {join} from "path";
import {Resource} from "../../../../Resource/Resource";
import {html} from "../../../../src/index.html";
import {fileLoader, fileSaver, styleGuide} from "../../../Service/Services";
import {Config} from "@wessberg/environment";
import {minifyHTML} from "../Util/HTMLMinifier/HTMLMinifier";

let isHandling: boolean = false;
let rollupOptions: IRollupOptions;

export default function IndexHTMLUpgrader () {

	return {
		name: "IndexHTMLUpgrader",

		options (opts: IRollupOptions): void {
			rollupOptions = opts;
		},

		onwrite (): void {
			isHandling = false;
		},

		async transform (): Promise<null> {
			if (isHandling) return null;
			isHandling = true;
			setTimeout(async () => {
				const DEST_DIR = join(__dirname, Resource.app.path.dist.directory(-5));
				const DESTINATION = join(__dirname, Resource.app.path.dist.indexHtml(-5));

				const updatedHtml = html(Resource.app, styleGuide);
				const minified = Config.PRODUCTION ? minifyHTML(updatedHtml) : updatedHtml;

				const exists = await fileLoader.exists(DEST_DIR);

				if (!exists) {
					await fileSaver.makeDirectory(DEST_DIR);
				}
				await fileSaver.save(DESTINATION, `<!DOCTYPE html>${minified}`);
			});
			return null;
		}
	};
}