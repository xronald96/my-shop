import { useContext } from 'react';
import { BreadcrumbsProvider } from '../contexts/BreadcrumbsContext.jsx';

export const useBreadcrumbs = () => useContext(BreadcrumbsProvider.Context);
