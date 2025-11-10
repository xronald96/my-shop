import './EmptyState.css';

const EmptyState = ({ title = 'No results', description = 'Try a different search.' }) => (
	<div className='empty-state'>
		<h3>{title}</h3>
		<p>{description}</p>
	</div>
);

export default EmptyState;
