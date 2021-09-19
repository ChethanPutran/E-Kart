class HttpService {
	getProducts = () => {
		const promise = new Promise((resolve, reject) => {
			fetch('/products')
				.then((response) => {
					return response.json();
				})
				.then((data) => {
					resolve(data);
				})
				.catch((err) => reject(err));
		});
		return promise;
	};
	postProduct = (product) => {
		const promise = new Promise((resolve, reject) => {
			fetch('/product', {
				method: 'POST',
				body: JSON.stringify(product),
				headers: {
					'Content-Type': 'application/json',
				},
			})
				.then((response) => {
					return response.json();
				})
				.then((data) => {
					resolve(data);
				})
				.catch((err) => reject(err));
		});
		return promise;
	};
	updateProduct = (id, product) => {
		const promise = new Promise((resolve, reject) => {
			fetch(`/${id}`, {
				method: 'PATCH',
				body: JSON.stringify(product),
				headers: {
					'Content-Type': 'application/json',
				},
			})
				.then((response) => {
					return response.json();
				})
				.then((data) => {
					resolve(data);
				})
				.catch((err) => reject(err));
		});
		return promise;
	};
	deleteProduct = (id) => {
		const promise = new Promise((resolve, reject) => {
			fetch(`/${id}`, { method: 'DELETE' })
				.then((response) => {
					return response.json();
				})
				.then((data) => {
					resolve(data);
				})
				.catch((err) => reject(err));
		});
		return promise;
	};
}

export default HttpService;
