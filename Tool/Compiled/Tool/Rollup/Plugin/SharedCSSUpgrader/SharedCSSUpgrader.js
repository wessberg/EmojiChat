import * as tslib_1 from "tslib";
import { join } from "path";
import { CSSTranspiler } from "../Util/PostCSS/PostCSS";
import { fileLoader, fileSaver, styleGuide } from "../../../Service/Services";
import { sharedCss } from "../../../../src/shared.css";
import { Resource } from "../../../../Resource/Resource";
let isHandling = false;
let rollupOptions;
export default function SharedCSSUpgrader() {
    return {
        name: "SharedCSSUpgrader",
        options(opts) {
            rollupOptions = opts;
        },
        onwrite() {
            isHandling = false;
        },
        transform(_, id) {
            return tslib_1.__awaiter(this, void 0, void 0, function* () {
                if (isHandling)
                    return null;
                isHandling = true;
                setTimeout(() => tslib_1.__awaiter(this, void 0, void 0, function* () {
                    const DEST_DIR = join(__dirname, Resource.app.path.dist.directory(-5));
                    const DESTINATION = join(__dirname, Resource.app.path.dist.sharedCss(-5));
                    const updatedSharedCSS = sharedCss(styleGuide);
                    const { css } = yield CSSTranspiler.process(updatedSharedCSS, { from: id, to: id });
                    const exists = yield fileLoader.exists(DEST_DIR);
                    if (!exists) {
                        yield fileSaver.makeDirectory(DEST_DIR);
                    }
                    yield fileSaver.save(DESTINATION, css);
                }));
                return null;
            });
        }
    };
}
//# sourceMappingURL=SharedCSSUpgrader.js.map