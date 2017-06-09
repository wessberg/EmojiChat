export interface IDevServerTLS {
	key: string;
	cert: string;
}

export interface IDevServerResource {
	meta: IDevServerMeta;
	tls: IDevServerTLS;
}

export interface IDevServerMeta {
	host: string;
	port: number;
}