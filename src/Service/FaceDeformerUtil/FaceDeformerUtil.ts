import {IFaceDeformerElement, IFaceDeformerUtil} from "./Interface/IFaceDeformerUtil";
import {IFaceTrackingModel, IFaceTrackingTracker} from "../../Store/FaceTrackingModelStore/Interface/IFaceTrackingModelStore";

export class FaceDeformerUtil implements IFaceDeformerUtil {
	private context: WebGLRenderingContext;
	private model: IFaceTrackingModel|null = null;
	private tracker: IFaceTrackingTracker|null = null;
	private verticeMap: number[][];
	private numTriangles: number;
	private maxX: number;
	private maxY: number;
	private minX: number;
	private minY: number;
	private width: number;
	private height: number;
	private isFirstRender: boolean = true;
	private gridProgram: WebGLProgram|null = null;
	private drawProgram: WebGLProgram|null = null;
	private gridCoordBuffer: WebGLBuffer|null = null;
	private textureCoordBuffer: WebGLBuffer|null = null;
	private textureCoordinateLocation: number;
	private resolutionLocation: WebGLUniformLocation|null = null;
	private useGrid: boolean = false;

	public draw (points: number[][]): void {
		if (this.useGrid) {
			this.context.useProgram(this.drawProgram);
			this.context.enableVertexAttribArray(this.textureCoordinateLocation);
			this.context.bindBuffer(this.context.ARRAY_BUFFER, this.textureCoordBuffer);
			this.context.vertexAttribPointer(this.textureCoordinateLocation, 2, this.context.FLOAT, false, 0, 0);

			this.useGrid = false;
		}
		const vertices = this.createDrawVertices(points);
		this.createDrawPositionBuffer(vertices);

		this.context.drawArrays(this.context.TRIANGLES, 0, this.numTriangles * 3);
	}

	public drawGrid (points: number[][]): void {
		if (!this.useGrid) {
			this.context.useProgram(this.gridProgram);
			this.useGrid = true;
		}
		const vertices = this.createGridVertices(points);
		this.createGridPositionBuffer(vertices);
		this.context.drawArrays(this.context.LINES, 0, this.numTriangles * 6);
	}

	public clear (): void {
		this.context.clear(this.context.COLOR_BUFFER_BIT);
	}

	public calculatePositions (parameters: number[], useTransforms: boolean): [number, number][] {
		if (this.model == null) throw new ReferenceError(`${this.constructor.name} could not calculate positions: No model was given!`);
		let x: number;
		let y: number;
		let a: number;
		let b: number;
		const positions: [number, number][] = [];
		const numParameters = parameters.length;
		const {numPatches} = this.model.patchModel;
		const {meanShape, eigenVectors} = this.model.shapeModel;

		for (let i = 0; i < numPatches; i++) {
			x = meanShape[i][0];
			y = meanShape[i][1];
			for (let j = 0; j < numParameters - 4; j++) {
				x += eigenVectors[(i * 2)][j] * parameters[j + 4];
				y += eigenVectors[(i * 2) + 1][j] * parameters[j + 4];
			}
			if (useTransforms) {
				a = parameters[0] * x - parameters[1] * y + parameters[2];
				b = parameters[0] * y + parameters[1] * x + parameters[3];
				x += a;
				y += b;
			}
			positions[i] = [x, y];
		}

		return positions;
	}

	public load (element: IFaceDeformerElement, points: number[][], model: IFaceTrackingModel, vertices?: number[][]): void {
		this.model = model;
		this.setVertices(model, vertices);
		this.setNumTriangles();
		this.setCropping(element, points);
		const imageData = this.getImageDataFromElement(element);
		const correctedPoints = this.correctPoints(points);
		const textureVertices = this.createTextureVertices(correctedPoints);

		if (this.isFirstRender) this.prepareFirstRender();
		this.loadGridProgram();
		this.loadDrawProgram(textureVertices, imageData);
	}

	public init (canvas: HTMLCanvasElement, tracker: IFaceTrackingTracker): void {
		this.context = tracker.getWebGLContext(canvas);
		this.context.pixelStorei(this.context.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);
		this.tracker = tracker;
	}

	private createGridPositionBuffer (vertices: number[]): void {
		const positionLocation = this.context.getAttribLocation(this.gridProgram, "a_position");
		this.context.bindBuffer(this.context.ARRAY_BUFFER, this.gridCoordBuffer);
		this.context.enableVertexAttribArray(positionLocation);
		this.context.vertexAttribPointer(positionLocation, 2, this.context.FLOAT, false, 0, 0);
		this.context.bufferData(this.context.ARRAY_BUFFER, new Float32Array(vertices), this.context.STATIC_DRAW);
	}

	private createDrawPositionBuffer (vertices: number[]): void {
		const positionLocation = this.context.getAttribLocation(this.drawProgram, "a_position");
		const drawPositionBuffer = this.context.createBuffer();
		this.context.bindBuffer(this.context.ARRAY_BUFFER, drawPositionBuffer);
		this.context.enableVertexAttribArray(positionLocation);
		this.context.vertexAttribPointer(positionLocation, 2, this.context.FLOAT, false, 0, 0);
		this.context.bufferData(this.context.ARRAY_BUFFER, new Float32Array(vertices), this.context.STATIC_DRAW);
	}

	private createTexture (imageData: ImageData): void {
		const texture = this.context.createTexture();
		this.context.bindTexture(this.context.TEXTURE_2D, texture);
		this.context.texParameteri(this.context.TEXTURE_2D, this.context.TEXTURE_WRAP_S, this.context.CLAMP_TO_EDGE);
		this.context.texParameteri(this.context.TEXTURE_2D, this.context.TEXTURE_WRAP_T, this.context.CLAMP_TO_EDGE);
		this.context.texParameteri(this.context.TEXTURE_2D, this.context.TEXTURE_MIN_FILTER, this.context.LINEAR);
		this.context.texParameteri(this.context.TEXTURE_2D, this.context.TEXTURE_MAG_FILTER, this.context.LINEAR);
		this.context.texImage2D(this.context.TEXTURE_2D, 0, this.context.RGBA, this.context.RGBA, this.context.UNSIGNED_BYTE, imageData);
	}

	private loadGridProgram (): void {
		if (this.gridProgram == null) throw new ReferenceError(`${this.constructor.name} could not load the grid program: It hasn't been created!`);
		this.context.useProgram(this.gridProgram);

		const resolutionLocation = this.context.getUniformLocation(this.gridProgram, "u_resolution");
		this.context.uniform2f(resolutionLocation, this.context.drawingBufferWidth, this.context.drawingBufferHeight);
	}

	private loadDrawProgram (textureVertices: number[], imageData: ImageData): void {
		if (this.drawProgram == null) throw new ReferenceError(`${this.constructor.name} could not load the draw program: It hasn't been created!`);
		this.context.useProgram(this.drawProgram);

		this.textureCoordinateLocation = this.context.getAttribLocation(this.drawProgram, "a_texCoord");
		this.context.enableVertexAttribArray(this.textureCoordinateLocation);
		this.context.bindBuffer(this.context.ARRAY_BUFFER, this.textureCoordBuffer);
		this.context.bufferData(this.context.ARRAY_BUFFER, new Float32Array(textureVertices), this.context.STATIC_DRAW);
		this.context.vertexAttribPointer(this.textureCoordinateLocation, 2, this.context.FLOAT, false, 0, 0);
		this.createTexture(imageData);

		this.resolutionLocation = this.context.getUniformLocation(this.drawProgram, "u_resolution");
		this.context.uniform2f(this.resolutionLocation, this.context.drawingBufferWidth, this.context.drawingBufferHeight);
	}

	private prepareFirstRender (): void {
		this.createGridProgram();
		this.createDrawProgram();
		this.isFirstRender = false;
	}

	private createDrawProgram (): void {
		if (this.tracker == null) throw new ReferenceError(`${this.constructor.name} could no prepare a shader: No tracker was given!`);
		const vertexShader = this.tracker.loadShader(this.context, this.createVertexShaderProgram(), this.context.VERTEX_SHADER);
		const fragmentShader = this.tracker.loadShader(this.context, this.createFragmentShaderProgram(), this.context.FRAGMENT_SHADER);
		this.drawProgram = this.tracker.createProgram(this.context, [vertexShader, fragmentShader]);
		this.textureCoordBuffer = this.context.createBuffer();
	}

	private createGridProgram (): void {
		if (this.tracker == null) throw new ReferenceError(`${this.constructor.name} could no prepare a shader: No tracker was given!`);
		const gridVertexShader = this.tracker.loadShader(this.context, this.createGridVertexShaderProgram(), this.context.VERTEX_SHADER);
		const gridFragmentShader = this.tracker.loadShader(this.context, this.createGridFragmentShaderProgram(), this.context.FRAGMENT_SHADER);
		this.gridProgram = this.tracker.createProgram(this.context, [gridVertexShader, gridFragmentShader]);
		this.gridCoordBuffer = this.context.createBuffer();
	}

	private createGridVertices (points: number[][]): number[] {
		const vertices: number[] = [];
		const {verticeMap} = this;
		for (let i = 0; i < verticeMap.length; i++) {
			vertices.push(points[verticeMap[i][0]][0]);
			vertices.push(points[verticeMap[i][0]][1]);
			vertices.push(points[verticeMap[i][1]][0]);
			vertices.push(points[verticeMap[i][1]][1]);

			vertices.push(points[verticeMap[i][1]][0]);
			vertices.push(points[verticeMap[i][1]][1]);
			vertices.push(points[verticeMap[i][2]][0]);
			vertices.push(points[verticeMap[i][2]][1]);

			vertices.push(points[verticeMap[i][2]][0]);
			vertices.push(points[verticeMap[i][2]][1]);
			vertices.push(points[verticeMap[i][0]][0]);
			vertices.push(points[verticeMap[i][0]][1]);
		}
		return vertices;
	}

	private createDrawVertices (points: number[][]): number[] {
		const vertices: number[] = [];
		const {verticeMap} = this;
		for (let i = 0; i < verticeMap.length; i++) {
			vertices.push(points[verticeMap[i][0]][0]);
			vertices.push(points[verticeMap[i][0]][1]);
			vertices.push(points[verticeMap[i][1]][0]);
			vertices.push(points[verticeMap[i][1]][1]);
			vertices.push(points[verticeMap[i][2]][0]);
			vertices.push(points[verticeMap[i][2]][1]);
		}
		return vertices;
	}

	private createTextureVertices (correctedPoints: number[][]): number[] {
		const textureVertices: number[] = [];
		const {numTriangles, verticeMap, width, height} = this;
		for (let i = 0; i < numTriangles; i++) {
			textureVertices.push(correctedPoints[verticeMap[i][0]][0] / width);
			textureVertices.push(correctedPoints[verticeMap[i][0]][1] / height);
			textureVertices.push(correctedPoints[verticeMap[i][1]][0] / width);
			textureVertices.push(correctedPoints[verticeMap[i][1]][1] / height);
			textureVertices.push(correctedPoints[verticeMap[i][2]][0] / width);
			textureVertices.push(correctedPoints[verticeMap[i][2]][1] / height);
		}
		return textureVertices;
	}

	/**
	 * Creates a program responsible for drawing a grid.
	 * @returns {string}
	 */
	private createGridVertexShaderProgram (): string {
		return [
			"attribute vec2 a_position;",
			"",
			"uniform vec2 u_resolution;",
			"",
			"void main() {",
			"  vec2 zeroToOne = a_position / u_resolution;",
			"  vec2 zeroToTwo = zeroToOne * 2.0;",
			"  vec2 clipSpace = zeroToTwo - 1.0;",
			"  gl_Position = vec4(clipSpace * vec2(1, -1), 0, 1);",
			"}"
		].join("\n");
	}

	private createGridFragmentShaderProgram (): string {
		return [
			"void main() {",
			"  gl_FragColor = vec4(0.2, 0.2, 0.2, 1.0);",
			"}"
		].join("\n");
	}

	private createVertexShaderProgram (): string {
		return [
			"attribute vec2 a_texCoord;",
			"attribute vec2 a_position;",
			"",
			"varying vec2 v_texCoord;",
			"",
			"uniform vec2 u_resolution;",
			"",
			"void main() {",
			"  vec2 zeroToOne = a_position / u_resolution;",
			"  vec2 zeroToTwo = zeroToOne * 2.0;",
			"  vec2 clipSpace = zeroToTwo - 1.0;",
			"  gl_Position = vec4(clipSpace * vec2(1, -1), 0, 1);",
			"  ",
			"  v_texCoord = a_texCoord;",
			"}"
		].join("\n");
	}

	private createFragmentShaderProgram (): string {
		return [
			"precision mediump float;",
			"",
			"uniform sampler2D u_image;",
			"",
			"varying vec2 v_texCoord;",
			"",
			"void main() {",
			"  gl_FragColor = texture2D(u_image, v_texCoord);",
			"}"
		].join("\n");
	}

	private correctPoints (points: number[][]): number[][] {
		const newPoints: number[][] = [];
		for (let i = 0; i < points.length; i++) {
			newPoints[i] = [];
			newPoints[i][0] = points[i][0] - this.minX;
			newPoints[i][1] = points[i][1] - this.minY;
		}
		return newPoints;
	}

	private getImageDataFromElement (element: IFaceDeformerElement): ImageData {
		let context: CanvasRenderingContext2D|null = null;

		if (element.tagName.toLowerCase() === "canvas") {
			context = (<HTMLCanvasElement>element).getContext("2d");
		} else {
			const canvas = document.createElement("canvas");
			canvas.width = element.width;
			canvas.height = element.height;
			context = canvas.getContext("2d");

			if (context != null) {
				context.drawImage(<HTMLImageElement>element, 0, 0, element.width, element.height);
			}
		}
		if (context == null) throw new ReferenceError(`${this.constructor.name} could not extract a 2d context from a canvas element!`);
		return context.getImageData(this.minX, this.minY, this.width, this.height);
	}

	private setNumTriangles (): void {
		this.numTriangles = this.verticeMap.length;
	}

	private setVertices (model: IFaceTrackingModel, vertices?: number[][]): void {
		if (vertices != null) this.verticeMap = vertices;
		else {
			this.verticeMap = model.path.vertices;
		}
	}

	private setCropping (element: IFaceDeformerElement, points: number[][]): void {
		let maxX = 0;
		let maxY = 0;
		let minX = element.width;
		let minY = element.height;

		points.forEach(point => {
			if (point[0] > maxX) maxX = point[0];
			if (point[0] < minX) minX = point[0];
			if (point[1] > maxY) maxY = point[1];
			if (point[1] < minY) minY = point[1];
		});

		minX = Math.floor(minX);
		maxX = Math.ceil(maxX);
		minY = Math.floor(minY);
		maxY = Math.ceil(maxY);
		this.width = maxX - minX;
		this.height = maxY - minY;
		this.maxX = maxX;
		this.maxY = maxY;
		this.minX = minX;
		this.minY = minY;
	}

}