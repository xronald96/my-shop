import './ProductListPage.css';
import '../../styles/utilities.css';
import { useEffect, useMemo, useState } from 'react';
import { useProducts } from '../../hooks/useProducts.js';
import Loader from '../../components/Loader/Loader.jsx';
import ErrorState from '../../components/ErrorState/ErrorState.jsx';
import ProductCard from '../../components/ProductCard/ProductCard.jsx';
import SearchBar from '../../components/SearchBar/SearchBar.jsx';
import EmptyState from '../../components/EmptyState/EmptyState.jsx';
import { filterProducts } from '../../utils/filterProducts.js';
import { useBreadcrumbs } from '../../hooks/useBreadcrumbs.js';

const ProductListPage = () => {
	const { data, loading, error } = useProducts();
	const { setBreadcrumbs } = useBreadcrumbs();
	const [query, setQuery] = useState('');

	const filteredProducts = useMemo(() => filterProducts(data, query), [data, query]);

	useEffect(() => {
		setBreadcrumbs([{ label: 'Productos', to: '/' }]);
	}, [setBreadcrumbs]);

	return (
		<section className='product-list'>
			<header className='product-list__header'>
				<div>
					<p className='muted'>Catalogo</p>
					<h1>Listado de productos</h1>
				</div>
				<SearchBar value={query} onChange={setQuery} />
			</header>
			<div className='product-list__body'>
				{loading && <Loader />}
				{error && !loading && <ErrorState />}
				{!loading && !error && filteredProducts.length === 0 && (
					<EmptyState
						title='No encontramos coincidencias'
						description={`No hay resultados para "${query}". Intenta con otra marca o modelo.`}
					/>
				)}
				{!loading && !error && filteredProducts.length > 0 && (
					<ul className='product-list__grid'>
						{filteredProducts.map((product) => (
							<ProductCard key={product.id} product={product} />
						))}
					</ul>
				)}
			</div>
		</section>
	);
};

export default ProductListPage;
