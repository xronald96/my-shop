import { useEffect, useState } from 'react';
import { fetchProductById } from '../services/api.js';

export const useProductDetails = (id) => {
	const [data, setData] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		if (!id) return undefined;
		let ignore = false;

		const load = async () => {
			setLoading(true);
			try {
				const product = await fetchProductById(id);
				if (!ignore) {
					setData(product);
					setError(null);
				}
			} catch (err) {
				if (!ignore) {
					setError(err);
				}
			} finally {
				if (!ignore) {
					setLoading(false);
				}
			}
		};

		load();

		return () => {
			ignore = true;
		};
	}, [id]);

	return { data, loading, error };
};
