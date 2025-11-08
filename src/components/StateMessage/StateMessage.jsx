import './StateMessage.css';

const StateMessage = ({ variant = 'info', children }) => (
	<div className={`state-message state-message--${variant}`}>{children}</div>
);

export default StateMessage;
