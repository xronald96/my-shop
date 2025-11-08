import './ProductDetailsPage.css';
import '../../styles/utilities.css';
import { Link, useParams } from 'react-router-dom';

const ProductDetailsPage = () => {
	const { id } = useParams();

	return (
		<section className='product-details'>
			<header className='product-details__header'>
				<div>
					<Link to='/' className='back-link'>
						← Volver
					</Link>
					<h1>Detalle del producto</h1>
					<p className='muted'>ID seleccionado: {id}</p>
				</div>
			</header>
			<div className='product-details__body'>
				<p>Pendiente: ficha del dispositivo.</p>
			</div>
		</section>
	);
};

export default ProductDetailsPage;
