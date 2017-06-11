export interface IDOMOperations {
	rootElement: HTMLElement;
	body: HTMLBodyElement;
	attachToRoot (element: HTMLElement): void;
	breakOut (from: Element, element: Element): void;
	breakIn (element: Element): void;
}