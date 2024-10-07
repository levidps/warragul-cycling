import { describe, expect, it, test } from "vitest";
import { angleToDirection, ANGLES } from "./maths.ts";

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
})