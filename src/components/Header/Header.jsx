import './Header.css';
import { Link, NavLink } from 'react-router-dom';
import { useCart } from '../../hooks/useCart.js';

const Header = () => {
	const { count } = useCart();

	return (
		<header className='app-header'>
			<div className='brand'>
				<Link to='/'>myShop</Link>
			</div>
			<nav aria-label='Principal'>
				<ul>
					<li>
						<NavLink to='/' end>
							Listado
						</NavLink>
					</li>
				</ul>
			</nav>
			<div className='cart-chip' aria-live='polite'>
				<span>Carrito</span>
				<strong>{count}</strong>
			</div>
		</header>
	);
};

export default Header;
