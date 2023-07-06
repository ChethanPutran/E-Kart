export default async function request(type = 'GET', path = '/', body = null) {
	try {
		const res = await fetch(path, { method: type, body });
		const data = await res.json();
		if (res.status >= 200 && res.status < 205) return data.data;
		else throw data.error;
	} catch (error) {
		throw error;
	}
}
