import { useEffect, useState } from 'react';
import { fetchProductById } from '../services/api.js';

export const useProductDetails = (id) => {
	const [data, setData] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		if (!id) return undefined;
		const controller = new AbortController();
		const { signal } = controller;

		const load = async () => {
			setLoading(true);
			try {
				const product = await fetchProductById(id, { signal });
				setData(product);
				setError(null);
			} catch (err) {
				if (err.name !== 'AbortError') {
					setError(err);
				}
			} finally {
				setLoading(false);
			}
		};

		load();

		return () => {
			controller.abort();
		};
	}, [id]);

	return { data, loading, error };
};
