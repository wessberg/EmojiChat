import {BrowserKind} from "./Interface/BrowserKind";
import {IAgentDetector} from "./Interface/IAgentDetector";
import {NativePlatformKind} from "./Interface/NativePlatformKind";
import {GlobalObject} from "@wessberg/globalobject";

export class AgentDetector implements IAgentDetector {
	public readonly agent: string = (navigator == null || navigator.userAgent == null) ? "" : navigator.userAgent.toLowerCase();
	public readonly browser: BrowserKind = this.detectBrowser();
	public readonly isEdge: boolean = this.browser === BrowserKind.EDGE;
	public readonly isInternetExplorer: boolean = this.browser === BrowserKind.IE;
	public readonly isInternetExplorerOrEdge: boolean = this.isEdge || this.isInternetExplorer;
	public readonly isFirefox: boolean = this.browser === BrowserKind.FIREFOX;
	public readonly isFirefoxMobile: boolean = this.browser === BrowserKind.FIREFOX_MOBILE;
	public readonly isFirefoxOrFirefoxMobile: boolean = this.isFirefox || this.isFirefoxMobile;
	public readonly isSamsungInternet: boolean = this.browser === BrowserKind.SAMSUNG_INTERNET;
	public readonly isUCBrowser: boolean = this.browser === BrowserKind.UC_BROWSER;
	public readonly isChrome: boolean = this.browser === BrowserKind.CHROME;
	public readonly isSafari: boolean = this.browser === BrowserKind.SAFARI;
	public readonly isOpera: boolean = this.browser === BrowserKind.OPERA;
	public readonly isBlackberry: boolean = this.browser === BrowserKind.BLACKBERRY;
	public readonly isOperaMobile: boolean = this.browser === BrowserKind.OPERA_MOBILE;
	public readonly isIEMobile: boolean = this.browser === BrowserKind.IE_MOBILE;
	public readonly isOperaMini: boolean = this.browser === BrowserKind.OPERA_MINI;
	public readonly isNative: boolean = GlobalObject.cordova != null;
	public readonly isAndroidBrowser: boolean = this.browser === BrowserKind.ANDROID_STOCK && !this.isNative;
	public readonly isMobile = this.isNative || /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(navigator.userAgent);
	public readonly nativePlatform: NativePlatformKind|null = this.detectNativePlatform();
	public readonly isIOSDevice: boolean = this.isIOSAgent() || this.nativePlatform === NativePlatformKind.IOS;
	public readonly isIPhoneDevice: boolean = /iphone|ipod/i.test(this.agent);
	public readonly isIPadDevice: boolean = /ipad/i.test(this.agent);
	public readonly isSafariOnDesktop: boolean = this.browser === BrowserKind.SAFARI && !this.isMobile;
	public readonly isSafariOnMobile: boolean = this.isMobile && !this.isNative && this.browser === BrowserKind.SAFARI;
	public readonly isNativeIOS: boolean = this.nativePlatform === NativePlatformKind.IOS;
	public readonly isNativeAndroid: boolean = this.nativePlatform === NativePlatformKind.ANDROID;
	public readonly isAndroidDevice: boolean = this.isNativeAndroid || this.agent.includes("android");
	public readonly isAppleDevice: boolean = this.isNativeIOS || this.browser === BrowserKind.SAFARI;
	public readonly isDesktopDevice: boolean = !this.isMobile;
	public readonly isWebkitBrowser: boolean = this.agent.includes("applewebkit");
	public readonly iOSVersion: number = this.isIOSDevice ? this.detectIOSVersion() : -1;
	public readonly IEVersion: number = this.isInternetExplorer ? this.detectIEVersion() : -1;
	public readonly chromeVersion: number = this.isChrome ? this.detectChromeVersion() : -1;
	public readonly firefoxVersion: number = this.isFirefox ? this.detectFirefoxVersion() : -1;
	public readonly safariVersion: number = this.isSafari ? this.detectSafariVersion() : -1;
	public readonly edgeVersion: number = this.isEdge ? this.detectEdgeVersion() : -1;
	public readonly operaVersion: number = this.isOpera ? this.detectOperaVersion() : -1;
	public readonly operaMiniVersion: number = this.isOperaMini ? this.detectOperaMiniVersion() : -1;
	public readonly operaMobileVersion: number = this.isOperaMobile ? this.detectOperaMobileVersion() : -1;
	public readonly androidVersion: number = this.isAndroidDevice ? this.detectAndroidVersion() : -1;
	public readonly samsungInternetVersion: number = this.isSamsungInternet ? this.detectSamsungInternetVersion() : -1;
	public readonly firefoxMobileVersion: number = this.isFirefoxMobile ? this.detectFirefoxMobileVersion() : -1;
	public readonly UCBrowserVersion: number = this.isFirefoxMobile ? this.detectUCBrowserVersion() : -1;
	public readonly IEMobileVersion: number = this.isIEMobile ? this.detectIEMobileVersion() : -1;
	public readonly browserVersion: number = (() => {
		if (this.isIOSDevice) return this.iOSVersion;
		if (this.isInternetExplorer) return this.IEVersion;
		if (this.isChrome) return this.chromeVersion;
		if (this.isFirefox) return this.firefoxVersion;
		if (this.isSafari) return this.safariVersion;
		if (this.isEdge) return this.edgeVersion;
		if (this.isOpera) return this.operaVersion;
		if (this.isOperaMini) return this.operaMiniVersion;
		if (this.isOperaMobile) return this.operaMobileVersion;
		if (this.isAndroidDevice) return this.androidVersion;
		if (this.isSamsungInternet) return this.samsungInternetVersion;
		if (this.isFirefoxMobile) return this.firefoxMobileVersion;
		if (this.isUCBrowser) return this.UCBrowserVersion;
		if (this.isIEMobile) return this.IEMobileVersion;
		return -1;
	})();
	public readonly vendorPrefix = (() => {
		if (this.isWebkitBrowser) return "webkit";
		if (this.isFirefoxOrFirefoxMobile) return "moz";
		return "";
	})();
	public readonly vendorPrefixDashed = (() => {
		if (this.isWebkitBrowser) return "-webkit-";
		if (this.isFirefoxOrFirefoxMobile) return "-moz-";
		return "";
	})();

	private detectIOSVersion (): number {

		const version = this.agent.match(/cpu.*os {0,1}_{0,1}([0-9_]{1})|(cpu like).*applewebkit.*mobile/i);
		return version != null ? parseInt(version[1]) : -1;
	}

	private detectIEMobileVersion (): number {
		const version = this.agent.match(/iemobile\/{0,1} {0,1}(\d{1})/i);
		return version != null ? parseInt(version[1]) : -1;
	}

	private detectAndroidVersion (): number {

		const version = this.agent.match(/android (\d{1,3})/i);
		return version != null ? parseInt(version[1]) : -1;
	}

	private detectSamsungInternetVersion (): number {
		const match1 = this.agent.match(/(?:samsung|smart-tv).*(?:samsungbrowser|web browser)\/(\d{1,2})/i);
		if (match1 != null) return parseInt(match1[1]);

		if (/armv7l/.test(this.agent) || /version\/\d{1,2}/.test(this.agent)) return 1;
		return -1;
	}

	private detectUCBrowserVersion (): number {
		const version = /ucbrowser|uc browser/i.test(this.agent) ? this.agent.match(/(?:ucbrowser|uc browser)\/{0,1}(\d{1,2})/i) : this.agent.match(/(?!ucweb)\/{0,1}(\d{1,2})/i);
		return version != null ? parseInt(version[1]) : -1;
	}

	private detectFirefoxMobileVersion (): number {
		const version = this.agent.match(/firefox\/(\d{1,2})/i);
		return version != null ? parseInt(version[1]) : -1;
	}

	private detectIEVersion (): number {

		if (!document.all) return 11;
		if (document.all && !document.compatMode) return 5;
		if (document.all && !GlobalObject.XMLHttpRequest) return 6;
		if (document.all && !document.querySelector) return 7;
		if (document.all && !document.addEventListener) return 8;
		if (document.all && !GlobalObject.atob) return 9;
		if (document.all) return 10;
		return -1;
	}

	private detectChromeVersion (): number {
		let versionMatch = this.agent.match(/chrome\/(\d{1,2})/i);
		if (versionMatch != null) return parseInt(versionMatch[1]);

		// For very few of the early versions of Chrome, no version number was attached (instead it took the Safari build version).
		// Return 0 in that case.
		if (versionMatch == null) versionMatch = this.agent.match(/(chrome)\/\s{1}safari/i);
		return versionMatch != null ? 0 : -1;
	}

	private detectSafariVersion (): number {
		const versionMatch = this.agent.match(/version\/(\d{1,2})/i);
		if (versionMatch != null) return parseInt(versionMatch[1]);

		// If no version were found, lets' see if we can figure it out from the build-number.
		const webkitBuildVersion = this.agent.match(/applewebkit\/(\d{1,4})/i);
		if (webkitBuildVersion != null) {
			const version = parseFloat(webkitBuildVersion[1]);
			const WEBKIT_BUILD_601 = 601;
			const WEBKIT_BUILD_538 = 538;
			const WEBKIT_BUILD_537 = 537;
			const WEBKIT_BUILD_536 = 536;
			const WEBKIT_BUILD_533 = 533;
			const WEBKIT_BUILD_526 = 526;
			const WEBKIT_BUILD_522 = 522;
			const WEBKIT_BUILD_412 = 412;
			const WEBKIT_BUILD_85 = 85;

			if (version >= WEBKIT_BUILD_601) return 9;
			if (version >= WEBKIT_BUILD_538) return 8;
			if (version >= WEBKIT_BUILD_537) return 7;
			if (version >= WEBKIT_BUILD_536) return 6;
			if (version >= WEBKIT_BUILD_533) return 5;
			if (version >= WEBKIT_BUILD_526) return 4;
			if (version >= WEBKIT_BUILD_522) return 3;
			if (version >= WEBKIT_BUILD_412) return 2;
			if (version >= WEBKIT_BUILD_85) return 1;
			return 0;
		}
		return -1;
	}

	private detectFirefoxVersion (): number {
		const versionMatch = this.agent.match(/firefox\/(\d{1,})/i);
		return versionMatch ? parseInt(versionMatch[1]) : -1;
	}

	private detectEdgeVersion (): number {
		const versionMatch = this.agent.match(/edge\/(\d{1,3})/i);
		return versionMatch ? parseInt(versionMatch[1]) : -1;
	}

	private detectOperaVersion (): number {
		const versionMatch = this.agent.match(/[opera|opr]+\/(\d{1,3})/i);
		return versionMatch ? parseInt(versionMatch[1]) : -1;
	}

	private detectOperaMiniVersion (): number {
		let versionMatch = this.agent.match(/opera mini\/(\d{1,3})/i);
		if (versionMatch != null) return parseInt(versionMatch[1]);

		// For strange reasons, some Opera Mini builds have no version.
		// Check if this string is such a build.
		versionMatch = this.agent.match(/opera mini\/([symbianos|nokia|mozilla|(windows]+)/i);
		return versionMatch ? 0 : -1;
	}

	private detectOperaMobileVersion (): number {
		let versionMatch = this.agent.match(/version\/(\d{1,3})/i);
		if (versionMatch != null) return parseInt(versionMatch[1]);

		// Some user agents is a little different. Check for that too:
		versionMatch = this.agent.match(/opera (\d{1,3})/i);
		return versionMatch ? parseInt(versionMatch[1]) : -1;
	}

	private isIOSAgent (): boolean {
		return /iphone|ipad|ipod/i.test(this.agent);
	}

	private isChromeAgent (): boolean {
		return (this.agent.indexOf("chrome") !== -1 && this.agent.indexOf("edge") === -1 && this.agent.indexOf("chromeframe") === -1) && !this.isIOSAgent();
	}

	private detectNativePlatform (): NativePlatformKind|null {
		if (!this.isNative) return null;

		const platform = GlobalObject.device ? GlobalObject.device.platform : null;
		if (platform != null) {
			const uppercased = platform.toUpperCase();
			if (uppercased === NativePlatformKind[NativePlatformKind.ANDROID]) return NativePlatformKind.ANDROID;
			if (uppercased === NativePlatformKind[NativePlatformKind.IOS]) return NativePlatformKind.IOS;
		}
		return this.browser === BrowserKind.SAFARI ? NativePlatformKind.IOS : NativePlatformKind.ANDROID;
	}

	private detectBrowser (): BrowserKind {
		const agent = this.agent;

		if ((agent.includes("ucbrowser") || agent.includes("ucweb") || agent.includes("uc browser")) && !this.isChromeAgent() && !this.isIOSAgent()) {
			return BrowserKind.UC_BROWSER;
		} else if (agent.includes("opera mini/")) {
			return BrowserKind.OPERA_MINI;
		} else if (agent.indexOf("opera mobi/") !== -1 && !this.isIOSAgent() && !this.isChromeAgent()) {
			return BrowserKind.OPERA_MOBILE;
		} else if ((agent.includes("opera") || agent.includes("opr/") || agent.includes("oupeng/")) && !this.isIOSAgent() && !this.isChromeAgent()) {
			return BrowserKind.OPERA;
		} else if (agent.includes("blackberry") && !this.isIOSAgent()) {
			return BrowserKind.BLACKBERRY;
		} else if (agent.includes("iemobile")) {
			return BrowserKind.IE_MOBILE;
		} else if (this.isChromeAgent()) {
			return BrowserKind.CHROME;
		} else if (agent.includes("samsung") || agent.includes("smart-tv")) {
			return BrowserKind.SAMSUNG_INTERNET;
		} else if (agent.includes("firefox") && /mobile|tablet|tv/.test(agent) && !this.isIOSAgent()) {
			return BrowserKind.FIREFOX_MOBILE;
		} else if (agent.includes("firefox")) {
			return BrowserKind.FIREFOX;
		} else if (agent.includes("android")) {
			return BrowserKind.ANDROID_STOCK;
		} else if ((agent.includes("safari") && !agent.includes("edge")) || agent.includes("iphone") || agent.includes("ipod") || agent.includes("ipad")) {
			return BrowserKind.SAFARI;
		} else if ((agent.includes("msie")) || (!!document.documentMode === true) || (!(GlobalObject.ActiveXObject) && "ActiveXObject" in GlobalObject) || agent.includes("rv:11.0")) {
			return BrowserKind.IE;
		} else if (agent.includes("edge")) {
			return BrowserKind.EDGE;
		} else {
			return BrowserKind.UNKNOWN;
		}
	}

}