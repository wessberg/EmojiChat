export interface IElementPositionRelationship {
	relatedElement?: Element|null;
	parentElement: Element|null;
	relation?: "parentElement" | "previousElementSibling" | "nextElementSibling";
}