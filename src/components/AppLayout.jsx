import Header from './Header.jsx';
import { Outlet } from 'react-router-dom';

const AppLayout = () => (
	<div className="app-shell">
		<Header />
		<main className="app-content">
			<Outlet />
		</main>
	</div>
);

export default AppLayout;
