import { afterEach, describe, expect, it, vi } from 'vitest';
import { fetchProducts, fetchProductById } from './api.js';
import { clearCache } from './cacheClient.js';

const mockJsonResponse = (payload) => ({
	ok: true,
	json: () => Promise.resolve(payload),
});

describe('api service', () => {
	afterEach(() => {
		clearCache();
		vi.restoreAllMocks();
	});

	it('fetches and caches the product list', async () => {
		const fetchSpy = vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce(mockJsonResponse([{ id: '1' }]));

		const firstCall = await fetchProducts();
		expect(firstCall).toEqual([{ id: '1' }]);
		expect(fetchSpy).toHaveBeenCalledTimes(1);

		fetchSpy.mockClear();
		const secondCall = await fetchProducts();
		expect(secondCall).toEqual([{ id: '1' }]);
		expect(fetchSpy).not.toHaveBeenCalled();
	});

	it('returns cached detail when the refresh fails', async () => {
		const product = { id: 'abc', model: 'Demo' };
		vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce(mockJsonResponse(product));
		await fetchProductById(product.id);

		vi.spyOn(globalThis, 'fetch').mockRejectedValueOnce(new Error('network down'));
		const fallback = await fetchProductById(product.id, { forceRefresh: true });
		expect(fallback).toEqual(product);
	});
});
