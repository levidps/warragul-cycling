import { describe, expect, it, test } from "vitest";
import { angleToDirection, ANGLES, round } from "./maths.ts";

describe('angleToDirection', () => {
	describe.sequential('at angle', () => {
		for (let i = 0; i < ANGLES.length; i++) {
			const AS = i * 22.5 + 5;
			test(`${AS} will return ${ANGLES[i]}`, () => {
				const formatted = angleToDirection(AS);
				expect(formatted).toEqual(ANGLES[i]);
			});
		}
	});

	it('convert int below 0 to valid angle', () => {
		const ANGLE = -340;
		const formatted = angleToDirection(ANGLE);

		expect(formatted).toEqual('N');
	});

	it('converts int above 360 to valid angle', () => {
		const ANGLE = 365;
		const formatted = angleToDirection(ANGLE);

		expect(formatted).toEqual('N');
	});
});

describe('round', () => {
	it('rounds number down', () => {
		const val = round(2.4);
		expect(val).toEqual(2);});

	it('rounds number up', () => {
		const val = round(2.5);
		expect(val).toEqual(3);});

	it('returns even number', () => {
		const val = round(2);
		expect(val).toEqual(2);
	})
})