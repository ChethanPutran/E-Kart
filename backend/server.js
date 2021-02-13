var express = require('express');

var request = require('request');

var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://localhost/ca-arts');
var Product = require('./model/product');
var WishList = require('./model/wishlist');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.post('/product',function(request, response){
	var product = new Product();
	product.title = request.body.title;
	product.price = request.body.price;
	product.save(function(error, savedProduct){
		if(error){
			response.status(500).send({error:"Could not save the product"});
		}else{
			response.status(200).send(savedProduct);
			
		}
	});
});

//app.use(function (request, response, next) {
//  response.setHeader('Access-Control-Allow-Origin', '*');
//  next();
//})

app.get('/product',function(request, response) {
	
	
	Product.find({},function(error, products){
		if(error){
			response.status(500).send({error:"Could not fetch the product"});
		}else{
			response.status(200).send(products);
		}
	});
	
       	
});


app.post('/wishlist',function(request, response) {
	var  wishList = new WishList();
	wishList.title = request.body.title;
	wishList.save(function(error, newWishList){
		if(error){
			response.status(500).send({error:"Could not create wishlist"});
		}else{
			response.status(200).send(newWishList);
			
		}
	});
});



app.put('/wishlist/product/add',function(request, response) {
	
	Product.findOne({ _id: request.body.productId}, function(error, product) {
		if(error){
			response.status(500).send({error:"Could not add item to wishlist"});
		}else{
			WishList.update({_id:request.body.wishListId},{$addToSet: {products:product._id}},function(error, wishList){
				if(error){
			               response.status(500).send({error:"Could not add item to the wishlists"});
		        }else{
			           response.send("Successfully added to wishlist");
		          }
				
			});
		}
	});
	
	
});


app.get('/wishlist',function(request, response) {
	WishList.find({}).populate({path:'products',model: 'Product'}).exec(function(error, wishLists){
		if(error){
			response.status(500).send({error:"Could not fetch the wishlists"});
		}else{
			response.status(200).send(wishLists);
		}
	});
	
});





//
//var ingredients = [ {
//	"id" : "1",
//	"text" : "One"
//},
// {
//	"id" : "2",
//	"text" : "Two"
//},
// {
//	"id" : "3",
//	"text" : "Three"
//},
// {
//	"id" : "4",
//	"text" : "Four"
//}
//	];
//

//
//app.post('/ingredients',function(request,response){
//	 var ingredient = request.body;
//	  
// if (!ingredient || ingredient.text === ""){
//		 response.status(500).send({error : "Your ingredient must have text"});
//	 } else {
//		 ingredients.push(ingredient);
//		 response.status(200).send(ingredients);
//	 }
//});
//
//app.put('/ingredients/:ingredientId',function(request,response){
//	
//	var ingredientId = request.params.ingredientId;
//	var newText = request.body.text;
//	if((!newText || newText === "")){
//		response.status(500).send({ error : "You must provide ingredient text"})
//	} else{
//		var objectFound = false;
//	for( var x =0; x< ingredients.length; x++){
//		var ing = ingredients[x];
//		if(ing.id === request.params.ingredientId){
//			ingredients[x].text = newText;
//			objectFound = true;
//			break;
//		    }
//	     }
//		if(!objectFound){
//			response.status(500).send({error:"Ingredient not found"})
//		}
//		response.send(ingredients);
//	}
//
//});
//
//
//
//
//app.get('/contact',function(request,response) {
//	response.send('Get the contact details!!!!!'); 
//            	
//});

app.listen(3004,function(){
	console.log("First API running on port 3004!");
});