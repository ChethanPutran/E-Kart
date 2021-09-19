import React, { Component } from 'react';
import { Fragment } from 'react/cjs/react.development';
import Card from '../UI/Card/Card';
import ProductsList from './ProductsList';
import cartContext from '../Cart/cart-context';

class ProductFinder extends Component {
	//Using context
	static cartContext = cartContext;
	constructor(props) {
		super(props);
		this.state = { filteredProducts: props.products, searchTerm: '' };
	}

	searchChangeHandler(event) {
		this.setState({ searchTerm: event.target.value });
	}
	//useEffect(...,[]) called once component mounted(evaulated and rendered)
	componentDidMount() {
		//Can make http requests
	}

	//useEffect(...,[...]) called once component updated

	componentDidUpdate(previousProps, previousState) {
		if (previousState.searchTerm !== this.state.searchTerm) {
			this.setState({
				filteredProducts: this.props.products.filter((product) =>
					product.name.includes(this.state.searchTerm)
				),
			});
		}
	}

	//useEffect(()=>{return ()=>{...}},[]) called right before component is removed from DOM
	componentWillUnmount() {}

	render() {
		return (
			<Fragment>
				<Card className='searchBox'>
					<label htmlFor='search' className='searchBox__label'>
						Filter
					</label>
					<input
						type='text'
						id='search'
						className='searchBox__input'
						onChange={this.searchChangeHandler.bind(this)}
					/>
				</Card>

				<ProductsList products={this.state.filteredProducts} />
			</Fragment>
		);
	}
}

export default ProductFinder;
