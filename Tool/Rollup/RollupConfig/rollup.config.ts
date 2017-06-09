import nodeResolve from "rollup-plugin-node-resolve";
import babili from "rollup-plugin-babili";
import typescriptPlugin from "rollup-plugin-typescript2";
import EnvironmentPlugin from "@wessberg/rollup-plugin-environment";
import {DevServer} from "../../DevServer/DevServer";
import gzip from "rollup-plugin-gzip";
import {Config, Environment} from "@wessberg/environment";
import {IRollupPlugin} from "./Interface/IRollupConfig";
import Styler from "../Plugin/Styler/Styler";
import IndexHTMLUpgrader from "../Plugin/IndexHTMLUpgrader/IndexHTMLUpgrader";
import AssetUpgrader from "../Plugin/AssetUpgrader/AssetUpgrader";
import ManifestUpgrader from "../Plugin/ManifestUpgrader/ManifestUpgrader";
import SharedCSSUpgrader from "../Plugin/SharedCSSUpgrader/SharedCSSUpgrader";
import {Resource} from "../../../Resource/Resource";
import {join} from "path";
import {DevServerResource} from "../../../Resource/DevServerResource";

const STEP_UP = "../";
const STEPS_UP = STEP_UP.repeat(5);
const fromRoot = (path: string) => join(__dirname, STEPS_UP, path);

// These plugins will only be used in the production environment.
const PRODUCTION_PLUGINS: IRollupPlugin[] = Config.PRODUCTION ? [
	{
		order: 0,
		plugin: Styler()
	},
	{
		order: 4,
		plugin: babili({
			comments: false,

			evaluate: true,
			deadcode: true,
			infinity: true,
			mangle: true,
			numericLiterals: true,
			replace: true,
			simplify: true,
			mergeVars: true,
			booleans: true,
			regexpConstructors: true,
			removeConsole: true,
			removeDebugger: true,
			removeUndefined: true,
			undefinedToVoid: true
		})
	},
	{
		order: 5,
		plugin: gzip({
			options: {
				level: 9
			},
			additional: [
				fromRoot(Resource.app.path.dist.manifest()),
				fromRoot(Resource.app.path.dist.favicon()),
				fromRoot(Resource.app.path.dist.indexHtml()),
				fromRoot(Resource.app.path.dist.polyfill.webAnimations()),
				fromRoot(Resource.app.path.dist.polyfill.pointerEvents()),
				fromRoot(Resource.app.path.dist.sharedCss())
			]
		})
	}
] : [];

// These plugins will always be used.
const BASE_PLUGINS: IRollupPlugin[] = [
	{
		order: 1,
		// Inject environment variables into the bundle.
		plugin: EnvironmentPlugin()
	},
	{
		order: 2,
		plugin: typescriptPlugin(<any>{
			tsconfig: fromRoot("tsconfig.json"),
			include: [fromRoot("*.ts+(|x)"), fromRoot("**/*.ts+(|x)")],
			exclude: [fromRoot("*.d.ts"), fromRoot("**/*.d.ts")],
			cacheRoot: "./.rts2_cache"
		})
	},
	{
		order: 3,
		// Inline module dependencies
		plugin: nodeResolve({
			module: true,
			jsnext: true,
			browser: true,
			main: true
		})
	},
	{
		order: 6,
		plugin: IndexHTMLUpgrader()
	},
	{
		order: 7,
		plugin: ManifestUpgrader()
	},
	{
		order: 8,
		plugin: AssetUpgrader()
	},
	{
		order: 9,
		plugin: SharedCSSUpgrader()
	}
];

// Sort the plugins by order
const sortPlugins = (a: IRollupPlugin, b: IRollupPlugin) => {
	if (a.order < b.order) return -1;
	if (a.order > b.order) return 1;
	return 0;
};

async function serve (): Promise<void> {
	const {key, cert} = DevServerResource.tls;
	if (key == null || cert == null) throw new ReferenceError(`No key or certificate was found. Couldn't serve via TLS!`);

	const devServer = new DevServer(
		fromRoot(Resource.app.path.dist.directory()),
		DevServerResource.meta.host,
		DevServerResource.meta.port,
		key,
		cert
	);

	try {
		await devServer.listen();
	} catch (e) {
		// Server is already running.
	}
}

if (Environment.SERVE) serve().then();

// Sort the plugins by order and take only the plugins from the nested objects.
const PLUGINS = [...BASE_PLUGINS, ...PRODUCTION_PLUGINS]
	.sort(sortPlugins)
	.map(plugin => plugin.plugin);

export default {
	entry: fromRoot(Resource.app.path.src.entry()),
	dest: fromRoot(Resource.app.path.dist.bundle()),
	moduleName: Resource.app.meta.title,
	format: Resource.build.format,
	sourceMap: Resource.build.sourceMap,
	plugins: PLUGINS,
	treeshake: Resource.build.treeshake
};