import './ProductCard.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const ProductCard = ({ product }) => {
	const [loaded, setLoaded] = useState(false);
	const [failed, setFailed] = useState(false);

	return (
		<li className='product-card'>
			<Link to={`/product/${product.id}`} className='product-card__link'>
				<div className={`product-card__image ${loaded ? 'is-loaded' : 'is-loading'}`}>
					{failed ? (
						<span className='product-card__placeholder'>Image unavailable</span>
					) : (
						<img
							src={product.imgUrl}
							alt={`${product.brand} ${product.model}`}
							loading='lazy'
							onLoad={() => setLoaded(true)}
							onError={() => setFailed(true)}
						/>
					)}
				</div>
				<div className='product-card__body'>
					<p className='product-card__brand'>{product.brand}</p>
					<p className='product-card__model'>{product.model}</p>
					<p className='product-card__price'>{product.price ? `${product.price} €` : 'See price'}</p>
				</div>
			</Link>
		</li>
	);
};

export default ProductCard;
