import * as tslib_1 from "tslib";
import { join } from "path";
import { Resource } from "../../../../Resource/Resource";
import { html } from "../../../../src/index.html";
import { fileLoader, fileSaver, styleGuide } from "../../../Service/Services";
import { Config } from "@wessberg/environment";
import { minifyHTML } from "../Util/HTMLMinifier/HTMLMinifier";
let isHandling = false;
let rollupOptions;
export default function IndexHTMLUpgrader() {
    return {
        name: "IndexHTMLUpgrader",
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
                    const DESTINATION = join(__dirname, Resource.app.path.dist.indexHtml(-5));
                    const updatedHtml = html(Resource.app, styleGuide);
                    const minified = Config.PRODUCTION ? minifyHTML(updatedHtml) : updatedHtml;
                    const exists = yield fileLoader.exists(DEST_DIR);
                    if (!exists) {
                        yield fileSaver.makeDirectory(DEST_DIR);
                    }
                    yield fileSaver.save(DESTINATION, `<!DOCTYPE html>${minified}`);
                }));
                return null;
            });
        }
    };
}
//# sourceMappingURL=IndexHTMLUpgrader.js.map