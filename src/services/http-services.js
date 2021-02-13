import 'whatwg-fetch';// helps to make web requests

class HttpService {
	
	getProducts = () =>{
		//1 Order Of Operation(Asynchronus)
		var promise = new Promise((resolve,reject) => {
			fetch('http://localhost:3004/product').then( response =>{
			resolve(response.json());
			})
		});
		//3
		return promise;
		
		
	}
}

export default HttpService;



