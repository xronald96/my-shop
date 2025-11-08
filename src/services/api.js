export const API_BASE_URL = 'https://itx-frontend-test.onrender.com/api';

const handleResponse = async (promise) => {
	const response = await promise;
	if (!response.ok) {
		const error = await response.text();
		throw new Error(error || 'Error en la solicitud');
	}
	return response.json();
};

export const fetchProducts = () => handleResponse(fetch(`${API_BASE_URL}/product`));

export const fetchProductById = (id) => handleResponse(fetch(`${API_BASE_URL}/product/${id}`));

export const addProductToCart = ({ id, colorCode, storageCode }) =>
	handleResponse(
		fetch(`${API_BASE_URL}/cart`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ id, colorCode, storageCode }),
		}),
	);
