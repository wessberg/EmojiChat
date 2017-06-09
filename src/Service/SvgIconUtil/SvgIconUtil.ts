import {ISvgIconUtil} from "./Interface/ISvgIconUtil";
import {IIcon} from "../../Asset/Icon/Interface/IIcon";

export class SvgIconUtil implements ISvgIconUtil {
	private static readonly seenIcons: Map<string, IIcon> = new Map();

	public static addIcon (icon: IIcon): void {
		SvgIconUtil.seenIcons.set(icon.selector, icon);
	}

	public static addIcons (icons: IIcon[]): void {
		icons.map(icon => this.addIcon(icon));
	}

	public buildIconFromName (iconName: string): SVGElement {
		const icon = SvgIconUtil.seenIcons.get(iconName);
		if (icon == null) throw new ReferenceError(`No icon was found for selector: ${iconName}`);
		return this.buildSvgIcon(icon);
	}

	private buildSvgIcon (icon: IIcon): SVGElement {
		const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
		const content = document.createElementNS("http://www.w3.org/2000/svg", "g");
		content.innerHTML = icon.template;
		content.setAttribute("viewBox", icon.viewBox);
		svg.setAttribute("viewBox", icon.viewBox);
		svg.setAttribute("preserveAspectRatio", "xMidYMid meet");
		svg.style.cssText = "pointer-events: none; display: block; width: 100%; height: 100%;";
		svg.appendChild(content);
		return svg;
	}

}