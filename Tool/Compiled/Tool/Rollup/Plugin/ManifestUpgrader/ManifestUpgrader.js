import * as tslib_1 from "tslib";
import { join } from "path";
import { fileLoader, fileSaver, styleGuide } from "../../../Service/Services";
import { manifest } from "../../../../src/manifest.webmanifest";
import { Resource } from "../../../../Resource/Resource";
let isHandling = false;
let rollupOptions;
export default function ManifestUpgrader() {
    return {
        name: "ManifestUpgrader",
        options(opts) {
            rollupOptions = opts;
        },
        onwrite() {
            isHandling = false;
        },
        transform() {
            return tslib_1.__awaiter(this, void 0, void 0, function* () {
                if (isHandling)
                    return null;
                isHandling = true;
                setTimeout(() => tslib_1.__awaiter(this, void 0, void 0, function* () {
                    const DEST_DIR = join(__dirname, Resource.app.path.dist.directory(-5));
                    const DESTINATION = join(__dirname, Resource.app.path.dist.manifest(-5));
                    const updatedManifest = manifest(Resource.app.meta, styleGuide);
                    const exists = yield fileLoader.exists(DEST_DIR);
                    if (!exists) {
                        yield fileSaver.makeDirectory(DEST_DIR);
                    }
                    yield fileSaver.save(DESTINATION, updatedManifest);
                }));
                return null;
            });
        }
    };
}
//# sourceMappingURL=ManifestUpgrader.js.map