const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cartSchema = new Schema({
	quantity: {
		type: Number,
		required: true,
		validate: {
			validator: (val) => {
				if (val <= 0) {
					return false;
				}
				return true;
			},
			message: (props) =>
				`${props.value} is not a valid quantity! Quantity should be greater than 0,`,
		},
	},
	productId: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: 'Product',
	},
});

cartSchema.pre('save', function (next) {
	this.validate()
		.then(() => {
			next();
		})
		.catch((err) => {
			throw err;
		});
});
const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
