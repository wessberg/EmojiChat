import {IStyleGuide} from "../StyleGuide/Interface/IStyleGuide";
import {Config} from "@wessberg/environment";
import {colorUtil} from "../Tool/Service/Services";

export const sharedCss =
	// language=CSS
	(styleGuide: IStyleGuide) => `
      :root,
      :host {

          /* Color */
          /* -- Private colors -- */
          --_rgb-inner-black: ${styleGuide.color.blackRGB};
          --_rgb-inner-white: ${styleGuide.color.whiteRGB};
          --_rgb-inner-primary: ${styleGuide.color.primaryRGB};
          --_rgb-inner-primary-darker: ${colorUtil.takeInner(colorUtil.lighten(`rgb(${styleGuide.color.primaryRGB})`, -10))};
          --_rgb-inner-accent: ${styleGuide.color.accentRGB};
          --_rgb-inner-accent-darker: ${colorUtil.takeInner(colorUtil.lighten(`rgb(${styleGuide.color.accentRGB})`, -10))};
          --_rgb-inner-red: ${styleGuide.color.redRGB};
          --_rgb-inner-red-darker: ${colorUtil.takeInner(colorUtil.lighten(`rgb(${styleGuide.color.redRGB})`, -10))};
          --_rgb-inner-orange: ${styleGuide.color.orangeRGB};
          --_rgb-inner-orange-darker: ${colorUtil.takeInner(colorUtil.lighten(`rgb(${styleGuide.color.orangeRGB})`, -10))};
          --_rgb-inner-blue: ${styleGuide.color.blueRGB};
          --_rgb-inner-blue-darker: ${colorUtil.takeInner(colorUtil.lighten(`rgb(${styleGuide.color.blueRGB})`, -10))};
          --_rgb-inner-green: ${styleGuide.color.greenRGB};
          --_rgb-inner-green-darker: ${colorUtil.takeInner(colorUtil.lighten(`rgb(${styleGuide.color.greenRGB})`, -10))};

          /* -- Public colors -- */
          --color-primary-hex: ${colorUtil.toHex(`rgb(${styleGuide.color.primaryRGB})`)};
          --color-dark-hex: ${colorUtil.toHex(`rgb(${styleGuide.color.darkRGB})`)};
          --color-black-100: rgb(var(--_rgb-inner-black));
          --color-black-87: rgba(var(--_rgb-inner-black), 0.87);
          --color-black-70: rgba(var(--_rgb-inner-black), 0.70);
          --color-black-54: rgba(var(--_rgb-inner-black), 0.54);
          --color-black-50: rgba(var(--_rgb-inner-black), 0.50);
          --color-black-38: rgba(var(--_rgb-inner-black), 0.38);
          --color-black-26: rgba(var(--_rgb-inner-black), 0.26);
          --color-black-12: rgba(var(--_rgb-inner-black), 0.12);
          --color-black-06: rgba(var(--_rgb-inner-black), 0.06);
          --color-black-02: rgba(var(--_rgb-inner-black), 0.02);

          --color-white-100: rgb(var(--_rgb-inner-white));
          --color-white-87: rgba(var(--_rgb-inner-white), 0.87);
          --color-white-70: rgba(var(--_rgb-inner-white), 0.70);
          --color-white-54: rgba(var(--_rgb-inner-white), 0.54);
          --color-white-50: rgba(var(--_rgb-inner-white), 0.50);
          --color-white-38: rgba(var(--_rgb-inner-white), 0.38);
          --color-white-26: rgba(var(--_rgb-inner-white), 0.26);
          --color-white-12: rgba(var(--_rgb-inner-white), 0.12);

          --color-primary-120: rgb(var(--_rgb-inner-primary-darker));
          --color-primary-100: rgb(var(--_rgb-inner-primary));
          --color-primary-87: rgba(var(--_rgb-inner-primary), 0.87);
          --color-primary-70: rgba(var(--_rgb-inner-primary), 0.70);
          --color-primary-54: rgba(var(--_rgb-inner-primary), 0.54);
          --color-primary-50: rgba(var(--_rgb-inner-primary), 0.50);
          --color-primary-38: rgba(var(--_rgb-inner-primary), 0.38);
          --color-primary-26: rgba(var(--_rgb-inner-primary), 0.26);
          --color-primary-12: rgba(var(--_rgb-inner-primary), 0.12);
          --color-primary-06: rgba(var(--_rgb-inner-primary), 0.06);

          --color-accent-120: rgb(var(--_rgb-inner-accent-darker));
          --color-accent-100: rgb(var(--_rgb-inner-accent));
          --color-accent-87: rgba(var(--_rgb-inner-accent), 0.87);
          --color-accent-70: rgba(var(--_rgb-inner-accent), 0.70);
          --color-accent-54: rgba(var(--_rgb-inner-accent), 0.54);
          --color-accent-50: rgba(var(--_rgb-inner-accent), 0.50);
          --color-accent-38: rgba(var(--_rgb-inner-accent), 0.38);
          --color-accent-26: rgba(var(--_rgb-inner-accent), 0.26);
          --color-accent-12: rgba(var(--_rgb-inner-accent), 0.12);
          --color-accent-06: rgba(var(--_rgb-inner-accent), 0.06);

          --color-red-120: rgb(var(--_rgb-inner-red-darker));
          --color-red-100: rgb(var(--_rgb-inner-red));
          --color-red-87: rgba(var(--_rgb-inner-red), 0.87);
          --color-red-70: rgba(var(--_rgb-inner-red), 0.70);
          --color-red-54: rgba(var(--_rgb-inner-red), 0.54);
          --color-red-50: rgba(var(--_rgb-inner-red), 0.50);
          --color-red-38: rgba(var(--_rgb-inner-red), 0.38);
          --color-red-26: rgba(var(--_rgb-inner-red), 0.26);
          --color-red-12: rgba(var(--_rgb-inner-red), 0.12);
          --color-red-06: rgba(var(--_rgb-inner-red), 0.06);
          
          --color-green-120: rgb(var(--_rgb-inner-green-darker));
          --color-green-100: rgb(var(--_rgb-inner-green));
          --color-green-87: rgba(var(--_rgb-inner-green), 0.87);
          --color-green-70: rgba(var(--_rgb-inner-green), 0.70);
          --color-green-54: rgba(var(--_rgb-inner-green), 0.54);
          --color-green-50: rgba(var(--_rgb-inner-green), 0.50);
          --color-green-38: rgba(var(--_rgb-inner-green), 0.38);
          --color-green-26: rgba(var(--_rgb-inner-green), 0.26);
          --color-green-12: rgba(var(--_rgb-inner-green), 0.12);
          --color-green-06: rgba(var(--_rgb-inner-green), 0.06);
          
          --color-orange-120: rgb(var(--_rgb-inner-orange-darker));
          --color-orange-100: rgb(var(--_rgb-inner-orange));
          --color-orange-87: rgba(var(--_rgb-inner-orange), 0.87);
          --color-orange-70: rgba(var(--_rgb-inner-orange), 0.70);
          --color-orange-54: rgba(var(--_rgb-inner-orange), 0.54);
          --color-orange-50: rgba(var(--_rgb-inner-orange), 0.50);
          --color-orange-38: rgba(var(--_rgb-inner-orange), 0.38);
          --color-orange-26: rgba(var(--_rgb-inner-orange), 0.26);
          --color-orange-12: rgba(var(--_rgb-inner-orange), 0.12);
          --color-orange-06: rgba(var(--_rgb-inner-orange), 0.06);

          --color-blue-120: rgb(var(--_rgb-inner-blue-darker));
          --color-blue-100: rgb(var(--_rgb-inner-blue));
          --color-blue-87: rgba(var(--_rgb-inner-blue), 0.87);
          --color-blue-70: rgba(var(--_rgb-inner-blue), 0.70);
          --color-blue-54: rgba(var(--_rgb-inner-blue), 0.54);
          --color-blue-50: rgba(var(--_rgb-inner-blue), 0.50);
          --color-blue-38: rgba(var(--_rgb-inner-blue), 0.38);
          --color-blue-26: rgba(var(--_rgb-inner-blue), 0.26);
          --color-blue-12: rgba(var(--_rgb-inner-blue), 0.12);
          --color-blue-06: rgba(var(--_rgb-inner-blue), 0.06);

          --color-primary-text-dark: var(--color-black-87);
          --color-secondary-text-dark: var(--color-black-54);
          --color-disabled-text-dark: var(--color-black-38);
          --color-hint-text-dark: var(--color-black-38);
          --color-divider-on-dark-background: var(--color-white-12);
          --color-divider-on-light-background: var(--color-black-12);
          --color-icon-dark: var(--color-black-54);
          --color-icon-inactive-dark: var(--color-black-38);
          --color-display4-dark: var(--color-black-54);
          --color-display3-dark: var(--color-black-54);
          --color-display2-dark: var(--color-black-54);
          --color-display1-dark: var(--color-black-54);
          --color-headline-dark: var(--color-black-87);
          --color-title-dark: var(--color-black-87);
          --color-subheading-dark: var(--color-black-87);
          --color-body-dark: var(--color-black-87);
          --color-emphasized-dark: var(--color-black-87);
          --color-caption-dark: var(--color-black-54);
          --color-menu-dark: var(--color-black-87);
          --color-button-dark: var(--color-black-87);

          --color-primary-text-light: var(--color-white-100);
          --color-secondary-text-light: var(--color-white-70);
          --color-disabled-text-light: var(--color-white-50);
          --color-hint-text-light: var(--color-white-50);
          --color-icon-light: var(--color-white-100);
          --color-icon-inactive-light: var(--color-white-50);
          --color-display4-light: var(--color-white-54);
          --color-display3-light: var(--color-white-54);
          --color-display2-light: var(--color-white-54);
          --color-display1-light: var(--color-white-54);
          --color-headline-light: var(--color-white-87);
          --color-title-light: var(--color-white-87);
          --color-subheading-light: var(--color-white-87);
          --color-emphasized-light: var(--color-white-87);
          --color-body-light: var(--color-white-87);
          --color-caption-light: var(--color-white-54);
          --color-menu-light: var(--color-white-87);
          --color-button-light: var(--color-white-87);

          --color-syntax-keyword: #FFA000;
          --color-syntax-function: #82B1FF;
          --color-syntax-method: var(--color-syntax-function);
          --color-syntax-identifier: #FFCB6B;
          --color-syntax-brace: #989fa7;
          --color-syntax-bracket: var(--color-white-87);
          --color-syntax-parenthesis: var(--color-syntax-bracket);
          --color-syntax-token: var(--color-syntax-bracket);
          --color-syntax-decorator: var(--color-syntax-function);
          --color-syntax-property: #FF5370;
          --color-syntax-type: #e3ba4c;
          --color-syntax-tagname: var(--color-syntax-property);
          --color-syntax-string: #aac8ae;
          --color-syntax-number: var(--color-syntax-property);
          --color-syntax-attribute-name: #e6b96c;
          --color-syntax-attribute-value: #c3e887;
          --color-syntax-css-selector-name: var(--color-syntax-tagname);
          --color-syntax-css-property-name: #6dc2b8;
          --color-syntax-variable: #939e88;
          --color-syntax-comment: #546e7a;

          /* Padding/Margin (distance between elements in general) */

          --distance-minimum: 16px;
          --distance-regular: 24px;
          --distance-large: 34px;

          /* Duration */
          --duration-short: 100ms;
          --duration-medium: 200ms;
          --duration-long: 300ms;
          --duration-fast: ${Config.MOBILE ? "180ms" : "180ms"};
          --duration-standard: ${Config.MOBILE ? "225ms" : "225ms"};
          --duration-complex: ${Config.MOBILE ? "375ms" : "375ms"};
          --duration-entering: ${Config.MOBILE ? "225ms" : "225ms"};
          --duration-leaving: ${Config.MOBILE ? "195ms" : "195ms"};

          /* Easing */
          --easing-standard-curve: cubic-bezier(0.4, 0.0, 0.2, 1);
          --easing-deceleration-curve: cubic-bezier(0.0, 0.0, 0.2, 1);
          --easing-acceleration-curve: cubic-bezier(0.4, 0.0, 1, 1);
          --easing-sharp-curve: cubic-bezier(0.4, 0.0, 0.6, 1);

          /* Width */

          --width-icon-small: 24px;
          --width-icon-medium: 30px;
          --width-icon-large: 40px;
          --width-icon-larger: 61px;
          --width-icon-huge: 100px;
          --width-icon-huger: 180px;
          --width-icon-extreme: 284px;
          --width-icon-brutal: 712px;
          --width-frame-max: 830px;

          /* Height */
          --app-bar-landscape-height: ${Config.MOBILE ? "48px" : "64px"};
          --app-bar-portrait-height: ${Config.MOBILE ? "56px" : "64px"};
          --height-icon-small: 24px;
          --height-icon-medium: 30px;
          --height-icon-large: 40px;
          --height-icon-larger: 61px;
          --height-icon-huge: 100px;
          --height-icon-huger: 180px;
          --height-icon-extreme: 284px;
          --height-icon-brutal: 712px;

          /* Rounding */
          --box-radius: 2px;

          /* Shadows */
          --shadow-level1: 0 2px 2px 0 rgba(0, 0, 0, .14), 0 1px 5px 0 rgba(0, 0, 0, .12), 0 3px 1px -2px rgba(0, 0, 0, .1);
          --shadow-level2: 0 3px 4px 0 rgba(0, 0, 0, .14), 0 1px 8px 0 rgba(0, 0, 0, .12), 0 3px 3px -2px rgba(0, 0, 0, .1);
          --shadow-level3: 0 4px 5px 0 rgba(0, 0, 0, .14), 0 1px 10px 0 rgba(0, 0, 0, .12), 0 2px 4px -1px rgba(0, 0, 0, .1);
          --shadow-level4: 0 6px 10px 0 rgba(0, 0, 0, .14), 0 1px 18px 0 rgba(0, 0, 0, .12), 0 3px 5px -1px rgba(0, 0, 0, .1);
          --shadow-level5: 0 8px 10px 1px rgba(0, 0, 0, .14), 0 3px 14px 2px rgba(0, 0, 0, .12), 0 5px 5px -3px rgba(0, 0, 0, .1);
          --shadow-level6: 0 16px 24px 2px rgba(0, 0, 0, .14), 0 6px 30px 5px rgba(0, 0, 0, .12), 0 8px 10px -5px rgba(0, 0, 0, .1);
          --shadow-level7: 0 9px 46px 8px rgba(0, 0, 0, .14), 0 24px 38px 3px rgba(0, 0, 0, .12), 0 11px 15px -7px rgba(0, 0, 0, .1);

          /* Line height */
          --line-height-body: 1.5;

          /* Fonts */
          --font-family: "Roboto", "Noto", "Helvetica Neue", Arial, Verdana, sans-serif;
          --font-family-monospace: "Roboto Mono", "Inconsolata-g", "Inconsolata-dz", "Inconsolata", "Source Code Pro", Courier;
          --font-weight-thin: 100;
          --font-weight-light: 200;
          --font-weight-regular: 400;
          --font-weight-medium: 500;
          --font-weight-bold: 700;
          --font-weight-button: var(--font-weight-medium);
          --font-weight-caption: var(--font-weight-regular);
          --font-weight-emphasized: var(--font-weight-medium);
          --font-weight-body: var(--font-weight-regular);
          --font-weight-subheading: var(--font-weight-regular);
          --font-weight-title: var(--font-weight-medium);
          --font-weight-headline: var(--font-weight-regular);
          --font-weight-display1: var(--font-weight-regular);
          --font-weight-display2: var(--font-weight-regular);
          --font-weight-display3: var(--font-weight-regular);
          --font-weight-display4: var(--font-weight-light);
          --font-size-body: 14px;
          --font-size-subheading: 16px;
          --font-size-button: 14px;
          --font-size-caption: 12px;
          --font-size-mono: 11px;
          --font-size-title: 20px;
          --font-size-headline: 24px;
          --font-size-display1: 34px;
          --font-size-display2: 45px;
          --font-size-display3: 56px;
          --font-size-display4: 112px;
          --font-rendering: optimizeSpeed;
      }

      * {
          touch-action: manipulation;
          box-sizing: border-box;
          -webkit-box-sizing: border-box;
          -moz-box-sizing: border-box;
          -ms-touch-action: none;
          -webkit-touch-callout: none;
          -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
          -webkit-user-drag: none;
          cursor: default;
          user-select: none;
          font-family: var(--font-family);
      }

      *:focus {
          outline: none !important;
      }

      h1,
      h2,
      h3,
      h4,
      h5,
      h6,
      p,
      option,
      label,
      strong,
      caption,
      small,
      span,
      td,
      tr,
      pre,
      tbody {
          font-family: var(--font-family);
          user-select: none;
          cursor: default;
          text-rendering: var(--font-rendering);
      }

      p, option, label, small, span, td, pre {
          margin: 0;
      }

      h1, h2, h3, h4, h5, h6 {
          margin: 0 0 20px 0;
      }

      small, p, option, label, span, td, pre {
          font-size: var(--font-size-body);
          line-height: var(--line-height-body);
      }

      small {
          color: var(--color-secondary-text-dark);
      }

      strong {
          font-weight: var(--font-weight-emphasized);
      }

      small, p, option, label, span, td {
          font-weight: var(--font-weight-body);
      }

      p,
      option,
      label,
      span,
      td {
          color: var(--color-primary-text-dark);
      }

      h1, h2, h3, h4, h5, h6 {
          line-height: var(--line-height-body);
      }

      h1 {
          font-size: var(--font-size-display4);
          font-weight: var(--font-weight-display4);
          color: var(--color-display4-dark);
      }

      h2 {
          font-size: var(--font-size-display3);
          font-weight: var(--font-weight-display3);
          color: var(--color-display3-dark);
      }

      h3 {
          font-size: var(--font-size-display2);
          font-weight: var(--font-weight-display2);
          color: var(--color-display2-dark);
      }

      h4 {
          font-size: var(--font-size-display1);
          font-weight: var(--font-weight-display1);
          color: var(--color-display1-dark);
      }

      h5 {
          font-size: var(--font-size-headline);
          font-weight: var(--font-weight-headline);
          color: var(--color-headline-dark);
      }

      h6 {
          font-size: var(--font-size-title);
          font-weight: var(--font-weight-title);
          color: var(--color-title-dark);
      }

      caption {
          font-size: var(--font-size-caption);
          line-height: var(--font-size-caption);
          font-weight: var(--font-weight-caption);
          color: var(--color-caption-dark);
      }

      hr {
          border: 0;
          height: 1px;
          width: 100%;
          margin: 0;
          padding: 0;
          background-color: var(--color-divider-on-light-background);
      }
	`;