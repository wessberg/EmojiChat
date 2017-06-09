import { colorUtil } from "../Tool/Service/Services";
export const html = 
// language=HTML
(resource, styleGuide) => `
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
			<script type="text/javascript" src="${resource.path.dist.bundle(1)}"></script>
			<frame-element></frame-element>
		</body>
	</html>
`;
//# sourceMappingURL=index.html.js.map