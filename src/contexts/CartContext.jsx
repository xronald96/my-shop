import { createContext, useEffect, useMemo, useState } from 'react';

const CART_COUNT_KEY = 'cart-count';

const CartContext = createContext({
	count: 0,
	setCount: () => {},
});

const readInitialCount = () => {
	try {
		const stored = window?.localStorage?.getItem(CART_COUNT_KEY);
		return stored ? Number(stored) || 0 : 0;
	} catch {
		return 0;
	}
};

export const CartProvider = ({ children }) => {
	const [count, setCount] = useState(readInitialCount);

	useEffect(() => {
		window.localStorage.setItem(CART_COUNT_KEY, String(count));
	}, [count]);

	const value = useMemo(() => ({ count, setCount }), [count]);

	return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

CartProvider.Context = CartContext;
