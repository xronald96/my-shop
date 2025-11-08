import { describe, expect, it } from 'vitest';
import { filterProducts } from './filterProducts.js';

const sample = [
	{ id: '1', brand: 'Apple', model: 'iPhone 14' },
	{ id: '2', brand: 'Samsung', model: 'Galaxy S23' },
	{ id: '3', brand: 'Google', model: 'Pixel 8' },
];

describe('filterProducts', () => {
	it('returns the original list when query is empty', () => {
		expect(filterProducts(sample, '')).toEqual(sample);
	});

	it('matches brand or model ignoring case', () => {
		expect(filterProducts(sample, 'galaxy')).toEqual([sample[1]]);
		expect(filterProducts(sample, 'google')).toEqual([sample[2]]);
	});

	it('returns empty array when nothing matches', () => {
		expect(filterProducts(sample, 'nothing')).toEqual([]);
	});
});
