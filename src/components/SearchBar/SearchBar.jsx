import './SearchBar.css';

const SearchBar = ({ value, onChange, placeholder = 'Search by brand or model' }) => (
	<label className='search-bar'>
		<span className='search-bar__label'>Search</span>
		<input
			type='search'
			value={value}
			onChange={(event) => onChange(event.target.value)}
			placeholder={placeholder}
			aria-label='Search products by brand or model'
		/>
	</label>
);

export default SearchBar;
