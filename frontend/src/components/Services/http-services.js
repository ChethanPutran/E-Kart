import 'whatwg-fetch';// helps to make web requests

class HttpService {

	getProducts = () => {
		var promise = new Promise((resolve, reject) => {
			fetch('http://localhost:3004/product').then(response => {
				resolve(response.json());
			}).catch((err) => reject(err));
		});
		return promise;
	}
}

export default HttpService;



