import './ErrorState.css';

const ErrorState = ({ message = 'No se pudo cargar la informacion.' }) => (
	<div className='error-state'>
		<p>{message}</p>
	</div>
);

export default ErrorState;
