import { beforeEach, describe, expect, it, vi } from 'vitest';
import { clearCache, getAnyCachedData, getCachedData, setCachedData } from './cacheClient.js';

const uniqueKey = () => `cache:test:${Math.random().toString(36).slice(2)}`;

describe('cacheClient', () => {
beforeEach(() => {
	clearCache();
});

	it('returns data while entry is fresh', () => {
		const key = uniqueKey();
		const payload = { value: 42 };
		setCachedData(key, payload, 1000);

		expect(getCachedData(key)).toEqual(payload);
	});

	it('expires entries after ttl but keeps fallback data', () => {
		vi.useFakeTimers();
		const key = uniqueKey();
		const payload = { value: 'stale' };

		setCachedData(key, payload, 500);
		vi.advanceTimersByTime(1000);

		expect(getCachedData(key)).toBeNull();
		expect(getAnyCachedData(key)).toEqual(payload);
		vi.useRealTimers();
	});
});
