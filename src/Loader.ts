const getScript = (): HTMLScriptElement => {
	const script = <HTMLScriptElement> document.createElement("script");
	script.type = "text/javascript";
	script.defer = true;
	return script;
};

export async function addScript (source: string): Promise<void> {
	return new Promise<void>(resolve => {
		const script = getScript();
		script.src = source;
		document.head.appendChild(script);
		script.onload = () => {
			resolve();
			(<any>script).onload = null;
		};
	});
}