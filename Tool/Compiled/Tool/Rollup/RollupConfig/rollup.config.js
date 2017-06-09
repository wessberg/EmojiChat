import * as tslib_1 from "tslib";
import nodeResolve from "rollup-plugin-node-resolve";
import babili from "rollup-plugin-babili";
import typescriptPlugin from "rollup-plugin-typescript2";
import EnvironmentPlugin from "@wessberg/rollup-plugin-environment";
import { DevServer } from "../../DevServer/DevServer";
import gzip from "rollup-plugin-gzip";
import { Config, Environment } from "@wessberg/environment";
import Styler from "../Plugin/Styler/Styler";
import IndexHTMLUpgrader from "../Plugin/IndexHTMLUpgrader/IndexHTMLUpgrader";
import AssetUpgrader from "../Plugin/AssetUpgrader/AssetUpgrader";
import ManifestUpgrader from "../Plugin/ManifestUpgrader/ManifestUpgrader";
import SharedCSSUpgrader from "../Plugin/SharedCSSUpgrader/SharedCSSUpgrader";
import { Resource } from "../../../Resource/Resource";
import { join } from "path";
const STEP_UP = "../";
const STEPS_UP = STEP_UP.repeat(5);
const fromRoot = (path) => join(__dirname, STEPS_UP, path);
// These plugins will only be used in the production environment.
const PRODUCTION_PLUGINS = Config.PRODUCTION ? [
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
                fromRoot(Resource.app.path.dist.polyfill.pointerEvents())
            ]
        })
    }
] : [];
// These plugins will always be used.
const BASE_PLUGINS = [
    {
        order: 1,
        // Inject environment variables into the bundle.
        plugin: EnvironmentPlugin()
    },
    {
        order: 2,
        plugin: typescriptPlugin({
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
const sortPlugins = (a, b) => {
    if (a.order < b.order)
        return -1;
    if (a.order > b.order)
        return 1;
    return 0;
};
function serve() {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const { key, cert } = Resource.devServer.tls;
        if (Environment.TLS && (key == null || cert == null))
            throw new ReferenceError(`No key or certificate was found. Couldn't serve via TLS!`);
        const devServer = new DevServer(fromRoot(Resource.app.path.dist.directory()), Resource.devServer.meta.host, Resource.devServer.meta.port, Environment.TLS ? key : undefined, Environment.TLS ? cert : undefined);
        try {
            yield devServer.listen();
        }
        catch (e) {
            // Server is already running.
        }
    });
}
if (Environment.SERVE)
    serve().then();
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
//# sourceMappingURL=rollup.config.js.map