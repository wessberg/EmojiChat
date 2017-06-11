import {IEmojiPlacement, IImageSnapUtil} from "./Interface/IImageSnapUtil";
import {Resource} from "../../../Resource/Resource";

export class ImageSnapUtil implements IImageSnapUtil {

	public async takePicture (videoElement: HTMLVideoElement, placement: IEmojiPlacement): Promise<string> {

		const canvas = <HTMLCanvasElement> document.createElement("canvas");
		const context = canvas.getContext("2d");
		canvas.style.objectFit = "cover";
		if (context == null) throw new ReferenceError(`${this.constructor.name} could not render the video to a canvas: No rendering context could be fetched from the canvas element!`);

		// Set the canvas size to follow the size of the video.
		const {width, height} = videoElement;
		canvas.width = width;
		canvas.height = height;

		// Draw the video on to the canvas.
		this.coverCanvasWidthVideo(context, videoElement, 0, 0, width, height);

		// Now, render a new emoji to an image tag on the same coordinates.
		const emojiImage = await this.getEmojiImage(placement);

		context.drawImage(emojiImage, placement.left, placement.top, placement.width, placement.height);
		return canvas.toDataURL();
	}

	private async getEmojiImage (placement: IEmojiPlacement): Promise<HTMLImageElement> {
		return new Promise<HTMLImageElement>(resolve => {

			const emojiImage = new Image();
			emojiImage.src = Resource.app.path.dist.asset.image.emoji[placement.emotion || "neutral"](1);

			emojiImage.onload = () => {
				(<any>emojiImage).onload = null;
				resolve(emojiImage);
			};
		});
	}

	/**
	 * This methods simulates object-fit behavior (which is used by the video).
	 * @param context
	 * @param video
	 * @param x
	 * @param y
	 * @param w
	 * @param h
	 * @param offsetX
	 * @param offsetY
	 */
	private coverCanvasWidthVideo (context: CanvasRenderingContext2D, video: HTMLVideoElement, x: number, y: number, w: number, h: number, offsetX?: number, offsetY?: number): void {

		if (arguments.length === 2) {
			x = y = 0;
			w = context.canvas.width;
			h = context.canvas.height;
		}

		// default offset is center
		offsetX = typeof offsetX === "number" ? offsetX : 0.5;
		offsetY = typeof offsetY === "number" ? offsetY : 0.5;

		// keep bounds [0.0, 1.0]
		if (offsetX < 0) offsetX = 0;
		if (offsetY < 0) offsetY = 0;
		if (offsetX > 1) offsetX = 1;
		if (offsetY > 1) offsetY = 1;

		let iw = video.videoWidth,
			ih = video.videoHeight,
			r = Math.min(w / iw, h / ih),
			nw = iw * r,   // new prop. width
			nh = ih * r,   // new prop. height
			cx, cy, cw, ch, ar = 1;

		// decide which gap to fill
		if (nw < w) ar = w / nw;
		if (Math.abs(ar - 1) < 1e-14 && nh < h) ar = h / nh;  // updated
		nw *= ar;
		nh *= ar;

		// calc source rectangle
		cw = iw / (nw / w);
		ch = ih / (nh / h);

		cx = (iw - cw) * offsetX;
		cy = (ih - ch) * offsetY;

		// make sure source rectangle is valid
		if (cx < 0) cx = 0;
		if (cy < 0) cy = 0;
		if (cw > iw) cw = iw;
		if (ch > ih) ch = ih;

		// fill image in dest. rectangle
		context.drawImage(video, cx, cy, cw, ch, x, y, w, h);
	}

}