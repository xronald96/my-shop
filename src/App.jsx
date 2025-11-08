import { Navigate, Route, Routes } from 'react-router-dom';
import AppLayout from './layouts/AppLayout/AppLayout.jsx';
import ProductListPage from './pages/ProductListPage/ProductListPage.jsx';
import ProductDetailsPage from './pages/ProductDetailsPage/ProductDetailsPage.jsx';

const App = () => (
	<Routes>
		<Route element={<AppLayout />}>
			<Route index element={<ProductListPage />} />
			<Route path='product/:id' element={<ProductDetailsPage />} />
			<Route path='*' element={<Navigate to='/' replace />} />
		</Route>
	</Routes>
);

export default App;
