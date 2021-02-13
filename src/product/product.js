import React,{Component} from 'react';
import './product.css';
import DataServices from '../services/dataservices';
import NotificationServices,{NOTIF_WISHLIST_CHANGED} from '../services/notification';

let ds = new DataServices();
let ns = new NotificationServices();
class Product extends Component{
	constructor(props){
		super(props);
		this.state ={onWishList: ds.itemOnWishList()};
		this.onClicked = this.onClicked.bind(this);
		this.onWishListChanged = this.onWishListChanged.bind(this);
	}
	componentDidMount(){
		ns.addObserver(NOTIF_WISHLIST_CHANGED,this,this.onWishListChanged);

		}

	componentWillUnmount(){
		ns.removeObserver(this,NOTIF_WISHLIST_CHANGED);

		}
	onWishListChanged=(newWishList)=>{
	 	this.setState( {onWishList:ds.itemOnWishList(this.props.product) });

		}
	onClicked=()=>{
		if(this.state.onWishList){
			ds.removeWishListItem(this.props.product);
		}else{
			ds.addWishListItem(this.props.product);
		}
		
		
	}
	

	
	render(){
		
		var btnClass;
		
		if(this.state.onWishList){
			btnClass = "btn btn-danger";
		}else{
			btnClass = "btn btn-primary";
		}
		
		return(
			<div className="card product">
				<img className="card-img-top" src={this.props.product.imgUrl} alt="Product"/>
				<div className="card-block">
					<h4 className="card-title">{this.props.product.title}</h4>
					<p className="card-text">Price: ₹{this.props.product.price}</p>
					<a href="#" onClick={()=> this.onClicked()} className={btnClass}>{this.state.onWishList ? "Remove From Wishlist" : "Add To Wishlist"}</a>
				</div>

			</div>
			);
	}
}

export default Product;