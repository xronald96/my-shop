import { Navigate, Route, Routes } from 'react-router-dom';
import AppLayout from './layouts/AppLayout/AppLayout.jsx';
import ProductListPage from './pages/ProductListPage/ProductListPage.jsx';
import ProductDetailsPage from './pages/ProductDetailsPage/ProductDetailsPage.jsx';
import { CartProvider } from './contexts/CartContext.jsx';
import { BreadcrumbsProvider } from './contexts/BreadcrumbsContext.jsx';

const App = () => (
	<CartProvider>
		<BreadcrumbsProvider>
			<Routes>
				<Route element={<AppLayout />}>
					<Route index element={<ProductListPage />} />
					<Route path='product/:id' element={<ProductDetailsPage />} />
					<Route path='*' element={<Navigate to='/' replace />} />
				</Route>
			</Routes>
		</BreadcrumbsProvider>
	</CartProvider>
);

export default App;
