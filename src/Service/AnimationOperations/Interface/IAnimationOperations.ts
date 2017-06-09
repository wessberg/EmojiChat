export interface IAnimationOperations {
	animate (element: Element, keyframes: IKeyframeOptions|IKeyframeOptions[], options: IAnimationOptions): Promise<Animation>;
}

declare type KeyframeOption = string|number;

export interface IKeyframeOptions {
	[key: string]: KeyframeOption|[KeyframeOption, KeyframeOption];
}

export interface IAnimationOptions {
	delay?: number;
	endDelay?: number;
	fill?: "none"|"auto"|"forwards"|"backwards";
	iterationStart?: number;
	iterations?: number;
	duration?: number;
	direction?: "normal"|"reverse"|"alternate"|"alternate-reverse";
	easing?: string;
}