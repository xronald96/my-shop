import { useContext } from 'react';
import { CartProvider } from '../contexts/CartContext.jsx';

export const useCart = () => useContext(CartProvider.Context);
