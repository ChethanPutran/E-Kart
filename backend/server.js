const express = require('express');
require('./model/connection');
const app = express();

const Product = require('./model/product');
const Cart = require('./model/cart');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', 'http://localhost:3010');
	next();
});

app.post('/product', function (req, res) {
	console.log(req.body);
	const product = new Product(req.body);
	product.save(function (error, savedProduct) {
		if (error) {
			res.status(500).send({
				error: 'Could not save the product',
				status: 'failure',
			});
		} else {
			res.status(200).send({ data: savedProduct, status: 'sucess' });
		}
	});
});

app.get('/products', function (req, res) {
	console.log('New req');
	Product.find({}, function (error, products) {
		if (error) {
			res.status(500).send({
				status: 'failure',
				error: 'Could not fetch the product',
			});
		} else {
			res.status(200).send({ data: products, status: 'sucess' });
		}
	});
});
app.get('/cart/size', async (req, res) => {
	try {
		const carts = await Cart.find({});
		if (carts && carts.length > 0) {
			res.status(200).send({ size: carts.length, status: 'sucess' });
		} else {
			res.status(404).send({ status: 'failure', error: 'No cart found' });
		}
	} catch (err) {
		res.status(500).send({
			status: 'failure',
			error: 'Something went wrong',
		});
	}
});

app.post('/cart', async function (req, res) {
	const productId = req.body.productId;
	const ownerId = req.body.ownerId;
	const quantity = req.body.quantity;

	const cart = await Cart.findOne({ owner: ownerId });

	if (cart) {
		let existingProduct;
		for (const item of cart.products) {
			if (item._id === productId) {
				const preQuantity = item.quantity;
				item.quantity = preQuantity + quantity;
				existingProduct = item;
			}
		}
		if (!existingProduct) {
			existingProduct = { quantity, productId };
		}
		const products = cart.products.filter(
			(product) => product._id !== productId
		);

		const dat = await Cart.updateOne(
			{ owner: ownerId },
			{
				$push: {
					products: {
						$each: [...products, existingProduct],
					},
				},
			}
		);

		if (dat) {
			return res.status(201).send({ status: 'sucess' });
		} else {
			return res.status(300).send({ status: 'error' });
		}
	} else {
		try {
			const cart = await Cart.create({
				owner: ownerId,
				products: [
					{ quantity: req.body.quantity, productId: req.body._id },
				],
			});
			await cart.save();
			res.status(200).send({ status: 'success' });
		} catch (err) {
			res.status(400).send({ status: 'failure', error: err });
			console.log('Error', err);
		}
	}
});

app.get('/cart', async function (req, res) {
	try {
		const carts = await Cart.find({ owner: req.user._id });
		const products = [];

		for (item of carts) {
			const cart = await Cart.findOne({
				_id: item.id,
			})
				.populate('productId')
				.exec();
			products.push({
				data: cart.productId,
				quantity: cart.quantity,
				status: 'sucess',
			});
		}

		res.status(200).send(products);
	} catch (err) {
		console.log(err);
		res.status(500).send({ error: err, status: 'failure' });
	}
});
app.delete('/cart/:id', async (req, res) => {
	try {
		const id = req.params.id;
		const item = await Cart.findOneAndDelete({
			_id: id,
		});
		if (item) {
			res.status(200).send({
				status: 'sucess',
				message: 'Item has been removed!',
			});
		} else {
			throw new Error('No project found!');
		}
	} catch (err) {
		console.log(err);
		res.status(400).json({ error: err.message, status: 'failure' });
	}
});

app.put('/wishlist/product/add', function (req, res) {
	Product.findOne({ _id: req.body.productId }, function (error, product) {
		if (error) {
			res.status(500).send({
				error: 'Could not add item to wishlist',
				status: 'failure',
			});
		} else {
			WishList.update(
				{ _id: req.body.wishListId },
				{ $addToSet: { products: product._id } },
				function (error, wishList) {
					if (error) {
						res.status(500).send({
							error: 'Could not add item to the wishlists',
							status: 'failure',
						});
					} else {
						res.send({
							status: 'sucess',
							message: 'Successfully added to wishlist',
						});
					}
				}
			);
		}
	});
});

app.get('/wishlists', function (req, res) {
	WishList.find({})
		.populate({ path: 'products', model: 'Product' })
		.exec(function (error, wishLists) {
			if (error) {
				res.status(500).send({
					error: 'Could not fetch the wishlists',
					status: 'failure',
				});
			} else {
				res.status(200).send(wishLists);
			}
		});
});

app.put('/products/:productId', function (req, res) {
	const productId = req.params.productId;
	const newText = req.body.text;
	if (!newText || newText === '') {
		res.status(500).send({
			error: 'You must provide ingredient text',
			status: 'failure',
		});
	} else {
		const objectFound = false;
		for (const x = 0; x < ingredients.length; x++) {
			const ing = ingredients[x];
			if (ing.id === req.params.productId) {
				ingredients[x].text = newText;
				objectFound = true;
				break;
			}
		}
		if (!objectFound) {
			res.status(500).send({
				error: 'Ingredient not found',
				status: 'failure',
			});
		}
		res.send(ingredients);
	}
});

app.listen(3010, function () {
	console.log('Server is  running on http://localhost:3010');
});
