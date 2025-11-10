import './ProductCard.css';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => (
	<li className='product-card'>
		<Link to={`/product/${product.id}`} className='product-card__link'>
			<div className='product-card__image'>
				<img src={product.imgUrl} alt={`${product.brand} ${product.model}`} loading='lazy' />
			</div>
			<div className='product-card__body'>
				<p className='product-card__brand'>{product.brand}</p>
				<p className='product-card__model'>{product.model}</p>
				<p className='product-card__price'>{product.price ? `${product.price} €` : 'See price'}</p>
			</div>
		</Link>
	</li>
);

export default ProductCard;
