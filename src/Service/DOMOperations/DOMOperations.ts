import {IDOMOperations} from "./Interface/IDOMOperations";
import {IElementPositionRelationship} from "./Interface/IElementPositionRelationship";

export class DOMOperations implements IDOMOperations {
	private static uid: number = 0;
	private static readonly BREAK_OUT_UID_ATTRIBUTE_NAME: string = "break-out-uid";
	private readonly breakOutRelations: Map<Element, IElementPositionRelationship> = new Map();

	public get body (): HTMLBodyElement {
		return document.getElementsByTagName("body")[0];
	}

	public get rootElement (): HTMLElement {
		return <HTMLElement> document.getElementsByTagName("body")[0];
	}

	public attachToRoot (element: HTMLElement): void {
		this.rootElement.appendChild(element);
	}

	public breakOut (from: Element, element: Element): void {
		if (element.parentNode == null) throw new TypeError(`'breakOut()' could not find any parent associated with the given element: '${element.nodeName.toLowerCase()}'`);

		let fromUID: string|null = from.getAttribute(DOMOperations.BREAK_OUT_UID_ATTRIBUTE_NAME);
		if (fromUID == null) {
			fromUID = `${DOMOperations.uid++}`;
			from.setAttribute(DOMOperations.BREAK_OUT_UID_ATTRIBUTE_NAME, fromUID);
		}

		const relation = this.buildRelation(element);
		if (relation == null) throw new ReferenceError(`Could not find anything to break the given element: '${element.nodeName.toLowerCase()}' out of!`);
		this.breakOutRelations.set(element, relation);
		element.setAttribute(`from-${DOMOperations.BREAK_OUT_UID_ATTRIBUTE_NAME}`, fromUID);
		this.rootElement.appendChild(element);
	}

	public breakIn (element: Element): void {
		const uid = element.getAttribute(`from-${DOMOperations.BREAK_OUT_UID_ATTRIBUTE_NAME}`);
		if (uid == null) throw new ReferenceError(`'breakIn()' could not find any assigned uid on the element: '${element.nodeName.toLowerCase()}' to break in!`);
		element.removeAttribute(`from-${DOMOperations.BREAK_OUT_UID_ATTRIBUTE_NAME}`);
		const relationDict = this.breakOutRelations.get(element);
		if (relationDict == null) throw new ReferenceError(`'breakIn()' could not find any relation associated with the given element. Has it been broken out before?`);
		this.handleRelation(element, relationDict);
		this.breakOutRelations.delete(element);
	}

	private buildRelation (element: Element): IElementPositionRelationship|void {
		const relation: IElementPositionRelationship = {parentNode: element.parentNode};
		if (element.previousElementSibling != null) {
			relation.relatedElement = element.previousElementSibling;
			relation.relation = "previousElementSibling";
		}
		else if (element.nextElementSibling != null) {
			relation.relatedElement = element.nextElementSibling;
			relation.relation = "nextElementSibling";
		}
		else if (element.parentNode != null) {
			relation.relatedElement = relation.parentNode;
			relation.relation = "parentNode";
		}
		else return;
		return relation;
	}

	private handleRelation (element: Element, relationDict: IElementPositionRelationship): void {
		const {relation, parentNode, relatedElement} = relationDict;

		if (relation === "previousElementSibling" && parentNode != null && relatedElement != null) parentNode.insertBefore(element, relatedElement.nextSibling);
		else if (relation === "nextElementSibling" && parentNode != null && relatedElement != null) parentNode.insertBefore(element, relatedElement);
		else if (relation === "parentNode" && parentNode != null) parentNode.appendChild(element);
		else throw new ReferenceError(`Didn't know how to handle the given relation: '${relation}'`);
	}

}