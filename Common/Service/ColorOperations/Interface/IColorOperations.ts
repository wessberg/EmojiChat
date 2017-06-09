export interface IColorOperations {
	takeInner (color: string): string;
	toHex (color: string): string;
	toRgb (color: string): string;
	toHsl (color: string): string;
	toHsv (color: string): string;
	randomHexColor (): string;
	randomRgbColor (): string;
	randomHsvColor (): string;
	randomHslColor (): string;
	saturate (color: string, percentage: number): string;
	lighten (color: string, percentage: number): string;
	isLight (color: string, luminance?: number): boolean;
}