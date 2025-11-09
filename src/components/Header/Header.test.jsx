import { describe, expect, it, vi } from 'vitest';
import { renderToString } from 'react-dom/server';
import Header from './Header.jsx';

vi.mock('react-router-dom', () => ({
	Link: ({ children }) => <span>{children}</span>,
	NavLink: ({ children }) => <span>{children}</span>,
}));

const renderHeader = () => renderToString(<Header />);

describe('Header', () => {
	it('renderiza la marca principal', () => {
		expect(renderHeader()).toContain('myShop');
	});

	it('incluye enlaces de navegacion', () => {
		const html = renderHeader();
		expect(html).toContain('Productos');
	});
});
