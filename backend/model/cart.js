var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;

var cartSchema = new Schema({
	products: [{ type: ObjectId, ref: 'Product' }],
});

module.exports = mongoose.model('Cart', cartSchema);
