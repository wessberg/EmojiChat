export interface IDOMOperations {
	attachToRoot (element: HTMLElement): void;
	rootElement: HTMLElement;
	body: HTMLBodyElement;
	breakOut (from: Element, element: Element): void;
	breakIn (element: Element): void;
}