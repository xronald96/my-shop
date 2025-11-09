import './ProductDetailsPage.css';
import '../../styles/utilities.css';
import { Link, useParams } from 'react-router-dom';
import { useProductDetails } from '../../hooks/useProductDetails.js';
import Loader from '../../components/Loader/Loader.jsx';
import ErrorState from '../../components/ErrorState/ErrorState.jsx';
import { useEffect, useState } from 'react';
import { addProductToCart } from '../../services/api.js';
import { useCart } from '../../hooks/useCart.js';
import StateMessage from '../../components/StateMessage/StateMessage.jsx';
import { useBreadcrumbs } from '../../hooks/useBreadcrumbs.js';

const buildSpecs = (product) =>
	[
		{ label: 'Marca', value: product?.brand },
		{ label: 'Modelo', value: product?.model },
		{ label: 'Precio', value: product?.price ? `${product.price} €` : null },
		{ label: 'CPU', value: product?.cpu },
		{ label: 'RAM', value: product?.ram },
		{ label: 'Sistema Operativo', value: product?.os },
		{ label: 'Resolucion', value: product?.displayResolution },
		{ label: 'Bateria', value: product?.battery },
		{ label: 'Camaras', value: [product?.primaryCamera, product?.secondaryCmera].filter(Boolean).join(' / ') },
		{ label: 'Dimensiones', value: product?.dimentions },
		{ label: 'Peso', value: product?.weight ? `${product.weight} g` : null },
	].filter((item) => item.value);

const ProductDetailsPage = () => {
	const { id } = useParams();
	const { data: product, loading, error } = useProductDetails(id);
	const { setCount } = useCart();
	const { setBreadcrumbs } = useBreadcrumbs();
	const [selectedColor, setSelectedColor] = useState('');
	const [selectedStorage, setSelectedStorage] = useState('');
	const [feedback, setFeedback] = useState(null);
	const [submitting, setSubmitting] = useState(false);

	const colorOptions = product?.options?.colors ?? [];
	const storageOptions = product?.options?.storages ?? [];

	useEffect(() => {
		if (!product) return;
		const initialColor = product.options?.colors?.[0]?.code ?? '';
		const initialStorage = product.options?.storages?.[0]?.code ?? '';
		setSelectedColor(initialColor);
		setSelectedStorage(initialStorage);
	}, [product]);

	const handleSubmit = async (event) => {
		event.preventDefault();
		if (!product || !selectedColor || !selectedStorage) return;
		setSubmitting(true);
		setFeedback(null);
		try {
			const { count } = await addProductToCart({
				id: product.id,
				colorCode: selectedColor,
				storageCode: selectedStorage,
			});
			setCount((prev) => {
				if (typeof count === 'number' && count > prev) return count;
				return prev + 1;
			});
			setFeedback({ type: 'success', message: 'Producto añadido correctamente.' });
		} catch {
			setFeedback({ type: 'error', message: 'No pudimos añadir el producto.' });
		} finally {
			setSubmitting(false);
		}
	};

	useEffect(() => {
		const crumbs = product
			? [
					{ label: 'Productos', to: '/' },
					{ label: product.model, to: `/product/${product.id}` },
			  ]
			: [{ label: 'Productos', to: '/' }];
		setBreadcrumbs(crumbs);
	}, [product, setBreadcrumbs]);

	if (loading) {
		return (
			<section className='product-details'>
				<Link to='/' className='back-link'>
					← Volver
				</Link>
				<Loader />
			</section>
		);
	}

	if (error || !product) {
		return (
			<section className='product-details'>
				<Link to='/' className='back-link'>
					← Volver
				</Link>
				<ErrorState message='No pudimos cargar el producto.' />
			</section>
		);
	}

	const specs = buildSpecs(product);

	return (
		<section className='product-details'>
			<header className='product-details__header'>
				<div>
					<Link to='/' className='back-link'>
						← Volver
					</Link>
					<h1>{product.model}</h1>
					<p className='muted'>{product.brand}</p>
				</div>
			</header>
			<div className='product-details__body'>
				<div className='product-details__media'>
					<img src={product.imgUrl} alt={`${product.brand} ${product.model}`} />
				</div>
				<div className='product-details__info'>
					<header>
						<p className='product-details__price'>{product.price ? `${product.price} €` : 'Consultar'}</p>
					</header>
					<ul className='product-details__specs'>
						{specs.map((spec) => (
							<li key={spec.label}>
								<span>{spec.label}</span>
								<strong>{spec.value}</strong>
							</li>
						))}
					</ul>
					<form className='product-details__form' onSubmit={handleSubmit}>
						<div className='product-details__selects'>
							<label>
								<span>Almacenamiento</span>
								<select value={selectedStorage} onChange={(event) => setSelectedStorage(event.target.value)}>
									{storageOptions.map((option) => (
										<option key={option.code} value={option.code}>
											{option.name}
										</option>
									))}
								</select>
							</label>
							<label>
								<span>Color</span>
								<select value={selectedColor} onChange={(event) => setSelectedColor(event.target.value)}>
									{colorOptions.map((option) => (
										<option key={option.code} value={option.code}>
											{option.name}
										</option>
									))}
								</select>
							</label>
						</div>
						<button type='submit' disabled={submitting || !selectedColor || !selectedStorage}>
							{submitting ? 'Añadiendo…' : 'Añadir a la cesta'}
						</button>
						{feedback && <StateMessage variant={feedback.type === 'error' ? 'error' : 'info'}>{feedback.message}</StateMessage>}
					</form>
				</div>
			</div>
		</section>
	);
};

export default ProductDetailsPage;
