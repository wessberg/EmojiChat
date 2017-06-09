import {IRollupOptions} from "../Interface/IRollupPluginOptions";
import {dirname, extname, join} from "path";
import {Resource} from "../../../../Resource/Resource";
import {IStaticAsset} from "../../../../Resource/Interface/IResource";
import {fileLoader, fileSaver, iteration} from "../../../Service/Services";

let isHandling: boolean = false;
let rollupOptions: IRollupOptions;

async function handleAssets (): Promise<void> {
	await iteration.forEachParallel(Resource.build.staticAssets, handleAsset);
}

async function handleAsset (asset: IStaticAsset): Promise<void> {
	const from = join(__dirname, asset.from(-5));
	const to = join(__dirname, asset.to(-5));
	await handlePaths(from, to);
}

async function handlePaths (from: string, to: string): Promise<void> {
	if (extname(from) === "") {
		// It is a directory
		await handleDirectory(from, to);
	} else {
		await handleFile(from, to);
	}
}

async function handleDirectory (from: string, to: string): Promise<void> {
	await fileSaver.makeDirectory(to);
	const fileNames = await fileLoader.getFilesInDirectory(from);
	await iteration.forEachParallel(fileNames, async fileName => {
		const fromPath = join(from, fileName);
		const toPath = join(to, fileName);
		await handlePaths(fromPath, toPath);
	});
}

async function handleFile (from: string, to: string): Promise<void> {
	const buffer = await fileLoader.load(from);
	await fileSaver.makeDirectory(dirname(to));
	await fileSaver.save(to, buffer);
}

export default function AssetUpgrader () {

	return {
		name: "AssetUpgrader",

		options (opts: IRollupOptions): void {
			rollupOptions = opts;
		},

		onwrite (): void {
			isHandling = false;
		},

		async transform (): Promise<null> {
			if (isHandling) return null;
			isHandling = true;

			setTimeout(async () => await handleAssets());
			return null;
		}
	};
}