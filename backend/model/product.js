var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var product = new Schema({
	name: String,
	price: Number,
	description: String,
	image: {
		type: String,
		default:
			'https://www.spicymotion.be/assets/img/gallery/indirect-sampling/01.jpg',
	},
	rating: {
		rate: { type: Number, default: 0 },
		count: { type: Number, default: 0 },
	},
});

module.exports = mongoose.model('Product', product);
