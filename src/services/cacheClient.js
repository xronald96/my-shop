const DEFAULT_TTL_MS = 60 * 60 * 1000;

const isBrowser = typeof window !== 'undefined';

const memoryStore = new Map();

const getStorage = () => {
	if (!isBrowser) return null;
	try {
		return window.localStorage;
	} catch {
		return null;
	}
};

const readRawEntry = (key) => {
	const storage = getStorage();
	if (storage) {
		const value = storage.getItem(key);
		if (value) return value;
	}
	return memoryStore.get(key) ?? null;
};

const parseEntry = (key) => {
	const raw = readRawEntry(key);
	if (!raw) return null;
	try {
		const parsed = JSON.parse(raw);
		if (!parsed || typeof parsed !== 'object') return null;
		return parsed;
	} catch {
		removeEntry(key);
		return null;
	}
};

const writeEntry = (key, value) => {
	const storage = getStorage();
	if (storage) {
		try {
			storage.setItem(key, value);
		} catch {
			console.log('No se pudo escribir en el almacenamiento local');
		}
	} else {
		memoryStore.set(key, value);
	}
};

const removeEntry = (key) => {
	const storage = getStorage();
	if (storage) {
		try {
			storage.removeItem(key);
		} catch {
			console.log('No se pudo eliminar la entrada del almacenamiento local');
		}
	}
	memoryStore.delete(key);
};

export const getCachedData = (key) => {
	const entry = parseEntry(key);
	if (!entry) return null;
	if (!entry.expiresAt || entry.expiresAt <= Date.now()) {
		return null;
	}
	return entry.data ?? null;
};

export const getAnyCachedData = (key) => parseEntry(key)?.data ?? null;

export const setCachedData = (key, data, ttl = DEFAULT_TTL_MS) => {
	const payload = JSON.stringify({
		expiresAt: Date.now() + ttl,
		data,
	});
	writeEntry(key, payload);
	return data;
};

export const cacheKeys = {
	PRODUCTS: 'cache:products',
	productDetail: (id) => `cache:product:${id}`,
};
