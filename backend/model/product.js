const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const product = new Schema({
	name: {
		type: String,
		minlength: [3, 'Product name is too short .Got {VALUE} but (>3)'],
		maxlength: [50, 'Product name is too long!'],
		required: [true, 'Product name is required!'],
	},
	price: {
		type: Number,
		validate: {
			validator: (val) => {
				if (val <= 0) {
					return false;
				}
				return true;
			},
			message: (props) =>
				`${props.value} is not a valid price! Price should be greater than 0,`,
		},
	},

	description: {
		type: String,
		required: true,
		minlength: 20,
		maxlength: 300,
	},
	image: {
		type: String,
		default:
			'https://www.spicymotion.be/assets/img/gallery/indirect-sampling/01.jpg',
	},
	rating: {
		rate: { type: Number, min: 0, max: 5, default: 0 },
		count: { type: Number, default: 0 },
	},
});

product.virtual('carts', {
	ref: 'Cart',
	localField: '_id',
	foreignField: 'productId',
});

product.pre('save', function (next) {
	this.validate()
		.then(() => {
			next();
		})
		.catch((err) => {
			throw err;
		});
});

const Product = mongoose.model('Product', product);
module.exports = Product;
