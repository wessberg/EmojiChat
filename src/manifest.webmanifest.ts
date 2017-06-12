import {IAppResource} from "../Resource/Interface/IResource";
import {IStyleGuide} from "../StyleGuide/Interface/IStyleGuide";
import {colorUtil} from "../Tool/Service/Services";

export const manifest = (appResource: IAppResource, styleGuide: IStyleGuide) => `
	{
		"lang": "${appResource.meta.language}",
		"dir": "${appResource.meta.direction}",
		"name": "${appResource.meta.title}",
		"start_url": "${appResource.meta.startUrl}",
		"description": "${appResource.meta.description}",
		"short_name": "${appResource.meta.shortName}",
		"display": "${appResource.meta.display}",
		"orientation": "${appResource.meta.orientation}",
		"theme_color": "${colorUtil.toHex(`rgb(${styleGuide.color.primaryRGB})`)}",
		"background_color": "${colorUtil.toHex(`rgb(${styleGuide.color.backgroundRGB})`)}",
		"icons": [
        {
            "src": "${appResource.path.dist.asset.image.manifest.androidChrome192x192(1)}",
            "sizes": "192x192",
            "type": "image/png"
        },
        {
            "src": "${appResource.path.dist.asset.image.manifest.androidChrome512x512(1)}",
            "sizes": "512x512",
            "type": "image/png"
        }
    ]
}
`;