import {minify} from "html-minifier";

export function minifyHTML (html: string): string {
	return minify(html, {
		minifyCSS: true,
		minifyJS: true,
		removeComments: true,
		collapseWhitespace: true
	});
}