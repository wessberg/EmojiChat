import {IDOMOperations} from "./Interface/IDOMOperations";
import {IElementPositionRelationship} from "./Interface/IElementPositionRelationship";

export class DOMOperations implements IDOMOperations {
	private readonly breakOutRelations: Map<Element, IElementPositionRelationship> = new Map();

	public get body (): HTMLBodyElement {
		return document.getElementsByTagName("body")[0];
	}

	public get rootElement (): HTMLElement {
		return <HTMLElement> document.getElementsByTagName("frame-element")[0];
	}

	public attachToRoot (element: HTMLElement): void {
		this.rootElement.appendChild(element);
	}

	public breakOut (from: Element, element: Element): void {
		if (element.parentElement == null) throw new TypeError(`'breakOut()' could not find any parent associated with the given element: '${element.nodeName.toLowerCase()}'`);

		const uid = from.getAttribute("data-fovea-id");
		if (uid == null) throw new TypeError(`Could not extract an id from the given component: ${from.nodeName.toLowerCase()}`);

		const relation = this.buildRelation(element);
		if (relation == null) throw new ReferenceError(`Could not find anything to break the given element: '${element.nodeName.toLowerCase()}' out of!`);
		this.breakOutRelations.set(element, relation);
		element.setAttribute(`from-data-fovea-id`, uid);
		this.rootElement.appendChild(element);
	}

	public breakIn (element: Element): void {
		const uid = element.getAttribute(`from-data-fovea-id`);
		if (uid == null) throw new ReferenceError(`'breakIn()' could not find any assigned uid on the element: '${element.nodeName.toLowerCase()}' to break in!`);
		element.removeAttribute(`from-data-fovea-id`);
		const relationDict = this.breakOutRelations.get(element);
		if (relationDict == null) throw new ReferenceError(`'breakIn()' could not find any relation associated with the given element. Has it been broken out before?`);
		this.handleRelation(element, relationDict);
		this.breakOutRelations.delete(element);
	}

	private buildRelation (element: Element): IElementPositionRelationship|void {
		const relation: IElementPositionRelationship = {parentElement: element.parentElement};
		if (element.previousElementSibling != null) {
			relation.relatedElement = element.previousElementSibling;
			relation.relation = "previousElementSibling";
		}
		else if (element.nextElementSibling != null) {
			relation.relatedElement = element.nextElementSibling;
			relation.relation = "nextElementSibling";
		}
		else if (element.parentElement != null) {
			relation.relatedElement = relation.parentElement;
			relation.relation = "parentElement";
		}
		else return;
		return relation;
	}

	private handleRelation (element: Element, relationDict: IElementPositionRelationship): void {
		const {relation, parentElement, relatedElement} = relationDict;

		if (relation === "previousElementSibling" && parentElement != null && relatedElement != null) parentElement.insertBefore(element, relatedElement.nextElementSibling);
		else if (relation === "nextElementSibling" && parentElement != null && relatedElement != null) parentElement.insertBefore(element, relatedElement);
		else if (relation === "parentElement" && parentElement != null) parentElement.appendChild(element);
		else throw new ReferenceError(`Didn't know how to handle the given relation: '${relation}'`);
	}

}