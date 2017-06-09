import { minify } from "html-minifier";
export function minifyHTML(html) {
    return minify(html, {
        minifyCSS: true,
        minifyJS: true,
        removeComments: true,
        collapseWhitespace: true
    });
}
//# sourceMappingURL=HTMLMinifier.js.map