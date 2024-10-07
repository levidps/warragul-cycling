import { describe, expect, it, test } from "vitest";
import { angleToDirection, ANGLES } from "./maths.ts";

describe('angleToDirection', () => {
	let count: number = 1;
	describe.sequential('at angle', () => {
		while (count < (ANGLES.length - 1)) {
			const AS = count * 22.5;
			test(`${AS} will return ${} == ${ANGLES[count]}`, () => {
				const formatted = angleToDirection(AS);
				expect(formatted).toEqual(ANGLES[count]);
			});
			count += 1;
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