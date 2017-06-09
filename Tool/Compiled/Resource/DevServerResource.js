import { SERVER_CERT, SERVER_KEY } from "../Tool/DevServer/TLS/Keys";
export const DevServerResource = {
    meta: {
        host: "localhost",
        port: 3000
    },
    tls: {
        key: SERVER_KEY,
        cert: SERVER_CERT
    }
};
//# sourceMappingURL=DevServerResource.js.map