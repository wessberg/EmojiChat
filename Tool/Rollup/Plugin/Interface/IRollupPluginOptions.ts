export interface IRollupOptions {
	dest: string;
	entry: string|string[];
	moduleName?: string;
	format?: string;
	sourceMap?: string;
	treeshake?: boolean;
}

export interface ITransformResult {
	code: string;
	map: string|{ mappings: string };
}