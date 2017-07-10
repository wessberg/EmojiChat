/**
 * This little script updates the generated ServiceWorker to play nice with ITUs Apache setup. It basically rewrites some of the cache resolving stuff.
 */

const {readFileSync, writeFileSync} = require("fs");
const {join} = require("path");

const ROOT = process.cwd();
const DIST = join(ROOT, "dist");
const SW_NAME = "service-worker.js";
const SW_PATH = join(DIST, SW_NAME);
const contents = readFileSync(SW_PATH, "utf8").toString();
const replaceAfter = `if (!cachedUrls.has(cacheKey)) {`;
const replaceUpTo = `return cleanResponse(response).then(function(responseToCache) {`;
const replaceAtIndex = contents.indexOf(replaceAfter) + replaceAfter.length;
const continueFromIndex = contents.indexOf(replaceUpTo);
const upToContents = contents.slice(0, replaceAtIndex);
const afterContents = contents.slice(continueFromIndex);

const middle = `
let fetchKey = !cacheKey.startsWith("https://itu.dk/people/frra/EmojiChat/")
	? \`https://itu.dk/people/frra/EmojiChat/\${cacheKey.slice("https://itu.dk/".length)}\`
	: cacheKey;
var request = new Request(fetchKey, {credentials: 'same-origin'});
return fetch(request).then(function (response) {
	// Bail out of installation unless we get back a 200 OK for
	// every request.
	if (!response.ok) {
		throw new Error('Request for ' + fetchKey + ' returned a ' +
			'response with status ' + response.status);
	}
`;

writeFileSync(SW_PATH, `${upToContents}${middle}${afterContents}`);