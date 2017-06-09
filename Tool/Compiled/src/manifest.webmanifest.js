import { colorUtil } from "../Tool/Service/Services";
export const manifest = (manifest, styleGuide) => `
	{
		"lang": "${manifest.language}",
		"dir": "${manifest.direction}",
		"name": "${manifest.title}",
		"start_url": "${manifest.startUrl}",
		"description": "${manifest.description}",
		"short_name": "${manifest.shortName}",
		"display": "${manifest.display}",
		"orientation": "${manifest.orientation}",
		"theme_color": "${colorUtil.toHex(`rgb(${styleGuide.color.primaryRGB})`)}",
		"background_color": "${colorUtil.toHex(`rgb(${styleGuide.color.backgroundRGB})`)}"
}
`;
//# sourceMappingURL=manifest.webmanifest.js.map