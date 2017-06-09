import {SERVER_CERT, SERVER_KEY} from "../Tool/DevServer/TLS/Keys";
import {IDevServerResource} from "./Interface/IDevServerResource";

export const DevServerResource: IDevServerResource = {
	meta: {
		host: "localhost",
		port: 3000
	},
	tls: {
		key: SERVER_KEY,
		cert: SERVER_CERT
	}
};

