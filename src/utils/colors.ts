export const mapHSL = (temp: number | undefined, rain: number | undefined): {
	h: number;
	s: number;
	l: number;
} => {
	const hue = getHue(temp);
	const saturation = !rain || rain < 1.5 ? 75 : 25;
	const lightness: number = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 21 : 70;

	return { h: hue, s: saturation, l: lightness};
}

export const assignHSLValues = (el: HTMLElement, {h, s, l}: {h: number, s: number, l: number}): void => {
	if (!el)
		return;

	el.style.setProperty('--color-hue', `${h}`);
	el.style.setProperty('--color-sat', `${s}%`);
	el.style.setProperty('--color-light', `${l}%`);
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

		case temp <= 24 && temp > 19:
			return 145;

		case temp <= 19 && temp > 14:
			return 165;

		case temp <= 14 && temp > 8:
			return 185;

		case temp <= 8:
			return 200;
	}
}