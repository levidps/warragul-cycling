import { mapHSL } from "./colors.ts";
import { describe, it, expect } from "vitest";

describe('mapHSL', () => {
	const BASE_VALUES = {
		temp: 20,
		rain: 0,
		time: 12,
	};

	// temperature tests
	describe('when temp is', () => {
		it('hot hue is red', () => {
			const val = mapHSL(30, BASE_VALUES.rain, BASE_VALUES.time);
			expect(val.h).toEqual(40);
		});

		it('undefined is red', () => {
			const val = mapHSL(undefined, BASE_VALUES.rain, BASE_VALUES.time);
			expect(val.h).toEqual(40);
		})
	});

	// rain tests
	describe('when rain is', () => {
		it('less 1.5mm is saturated', () => {
			const val = mapHSL(BASE_VALUES.temp, 1, BASE_VALUES.time);
			expect(val.s).toEqual(90);
		});

		it('undefined is saturated', () => {
			const val = mapHSL(BASE_VALUES.temp, undefined, BASE_VALUES.time);
			expect(val.s).toEqual(90);
		})
	});

	// time tests
	describe('when time is', () => {
		it('noon it is light', () => {
			const val = mapHSL(BASE_VALUES.temp, BASE_VALUES.rain, 12);
			expect(val.l).toEqual(50);
		});

		it('undefined it is dark', () => {
			const val = mapHSL(BASE_VALUES.temp, BASE_VALUES.rain, undefined);
			expect(val.l).toEqual(25);
		})

	});
})