import React,{Component} from 'react';
import './product-condensed.css';
import DataServices from '../services/dataservices';

let  ds = new DataServices();
class ProductCondensed extends Component{
	constructor(props){
		super(props);
		this.removeProduct =this.removeProduct.bind(this);
	}
	removeProduct = () =>{
		ds.removeWishListItem(this.props.product);
	}
	render(){
		return(
			<li className="list-group-item pc-condensed">
				<a className="btn btn-outline-danger" onClick={ ()=> this.removeProduct()}>x</a>
				  <p>{this.props.product.title} | ₹{this.props.product.price}</p>
			</li>
			);
	}
}

export default ProductCondensed;