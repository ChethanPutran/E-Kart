class HttpService {
	async getProducts() {
		try {
			const response = await fetch(`/products`);
			const products = await response.json();

			if (!response.ok) {
				throw new Error('Could not fetch products.');
			}

			return products;
		} catch (err) {
			throw new Error('Could not fetch products.');
		}
	}
	async getCart() {
		try {
			const response = await fetch(`/cart`);
			const products = await response.json();

			if (!response.ok) {
				throw new Error('Could not fetch products.');
			}

			return products;
		} catch (err) {
			throw new Error('Could not fetch products.');
		}
	}
	async getCartSize() {
		try {
			const response = await fetch(`/cart/size`);
			const size = await response.json();

			if (!response.ok) {
				throw new Error('Could not fetch products.');
			}

			return size;
		} catch (err) {
			throw new Error('Could not fetch products.');
		}
	}

	async getProduct(productId) {
		try {
			const response = await fetch(`/products/${productId}`);
			const data = await response.json();

			if (!response.ok) {
				throw new Error(data.message || 'Could not fetch product.');
			}

			return data;
		} catch (err) {
			throw new Error('Could not fetch products.');
		}
	}

	async addProduct(product) {
		try {
			const response = await fetch(`/products`, {
				method: 'POST',
				body: JSON.stringify(product),
				headers: {
					'Content-Type': 'application/json',
				},
			});
			const data = await response.json();

			if (!response.ok) {
				throw new Error(data.message || 'Could not create product.');
			}
			return data;
		} catch (err) {
			throw new Error('Could not create product.');
		}
	}
	async addProductToCart({ id, quantity }) {
		try {
			const response = await fetch(`/cart`, {
				method: 'POST',
				body: JSON.stringify({ _id: id, quantity: quantity }),
				headers: {
					'Content-Type': 'application/json',
				},
			});
			const data = await response.json();

			if (!response.ok) {
				throw new Error(
					data.message || 'Could not add product to cart.'
				);
			}
			return data;
		} catch (err) {
			console.log(err);
			throw new Error('Could not add product to cart.');
		}
	}
	async removeProductFromCart(id) {
		try {
			const response = await fetch(`/cart/${id}`, {
				method: 'DELETE',
			});
			const data = await response.json();

			if (!response.ok) {
				throw new Error(
					data.message || 'Could not remove product from cart.'
				);
			}
			return data;
		} catch (err) {
			throw new Error('Could not remove product from cart.');
		}
	}

	async deleteProduct(productID) {
		try {
			const response = await fetch(`/products/${productID}`, {
				method: 'DELETE',
			});
			const data = await response.json();

			if (!response.ok) {
				throw new Error(data.message || 'Could not delete product.');
			}

			return data;
		} catch (err) {
			throw new Error('Could not delete product.');
		}
	}

	async updateProduct(product, id) {
		try {
			const response = await fetch(`/products/${id}`, {
				method: 'PATCH',
				body: JSON.stringify(product),
				headers: {
					'Content-Type': 'application/json',
				},
			});
			const data = await response.json();

			if (!response.ok) {
				throw new Error(data.message || 'Could not update product.');
			}
			return data;
		} catch (err) {
			throw new Error('Could not update product.');
		}
	}
}
export default HttpService;
