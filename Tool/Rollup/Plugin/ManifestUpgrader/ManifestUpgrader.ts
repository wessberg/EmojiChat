import {IRollupOptions} from "../Interface/IRollupPluginOptions";
import {join} from "path";
import {fileLoader, fileSaver, styleGuide} from "../../../Service/Services";
import {manifest} from "../../../../src/manifest.webmanifest";
import {Resource} from "../../../../Resource/Resource";

let isHandling: boolean = false;
let rollupOptions: IRollupOptions;

export default function ManifestUpgrader () {

	return {
		name: "ManifestUpgrader",

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
				const DESTINATION = join(__dirname, Resource.app.path.dist.manifest(-5));

				const updatedManifest = manifest(Resource.app.meta, styleGuide);
				const exists = await fileLoader.exists(DEST_DIR);

				if (!exists) {
					await fileSaver.makeDirectory(DEST_DIR);
				}
				await fileSaver.save(DESTINATION, updatedManifest);
			});
			return null;
		}
	};
}