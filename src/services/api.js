export const API_BASE_URL = 'https://itx-frontend-test.onrender.com/api';

export const fetchProducts = async () => {
	const response = await fetch(`${API_BASE_URL}/product`);
	if (!response.ok) {
		throw new Error('Error al cargar productos');
	}
	return response.json();
};


