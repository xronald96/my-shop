export default {
	env: { browser: true, es2022: true, node: true },
	extends: [
		'eslint:recommended',
		'plugin:react/recommended',
		'plugin:react-hooks/recommended',
		'plugin:react-refresh/recommended',
		'prettier',
	],
	parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
	settings: { react: { version: 'detect' } },
	rules: {
		'react/prop-types': 'off',
	},
};
