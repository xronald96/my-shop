import { Link, NavLink } from 'react-router-dom';

const Header = () => (
	<header className="app-header">
		<div className="brand">
			<Link to="/">myShop</Link>
		</div>
		<nav aria-label="Principal">
			<ul>
				<li>
					<NavLink to="/" end>
						Listado
					</NavLink>
				</li>
				<li>
					<NavLink to="/product/demo">Detalle demo</NavLink>
				</li>
			</ul>
		</nav>
	</header>
);

export default Header;
