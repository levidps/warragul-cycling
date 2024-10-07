import { dateFormat, hourFormat } from "./dates.ts";
import { describe, expect, it } from "vitest";

const TEST_DATE: number = 1728278687;
const INVALID_DATE: number = null as unknown as number;

describe('dateFormat', () => {
	it('valid date input formatted to `ddd DD/MM', () => {
		const formatted = dateFormat(TEST_DATE);
		expect(formatted).toEqual('mon 7/9')
	});

	it('invalid date returns `null`', () => {
		const formatted = dateFormat(INVALID_DATE);
		expect(formatted).toEqual(null);
	});
});

describe('hourFormat `HAA`', () => {
	it('valid ', () => {
		const formatted = hourFormat(TEST_DATE);
		expect(formatted).toEqual('4PM');
	});

	it('invalid date returns `null`', () => {
		const formatted = hourFormat(INVALID_DATE);
		expect(formatted).toEqual(null);
	});
});