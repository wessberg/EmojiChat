import {Component, selector} from "../Component/Component";
import {IAppFooterComponent} from "./Interface/IAppFooterComponent";

@selector("app-footer-element")
export class AppFooterComponent extends Component implements IAppFooterComponent {
	public role = "contentinfo";

	public static styles (): string {
		return `
			
			:host([primary]) {
				background: var(--color-primary-100);
			}
			
			:host([accent]) {
				background: var(--color-accent-100);
			}
			
			:host([dark]) {
				background: var(--color-black-70);
			}
			
			:host([light]) {
				background: var(--color-white-87);
			}

			:host {
				box-sizing: border-box;
				position: relative;
				display: flex;
				width: 100%;
				z-index: 997;
			}
			
			#wrapper {
				position: relative;
				display: inline-flex;
				padding: var(--distance-regular);
				flex-wrap: wrap;
				margin: auto;
				flex-direction: row;
				align-content: space-around;
				justify-content: space-around;
				width: 100%;
			}
			
			.row {
				display: flex;
				flex-direction: column;
				align-content: flex-start;
				justify-content: flex-start;
				margin: var(--distance-minimum);
			}
			
			.rowSlot::slotted(h1),
			.rowSlot::slotted(h2),
			.rowSlot::slotted(h3),
			.rowSlot::slotted(h4),
			.rowSlot::slotted(h5),
			.rowSlot::slotted(h6) {
				text-transform: uppercase !important;
				color: var(--color-white-70) !important;
				margin: 0 0 8px 0 !important;
				line-height: 1 !important;
				order: 0;
			}
			
			.rowSlot::slotted(*) {
				font-size: var(--font-size-caption) !important;
			}
			
			.rowSlot::slotted(anchor-element) {
				color: var(--color-white-100) !important;
			}
			
			.rowSlot::slotted(anchor-element:hover),
			.rowSlot::slotted(anchor-element:focus) {
				color: var(--color-primary-100) !important;
			}
			
			#logoSlot::slotted(*) {
				display: none;
				margin: auto 0 auto var(--distance-regular);
			}
			
			@media screen and (min-width: 415px) {
				#logoSlot::slotted(*) {
					display: block;
				}
				
				#wrapper {
					align-content: flex-start;
					justify-content: flex-start;
				}
			}
			
			@media screen and (min-width: 677px) {
				#wrapper {
					align-content: space-around;
					justify-content: space-around;
				}
			}
			
		`;
	}

	public static markup (): string {
		return `
			<slot id="logoSlot" name="logo"></slot>
			<div id="wrapper">
				<section id="row1" class="row">
					<slot id="row1Slot" class="rowSlot" name="row1"></slot>
				</section>
				<section id="row2" class="row">
					<slot id="row2Slot" class="rowSlot" name="row2"></slot>
				</section>
				<section id="row3" class="row">
					<slot id="row3Slot" class="rowSlot" name="row3"></slot>
				</section>	
				<section id="row4" class="row">
					<slot id="row4Slot" class="rowSlot" name="row4"></slot>
				</section>
				<section id="row5" class="row">
					<slot id="row5Slot" class="rowSlot" name="row5"></slot>
				</section>
				
			</div>
		`;
	}
}