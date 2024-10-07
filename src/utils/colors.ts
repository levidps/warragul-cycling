export const mapHSL = (temp: number | undefined, rain: number | undefined, time: number | undefined): {
	h: number;
	s: number;
	l: number
} => {

	const hue = !temp || temp > 25 ?
	                40 :
	                temp > 15 && temp <= 25 ?
		                25 :
		                15;
	const saturation = !rain || rain < 1.5 ? 90 : 75;
	const lightness: number = !time || time < 7 || time > 21 ? 25 : 50;

	return { h: hue, s: saturation, l: lightness};
}