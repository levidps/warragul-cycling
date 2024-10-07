import { mapHSL } from "./colors.ts";
import { describe, it, expect } from "vitest";

describe('mapHSL', () => {
	const BASE_VALUES = {
		temp: 20,
		rain: 0,
	};

	// temperature tests
	describe('when temp is', () => {
		[
			[33, 20],
			[26, 40],
			[undefined, 40],
			[18, 155],
			[9, 185],
			[5, 200]
		].forEach((hMap) => {
			it(`${hMap[0]} returns ${hMap[1]}`, () => {
				const val = mapHSL(hMap[0], BASE_VALUES.rain);
				expect(val.h).toEqual(hMap[1]);
			});
		});
	});

	// rain tests
	describe('when rain is', () => {
		it('less 1.5mm is saturated', () => {
			const val = mapHSL(BASE_VALUES.temp, 1);
			expect(val.s).toEqual(90);
		});

		it('undefined is saturated', () => {
			const val = mapHSL(BASE_VALUES.temp, undefined);
			expect(val.s).toEqual(90);
		})
	});
})