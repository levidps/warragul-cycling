export const mapHSL = (temp: number | undefined, rain: number | undefined, time: number | undefined): {
	h: number;
	s: number;
	l: number
} => {

	const hue = getHue(temp);
	const saturation = !rain || rain < 1.5 ? 90 : 75;
	const lightness: number = !time || time < 7 || time > 21 ? 25 : 50;

	return { h: hue, s: saturation, l: lightness};
}

const getHue = (temp: number | undefined) => {
	if (!temp)
		return 40;

	switch(true) {
		case temp > 30:
			return 20;

		default:
		case temp <= 30 && temp > 24:
			return 40;

		case temp <= 24 && temp > 15:
			return 155;

		case temp <= 15 && temp > 8:
			return 185;

		case temp <= 8:
			return 200;
	}
}