import { useEffect, useState } from 'react';
import { fetchProducts } from '../services/api.js';
export function useProducts() {
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const controller = new AbortController();
		const { signal } = controller;

		async function loadProducts() {
			try {
				setLoading(true);
				const products = await fetchProducts({ signal });
				setData(products);
				setError(null);
			} catch (err) {
				if (err.name !== 'AbortError') {
					setError(err);
				}
			} finally {
				setLoading(false);
			}
		}

		loadProducts();

		return () => {
			controller.abort();
		};
	}, []);

	return { data, loading, error };
}
