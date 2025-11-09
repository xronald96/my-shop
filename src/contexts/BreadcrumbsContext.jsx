import { createContext, useCallback, useMemo, useState } from 'react';

const DEFAULT_BREADCRUMBS = [{ label: 'Productos', to: '/' }];

const BreadcrumbsContext = createContext({
	items: DEFAULT_BREADCRUMBS,
	setBreadcrumbs: () => {},
});

export const BreadcrumbsProvider = ({ children }) => {
	const [items, setItems] = useState(DEFAULT_BREADCRUMBS);

	const setBreadcrumbs = useCallback((next) => {
		setItems(next.length ? next : DEFAULT_BREADCRUMBS);
	}, []);

	const value = useMemo(() => ({ items, setBreadcrumbs }), [items, setBreadcrumbs]);

	return <BreadcrumbsContext.Provider value={value}>{children}</BreadcrumbsContext.Provider>;
};

BreadcrumbsProvider.Context = BreadcrumbsContext;
