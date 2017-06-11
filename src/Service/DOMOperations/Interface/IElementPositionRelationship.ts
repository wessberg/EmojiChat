export interface IElementPositionRelationship {
	relatedElement?: Node|null;
	parentNode: Node|null;
	relation?: "parentNode"|"previousElementSibling"|"nextElementSibling";
}