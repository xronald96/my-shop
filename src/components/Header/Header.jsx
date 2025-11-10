import './Header.css';
import { Link, NavLink } from 'react-router-dom';
import { useCart } from '../../hooks/useCart.js';
import { useBreadcrumbs } from '../../hooks/useBreadcrumbs.js';

const Header = () => {
	const { count } = useCart();
	const { items } = useBreadcrumbs();

	return (
		<header className='app-header'>
			<div className='brand'>
				<Link to='/'>myShop</Link>
			</div>
			<nav aria-label='Breadcrumb' className='breadcrumbs'>
				<ol>
					{items.map((crumb, index) => {
						const isLast = index === items.length - 1;
						return (
							<li key={`${crumb.label}-${index}`}>
								{isLast ? <span>{crumb.label}</span> : <NavLink to={crumb.to}>{crumb.label}</NavLink>}
							</li>
						);
					})}
				</ol>
			</nav>
			<div className='cart-chip' aria-live='polite'>
				<span>Cart</span>
				<strong>{count}</strong>
			</div>
		</header>
	);
};

export default Header;
