const express = require('express');
require('./model/connection');
const app = express();

const Product = require('./model/product');
const WishList = require('./model/wishlist');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', 'http://localhost:3004');
	next();
});

app.post('/product', function (request, response) {
	console.log(request.body);
	const product = new Product(request.body);
	product.save(function (error, savedProduct) {
		if (error) {
			response.status(500).send({ error: 'Could not save the product' });
		} else {
			response.status(200).send(savedProduct);
		}
	});
});

app.get('/products', function (request, response) {
	console.log('New request');
	Product.find({}, function (error, products) {
		if (error) {
			response.status(500).send({ error: 'Could not fetch the product' });
		} else {
			response.status(200).send(products);
		}
	});
});

app.post('/wishlist', function (request, response) {
	const wishList = new WishList();
	wishList.title = request.body.title;
	wishList.save(function (error, newWishList) {
		if (error) {
			response.status(500).send({ error: 'Could not create wishlist' });
		} else {
			response.status(200).send(newWishList);
		}
	});
});

app.put('/wishlist/product/add', function (request, response) {
	Product.findOne({ _id: request.body.productId }, function (error, product) {
		if (error) {
			response
				.status(500)
				.send({ error: 'Could not add item to wishlist' });
		} else {
			WishList.update(
				{ _id: request.body.wishListId },
				{ $addToSet: { products: product._id } },
				function (error, wishList) {
					if (error) {
						response.status(500).send({
							error: 'Could not add item to the wishlists',
						});
					} else {
						response.send('Successfully added to wishlist');
					}
				}
			);
		}
	});
});

app.get('/wishlists', function (request, response) {
	WishList.find({})
		.populate({ path: 'products', model: 'Product' })
		.exec(function (error, wishLists) {
			if (error) {
				response
					.status(500)
					.send({ error: 'Could not fetch the wishlists' });
			} else {
				response.status(200).send(wishLists);
			}
		});
});

app.put('/products/:productId', function (request, response) {
	const productId = request.params.productId;
	const newText = request.body.text;
	if (!newText || newText === '') {
		response
			.status(500)
			.send({ error: 'You must provide ingredient text' });
	} else {
		const objectFound = false;
		for (const x = 0; x < ingredients.length; x++) {
			const ing = ingredients[x];
			if (ing.id === request.params.productId) {
				ingredients[x].text = newText;
				objectFound = true;
				break;
			}
		}
		if (!objectFound) {
			response.status(500).send({ error: 'Ingredient not found' });
		}
		response.send(ingredients);
	}
});

app.listen(3004, function () {
	console.log('Server is  running on http://localhost:3004');
});
