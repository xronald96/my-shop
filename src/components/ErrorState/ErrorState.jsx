import './ErrorState.css';

const ErrorState = ({ message = 'We could not load the information.' }) => (
	<div className='error-state'>
		<p>{message}</p>
	</div>
);

export default ErrorState;
