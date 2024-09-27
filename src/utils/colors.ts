export const mapHSL = (temp: number | undefined, rain: number | undefined, time: number | undefined): {
	h: number;
	s: number;
	l: number
} => {

	const hueBase = 40;
	const saturationBase = 85;
	const lightnessBase = 50;

	return { h: 0, s: 0, l: 0};
}