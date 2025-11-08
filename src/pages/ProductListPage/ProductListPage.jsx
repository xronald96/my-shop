import './ProductListPage.css';
import '../../styles/utilities.css';
import { useProducts } from '../../hooks/useProducts.js';
import Loader from '../../components/Loader/Loader.jsx';
import ErrorState from '../../components/ErrorState/ErrorState.jsx';
import ProductCard from '../../components/ProductCard/ProductCard.jsx';

const ProductListPage = () => {
	const { data, loading, error } = useProducts();

	return (
		<section className='product-list'>
			<header className='product-list__header'>
				<div>
					<p className='muted'>Catalogo</p>
					<h1>Listado de productos</h1>
				</div>
			</header>
			<div className='product-list__body'>
				{loading && <Loader />}
				{error && !loading && <ErrorState />}
				{!loading && !error && (
					<ul className='product-list__grid'>
						{data.map((product) => (
							<ProductCard key={product.id} product={product} />
						))}
					</ul>
				)}
			</div>
		</section>
	);
};

export default ProductListPage;
