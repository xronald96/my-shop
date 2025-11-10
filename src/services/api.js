import { cacheKeys, getAnyCachedData, getCachedData, setCachedData } from './cacheClient.js';

export const API_BASE_URL = 'https://itx-frontend-test.onrender.com/api';

const handleResponse = async (promise) => {
	const response = await promise;
	if (!response.ok) {
		const error = await response.text();
		throw new Error(error || 'Error en la solicitud');
	}
	return response.json();
};

const withCache = async (cacheKey, fetcher, { forceRefresh = false } = {}) => {
	const cached = !forceRefresh ? getCachedData(cacheKey) : null;
	if (cached) return cached;

	const fallback = getAnyCachedData(cacheKey);

	try {
		const data = await fetcher();
		setCachedData(cacheKey, data);
		return data;
		} catch (error) {
			if (fallback) {
				console.warn('Using cached data because the fetch failed:', error.message);
				return fallback;
			}
			throw error;
	}
};

export const fetchProducts = ({ signal, forceRefresh = false } = {}) =>
	withCache(
		cacheKeys.PRODUCTS,
		() => handleResponse(fetch(`${API_BASE_URL}/product`, { signal })),
		{ forceRefresh },
	);

export const fetchProductById = (id, { signal, forceRefresh = false } = {}) =>
	withCache(
		cacheKeys.productDetail(id),
		() => handleResponse(fetch(`${API_BASE_URL}/product/${id}`, { signal })),
		{ forceRefresh },
	);

export const addProductToCart = ({ id, colorCode, storageCode }) =>
	handleResponse(
		fetch(`${API_BASE_URL}/cart`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ id, colorCode, storageCode }),
		}),
	);
