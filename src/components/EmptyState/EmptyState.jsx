import './EmptyState.css';

const EmptyState = ({ title = 'Sin resultados', description = 'Prueba con otra busqueda.' }) => (
	<div className='empty-state'>
		<h3>{title}</h3>
		<p>{description}</p>
	</div>
);

export default EmptyState;
