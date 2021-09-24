import { useHistory } from 'react-router-dom';
import HttpService from '../../Services/http-services';
import useHttp from '../../hooks/use-http';
import { useEffect } from 'react/cjs/react.development';
import AddProductForm from './AddProductForm';

const AddProduct = (props) => {
	const history = useHistory();
	const httpService = new HttpService();
	const { sendRequest, status, error } = useHttp(httpService.addProduct);

	useEffect(() => {
		if (status === 'sucess') {
			history.push('/products');
		} else if (status === 'failed') {
			console.log(error);
		}
	}, [status, history, error]);

	return (
		<AddProductForm
			addProduct={sendRequest}
			isLoading={status === 'pending'}
		/>
	);
};

export default AddProduct;
