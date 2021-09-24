import React from 'react';
import ProductFinder from './Product/ProductFinder';
import LoadingSpinner from '../UI/LoadingSpinner/LoadingSpinner';
import HttpService from '../Services/http-services';
import useHttp from '../hooks/use-http';
import { useEffect } from 'react';

const Products = (props) => {
	const httpService = new HttpService();
	const { sendRequest, status, data, error } = useHttp(
		httpService.getProducts,
		true
	);

	useEffect(() => {
		sendRequest();
	}, [sendRequest]);

	if (status === 'pending') {
		return (
			<div className='loading'>
				<LoadingSpinner />
			</div>
		);
	}

	if (status === 'failed') {
		return (
			<div className='centeredDiv'>
				<p className='app__warning'>{error}</p>
			</div>
		);
	}

	if (status === 'sucess' && data.length > 0) {
		return (
			<>
				{error && <p className='snackbar'>{error}</p>}

				<ProductFinder products={data} />
			</>
		);
	} else {
		return <p className='app__warning'>No products found!!!</p>;
	}
};

export default Products;
