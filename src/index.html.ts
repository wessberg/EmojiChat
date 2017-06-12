import {IAppResource} from "../Resource/Interface/IResource";
import {IStyleGuide} from "../StyleGuide/Interface/IStyleGuide";
import {colorUtil} from "../Tool/Service/Services";
import {fallback} from "./index.fallback.html";

export const html =
// language=HTML
	(resource: IAppResource, styleGuide: IStyleGuide) => `
	<html lang="${resource.meta.language}">
		<head>
			<meta charset="UTF-8">
			<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
			<meta name="mobile-web-app-capable" content="yes">
			<meta name="apple-mobile-web-app-status-bar-style" content="white">
			<meta name="theme-color" content="${colorUtil.toHex(`rgb(${styleGuide.color.backgroundRGB})`)}">
			<link rel="manifest" href="${resource.path.dist.manifest(1)}">
			
			<title>${resource.meta.title}</title>
			<style>
	    html, body {
            -ms-overflow-style: auto;
            -webkit-touch-callout: none !important;
            overflow: hidden;
        }

        html {
            overflow: hidden;
            height: 100%;
        }

        body {
            background-color: rgb(${styleGuide.color.backgroundRGB});
            margin: 0;
            padding: 0;
        }
				</style>
		</head>
		<body>
			<script type="text/javascript">
				// Check for browser support
				if (!('attachShadow' in Element.prototype && 'getRootNode' in Element.prototype) || (!window.customElements || window.customElements.forcePolyfill)) {
					document.body.innerHTML = \`${fallback()}\`; 
				} else {
					const isMobile = /(android|bb\\d+|meego).+mobile|avantgo|bada\\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(navigator.userAgent);
					const script = document.createElement("script");
					const src = \`index.$\{isMobile ? "mobile" : "desktop"}.js\`;
					script.src = src;
					document.head.appendChild(script);
					script.onload = () => document.body.appendChild(document.createElement("frame-element"));
				}
			</script>
		</body>
	</html>
`;