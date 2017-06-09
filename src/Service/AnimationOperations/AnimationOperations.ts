import {IAnimationOperations, IAnimationOptions, IKeyframeOptions} from "./Interface/IAnimationOperations";

export class AnimationOperations implements IAnimationOperations {

	public animate (element: Element, keyframes: IKeyframeOptions, options: IAnimationOptions): Promise<Animation> {
		return new Promise<Animation>((resolve, reject) => {
			try {
				requestAnimationFrame(() => {
					const animation = element.animate(keyframes, options);
					if (options.iterations === Infinity) return resolve(animation);

					animation.onfinish = animation.oncancel = () => {
						resolve(animation);
					};
				});
			} catch (e) {
				reject(e);
			}
		});
	}

}