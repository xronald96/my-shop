import { describe, expect, it, vi } from 'vitest';
import { renderToString } from 'react-dom/server';
import Header from './Header.jsx';

vi.mock('react-router-dom', () => ({
	Link: ({ children }) => <span>{children}</span>,
	NavLink: ({ children }) => <span>{children}</span>,
}));

vi.mock('../../hooks/useCart.js', () => ({
	useCart: () => ({ count: 2 }),
}));

vi.mock('../../hooks/useBreadcrumbs.js', () => ({
	useBreadcrumbs: () => ({ items: [{ label: 'Products', to: '/' }, { label: 'Demo', to: '/demo' }] }),
}));

const renderHeader = () => renderToString(<Header />);

describe('Header', () => {
	it('renders brand name', () => {
		expect(renderHeader()).toContain('myShop');
	});

	it('includes navigation trail and cart count', () => {
		const html = renderHeader();
		expect(html).toContain('Products');
		expect(html).toContain('Demo');
		expect(html).toContain('2');
	});
});
