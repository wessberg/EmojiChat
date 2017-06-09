import {readFile} from "fs";
import {createServer as httpServer, ServerRequest, ServerResponse} from "http";
import {createServer as httpsServer} from "https";
import * as mime from "mime";
import {resolve} from "path";
import {Config} from "@wessberg/environment";


export interface IResponseHeaders {
	"Content-Type"?: string;
	"content-encoding"?: string;
}

enum StatusCode {
	NOT_FOUND = 404,
	OK = 200
}

async function read (path: string): Promise<Buffer> {
	return new Promise<Buffer>((resolve, reject) => {
		readFile(path, (err, content) => {
			if (err) return reject(err);
			resolve(content);
		});
	});
}

export class DevServer {
	private static DEFAULT_MIME_TYPE: string = "text/plain";
	private key: string|undefined;
	private cert: string|undefined;

	constructor (private contentBase: string,
							 private host: string,
							 private port: number,
							 key?: string|Buffer,
							 cert?: string|Buffer) {
		this.key = key instanceof Buffer ? key.toString() : key != null ? key : undefined;
		this.cert = cert instanceof Buffer ? cert.toString() : cert != null ? cert : undefined;
	}

	private get protocol (): string {
		return this.key != null && this.cert != null ? "https" : "http";
	}

	public async listen (): Promise<void> {
		if (this.key != null && this.cert != null) await this.listenOnHttps();
		else await this.listenOnHttp();

		console.log(`Development server listening on ${this.protocol}://${this.host}:${this.port}`);
	}

	private async listenOnHttps (): Promise<void> {
		return new Promise<void>((resolve, reject) => {
			httpsServer({key: this.key, cert: this.cert}, this.onRequest.bind(this))
				.listen(this.port, (err: Error) => {
					if (err) reject(err);
					else resolve();
				})
				.on("error", err => reject(err));
		});
	}

	private async listenOnHttp (): Promise<void> {
		return new Promise<void>((resolve, reject) => {
			httpServer(this.onRequest.bind(this))
				.listen(this.port, (err: Error) => {
					if (err) reject(err);
					else resolve();
				})
				.on("error", err => reject(err));
		});
	}

	private notFound (response: ServerResponse, path: string): void {
		this.respond(response, StatusCode.NOT_FOUND, `The path: '${path}' could not be found!`, path);
	}

	private ok (response: ServerResponse, contents: string|Buffer, path: string): void {
		this.respond(response, StatusCode.OK, contents, path);
	}

	/*
	private created (response: ServerResponse, contents: string|Buffer, path: string): void {
		this.respond(response, 201, contents, path);
	}
	*/

	private respond (response: ServerResponse, statusCode: number, contents: string|Buffer, path: string): void {
		response.writeHead(statusCode, this.getResponseHeaders(path));
		response.end(contents, "utf-8");
	}

	private isGzippedFilePath (path: string): boolean {
		return path.endsWith(".gz");
	}

	private getResponseHeaders (path: string): IResponseHeaders {
		const responseHeaders: IResponseHeaders = {"Content-Type": this.getMimeType(path)};
		if (Config.PRODUCTION && this.isGzippedFilePath(path)) {
			responseHeaders["content-encoding"] = "gzip";
		}
		return responseHeaders;
	}

	private resourceSupportsGzip (path: string): boolean {
		// In general, all resources except media and PDFs should be gzipped.
		return  !path.endsWith(".pdf") &&
						!path.endsWith(".jpg") &&
						!path.endsWith(".jpeg") &&
						!path.endsWith(".png") &&
						!path.endsWith(".webp");
	}

	private requestAcceptsGzip (request: ServerRequest): boolean {
		const acceptHeaders =  request.headers["accept-encoding"];
		return acceptHeaders.includes("gzip");
	}

	private getMimeType (path: string): string {
		const actualFilePath = path.endsWith(".gz") ? path.slice(0, path.indexOf(".gz")) : path;
		return mime.lookup(actualFilePath) || DevServer.DEFAULT_MIME_TYPE;
	}

	private isMobile (agent: string): boolean {
		return /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(agent);
	}

	private resolveIndexHTML (agent: string): string {
		return `index.${this.isMobile(agent) ? "mobile" : "desktop"}.html`;
	}

	private normalizeUrlPath (request: ServerRequest): string {
		return (request.url || "").split("?")[0];
	}

	private normalizeFilePath (request: ServerRequest, urlPath: string): string {
		const userAgent = request.headers["user-agent"];
		let filePath = resolve(`${this.contentBase}${urlPath}`);

		if (urlPath.endsWith("/")) {
			filePath = resolve(filePath, this.resolveIndexHTML(userAgent));
		}

		if (Config.PRODUCTION && this.resourceSupportsGzip(urlPath) && this.requestAcceptsGzip(request)) {
			filePath = `${filePath}.gz`;
		}
		return filePath;
	}

	private getFilePath (request: ServerRequest): string {
		const urlPath = this.normalizeUrlPath(request);
		return this.normalizeFilePath(request, urlPath);
	}

	private async onRequest (request: ServerRequest, response: ServerResponse): Promise<void> {
		const normalizedFilePath = this.getFilePath(request);
		try {
			const buffer = await read(normalizedFilePath);
			this.ok(response, buffer, normalizedFilePath);

		} catch (e) {
			this.notFound(response, normalizedFilePath);
		}
	}

}