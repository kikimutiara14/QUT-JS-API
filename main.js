// Copyright 2021 Jason Rumengan, Kiki Mutiara QUT

// Packages
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const fs = require('fs');
const productPath = __dirname + "/data/product.json";
const parser = bodyParser.json();
const productFile = fs.readFileSync(productPath, 'utf8');
var products = JSON.parse(productFile);

// APIs
// getProducts
app.get('/products', function (req, res) {
    res.end(JSON.stringify(products));
})

// getDetails(id)
app.get('/products/:id', function (req, res) {
        const product = products[req.params.id];
        res.end(JSON.stringify(product));
})

// addProduct(name, description, price, cost, stock)
app.post('/product', parser, function (req, res) {
        var newProduct = req.body;
        var productID = parseInt(Object.keys(products).sort().pop()) + 1;
        products[productID] = newProduct;
        products[productID]['salesCount'] = 0;
        res.end(JSON.stringify(products));
})

// sell(quantity)
app.post('/product/sell/:id', parser, function (req, res) {
        var quantity = req.body['quantity'];
        products[req.params.id]['stock'] -= quantity;
        products[req.params.id]['salesCount'] += quantity;
        res.end(JSON.stringify(products));
})

// restock(quantity)
app.post('/product/restock/:id', parser, function (req, res) {
        var quantity = req.body['quantity'];
        products[req.params.id]['stock'] += quantity;
        res.end(JSON.stringify(products));
})

// Server
const server = app.listen(8080, function () {
    const host = server.address().address
    const port = server.address().port
    console.log("Listening at http://%s:%s", host, port)
})