export const filterProducts = (products, query) => {
	if (!query) return products;
	const normalized = query.trim().toLowerCase();
	if (!normalized) return products;

	return products.filter((product) => {
		const brand = product.brand?.toLowerCase() ?? '';
		const model = product.model?.toLowerCase() ?? '';
		return brand.includes(normalized) || model.includes(normalized);
	});
};
