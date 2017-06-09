import * as tslib_1 from "tslib";
import { readFile } from "fs";
import { createServer as httpServer } from "http";
import { createServer as httpsServer } from "https";
import * as mime from "mime";
import { resolve } from "path";
import { Config } from "@wessberg/environment";
var StatusCode;
(function (StatusCode) {
    StatusCode[StatusCode["NOT_FOUND"] = 404] = "NOT_FOUND";
    StatusCode[StatusCode["OK"] = 200] = "OK";
})(StatusCode || (StatusCode = {}));
function read(path) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            readFile(path, (err, content) => {
                if (err)
                    return reject(err);
                resolve(content);
            });
        });
    });
}
export class DevServer {
    constructor(contentBase, host, port, key, cert) {
        this.contentBase = contentBase;
        this.host = host;
        this.port = port;
        this.key = key instanceof Buffer ? key.toString() : key != null ? key : undefined;
        this.cert = cert instanceof Buffer ? cert.toString() : cert != null ? cert : undefined;
    }
    get protocol() {
        return this.key != null && this.cert != null ? "https" : "http";
    }
    listen() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (this.key != null && this.cert != null)
                yield this.listenOnHttps();
            else
                yield this.listenOnHttp();
            console.log(`Development server listening on ${this.protocol}://${this.host}:${this.port}`);
        });
    }
    listenOnHttps() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                httpsServer({ key: this.key, cert: this.cert }, this.onRequest.bind(this))
                    .listen(this.port, (err) => {
                    if (err)
                        reject(err);
                    else
                        resolve();
                })
                    .on("error", err => reject(err));
            });
        });
    }
    listenOnHttp() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                httpServer(this.onRequest.bind(this))
                    .listen(this.port, (err) => {
                    if (err)
                        reject(err);
                    else
                        resolve();
                })
                    .on("error", err => reject(err));
            });
        });
    }
    notFound(response, path) {
        this.respond(response, StatusCode.NOT_FOUND, `The path: '${path}' could not be found!`, path);
    }
    ok(response, contents, path) {
        this.respond(response, StatusCode.OK, contents, path);
    }
    /*
    private created (response: ServerResponse, contents: string|Buffer, path: string): void {
        this.respond(response, 201, contents, path);
    }
    */
    respond(response, statusCode, contents, path) {
        response.writeHead(statusCode, this.getResponseHeaders(path));
        response.end(contents, "utf-8");
    }
    isGzippedFilePath(path) {
        return path.endsWith(".gz");
    }
    getResponseHeaders(path) {
        const responseHeaders = { "Content-Type": this.getMimeType(path) };
        if (Config.PRODUCTION && this.isGzippedFilePath(path)) {
            responseHeaders["content-encoding"] = "gzip";
        }
        return responseHeaders;
    }
    resourceSupportsGzip(path) {
        // In general, all resources except media and PDFs should be gzipped.
        return !path.endsWith(".pdf") &&
            !path.endsWith(".jpg") &&
            !path.endsWith(".jpeg") &&
            !path.endsWith(".png") &&
            !path.endsWith(".webp");
    }
    requestAcceptsGzip(request) {
        const acceptHeaders = request.headers["accept-encoding"];
        return acceptHeaders.includes("gzip");
    }
    getMimeType(path) {
        const actualFilePath = path.endsWith(".gz") ? path.slice(0, path.indexOf(".gz")) : path;
        return mime.lookup(actualFilePath) || DevServer.DEFAULT_MIME_TYPE;
    }
    isMobile(agent) {
        return /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(agent);
    }
    resolveIndexHTML(agent) {
        return `index.${this.isMobile(agent) ? "mobile" : "desktop"}.html`;
    }
    normalizeUrlPath(request) {
        return (request.url || "").split("?")[0];
    }
    normalizeFilePath(request, urlPath) {
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
    getFilePath(request) {
        const urlPath = this.normalizeUrlPath(request);
        return this.normalizeFilePath(request, urlPath);
    }
    onRequest(request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const normalizedFilePath = this.getFilePath(request);
            try {
                const buffer = yield read(normalizedFilePath);
                this.ok(response, buffer, normalizedFilePath);
            }
            catch (e) {
                this.notFound(response, normalizedFilePath);
            }
        });
    }
}
DevServer.DEFAULT_MIME_TYPE = "text/plain";
//# sourceMappingURL=DevServer.js.map