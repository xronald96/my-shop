import './SearchBar.css';

const SearchBar = ({ value, onChange, placeholder = 'Busca por marca o modelo' }) => (
	<label className='search-bar'>
		<span className='search-bar__label'>Buscar</span>
		<input
			type='search'
			value={value}
			onChange={(event) => onChange(event.target.value)}
			placeholder={placeholder}
			aria-label='Buscar productos por marca o modelo'
		/>
	</label>
);

export default SearchBar;
