import * as tslib_1 from "tslib";
import { dirname, extname, join } from "path";
import { Resource } from "../../../../Resource/Resource";
import { fileLoader, fileSaver, iteration } from "../../../Service/Services";
let isHandling = false;
let rollupOptions;
function handleAssets() {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        yield iteration.forEachParallel(Resource.build.staticAssets, handleAsset);
    });
}
function handleAsset(asset) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const from = join(__dirname, asset.from(-5));
        const to = join(__dirname, asset.to(-5));
        yield handlePaths(from, to);
    });
}
function handlePaths(from, to) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        if (extname(from) === "") {
            // It is a directory
            yield handleDirectory(from, to);
        }
        else {
            yield handleFile(from, to);
        }
    });
}
function handleDirectory(from, to) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        yield fileSaver.makeDirectory(to);
        const fileNames = yield fileLoader.getFilesInDirectory(from);
        yield iteration.forEachParallel(fileNames, (fileName) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            const fromPath = join(from, fileName);
            const toPath = join(to, fileName);
            yield handlePaths(fromPath, toPath);
        }));
    });
}
function handleFile(from, to) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const buffer = yield fileLoader.load(from);
        yield fileSaver.makeDirectory(dirname(to));
        yield fileSaver.save(to, buffer);
    });
}
export default function AssetUpgrader() {
    return {
        name: "AssetUpgrader",
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
                setTimeout(() => tslib_1.__awaiter(this, void 0, void 0, function* () { return yield handleAssets(); }));
                return null;
            });
        }
    };
}
//# sourceMappingURL=AssetUpgrader.js.map