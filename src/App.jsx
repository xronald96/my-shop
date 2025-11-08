import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import AppLayout from './components/AppLayout.jsx';
import ProductListPage from './pages/ProductListPage.jsx';
import ProductDetailsPage from './pages/ProductDetailsPage.jsx';

const App = () => (
	<Routes>
		<Route element={<AppLayout />}>
			<Route index element={<ProductListPage />} />
			<Route path="product/:id" element={<ProductDetailsPage />} />
			<Route path="*" element={<Navigate to="/" replace />} />
		</Route>
	</Routes>
);

export default App;
