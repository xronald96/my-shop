import './ProductCard.css';

const ProductCard = ({ product }) => (
	<li className='product-card'>
		<div className='product-card__image'>
			<img src={product.imgUrl} alt={`${product.brand} ${product.model}`} loading='lazy' />
		</div>
		<div className='product-card__body'>
			<p className='product-card__brand'>{product.brand}</p>
			<p className='product-card__model'>{product.model}</p>
			<p className='product-card__price'>{product.price ? `${product.price} €` : 'Consultar'}</p>
		</div>
	</li>
);

export default ProductCard;
