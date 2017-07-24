var express = require('express');
var router = express.Router();
var Gdax = require('gdax');
var request = require('request')


router.get('/login', function(req, res, next) {
	console.log('in /data/login')
	res.render('login')
})

var mock_accounts = [ 
	{ id: '84214645-0323-4525-b55b-e446806e7924',
	currency: 'USD',
	balance: '3000.0000000000000000',
	available: '0.0000000000000000',
	hold: '3000.0000000000000000',
	profile_id: 'cd38fbdb-8ece-4921-8120-8c74189bc120' },
	{ id: '133956bd-6fea-4668-8a90-2e037f32856f',
	currency: 'LTC',
	balance: '0.0000000000000000',
	available: '0.0000000000000000',
	hold: '0.0000000000000000',
	profile_id: 'cd38fbdb-8ece-4921-8120-8c74189bc120' },
	{ id: 'f8b46e0b-071d-4ec6-b4d2-43bc1310e9d1',
	currency: 'ETH',
	balance: '0.0000000000000000',
	available: '0.0000000000000000',
	hold: '0.0000000000000000',
	profile_id: 'cd38fbdb-8ece-4921-8120-8c74189bc120' },
	{ id: 'ed9274db-0389-418b-b2ef-da6244c8c3b4',
	currency: 'BTC',
	balance: '0.0000000000000000',
	available: '0.0000000000000000',
	hold: '0.0000000000000000',
	profile_id: 'cd38fbdb-8ece-4921-8120-8c74189bc120' }
]

var mock_orders = [
    {
        "id": "d0c5340b-6d6c-49d9-b567-48c4bfca13d2",
        "price": "0.10000000",
        "size": "0.01000000",
        "product_id": "BTC-USD",
        "side": "buy",
        "stp": "dc",
        "type": "limit",
        "time_in_force": "GTC",
        "post_only": false,
        "created_at": "2016-12-08T20:02:28.53864Z",
        "fill_fees": "0.0000000000000000",
        "filled_size": "0.00000000",
        "executed_value": "0.0000000000000000",
        "status": "open",
        "settled": false
    },
    {
        "id": "8b99b139-58f2-4ab2-8e7a-c11c846e3022",
        "price": "1.00000000",
        "size": "1.00000000",
        "product_id": "BTC-USD",
        "side": "buy",
        "stp": "dc",
        "type": "limit",
        "time_in_force": "GTC",
        "post_only": false,
        "created_at": "2016-12-08T20:01:19.038644Z",
        "fill_fees": "0.0000000000000000",
        "filled_size": "0.00000000",
        "executed_value": "0.0000000000000000",
        "status": "open",
        "settled": false
    }
]

var mock_fills = [
    {
        "trade_id": 74,
        "product_id": "BTC-USD",
        "price": "10.00",
        "size": "0.01",
        "order_id": "d50ec984-77a8-460a-b958-66f114b0de9b",
        "created_at": "2014-11-07T22:19:28.578544Z",
        "liquidity": "T",
        "fee": "0.00025",
        "settled": true,
        "side": "buy"
    }
]

// router.post('/login', function(req, res, next) {
// 	var gdaxKey = req.body.key;
// 	var b64secret = Buffer(req.body.secret, 'base64');
// 	var gdaxPassphrase = req.body.passphrase;

// 	var authedClient = new Gdax.AuthenticatedClient(gdaxKey, b64secret, gdaxPassphrase);
// 	var responseObject = {}
// 	// responseObject.accountInfo = []
// 	// responseObject.orders = []
// 	// responseObject.fills = []
// 	authedClient.getAccounts(function(err, response, data) {
// 		if (err || data.message) {
// 			console.error('There was an error: ', err || data.message)
// 			responseObject.error = 'There was an error, ' + data.message
// 			res.render('login', { gdaxData: responseObject })
// 		} else {
// 			console.log('account response is successfull: ', data)
//  			responseObject.accountInfo = data

//  			authedClient.getFills(function(err, response, data) {
// 				if (err || data.message) {
// 					console.error('There was an error: ', err || data.message)
// 					responseObject.error = 'There was an error, ' + data.message
// 					res.render('login', { gdaxData: responseObject })
// 				} else {
// 					console.log('fill response is successfull: ', data)
// 		 			responseObject.fills = data

// 		 			authedClient.getOrders(function(err, response, data) {
// 						if (err || data.message) {
// 							console.error('There was an error: ', err || data.message)
// 							responseObject.error = 'There was an error, ' + data.message
// 							res.render('login', { gdaxData: responseObject })
// 						} else {
// 							console.log('order response is successfull: ', data)
// 				 			responseObject.orders = data

// 				 			console.log('responseObject', responseObject)
// 				 			// now that all callbacks are chained we can return the response to the client
// 				 			res.render('login', { gdaxData: responseObject })
// 						}
// 					})
// 				}
// 			})
// 		}
// 	})

// router.post('/login', function(req, res, next) {
// 	var gdaxKey = req.body.key;
// 	var b64secret = Buffer(req.body.secret, 'base64');
// 	var gdaxPassphrase = req.body.passphrase;

// 	var authedClient = new Gdax.AuthenticatedClient(gdaxKey, b64secret, gdaxPassphrase);
// 	var responseObject = {}
// 	responseObject.accountInfo = []
// 	responseObject.orders = []
// 	responseObject.fills = []
// 	authedClient.getAccounts(function(err, response, data) {
// 		if (err || data.message) {
// 			console.error('There was an error: ', err || data.message)
// 			responseObject.error = 'There was an error, ' + data.message
// 			// res.render('login', { gdaxData: responseObject })
// 		} else {
// 			// console.log('account response is successfull: ', data)
//  			responseObject.accountInfo = data

//  			authedClient.getFills(function(err, response, data) {
// 				if (err || data.message) {
// 					console.error('There was an error: ', err || data.message)
// 					responseObject.error = 'There was an error, ' + data.message
// 					// res.render('login', { gdaxData: responseObject })
// 				} else {
// 					// console.log('fill response is successfull: ', data)
// 		 			responseObject.fills = data

// 		 			authedClient.getOrders(function(err, response, data) {
// 						if (err || data.message) {
// 							console.error('There was an error: ', err || data.message)
// 							responseObject.error = 'There was an error, ' + data.message
// 							// res.render('login', { gdaxData: responseObject })
// 						} else {
// 							// console.log('order response is successfull: ', data)
// 				 			responseObject.orders = data


// 				 			console.log('responseObject', responseObject)
// 				 			// now that all callbacks are chained we can return the response to the client
// 				 			res.send({ gdaxData: responseObject })
// 						}
// 					})
// 				}
// 			})
// 		}
// 	})
// 	// responseObject.accountInfo = mock_accounts
// 	// responseObject.orders = mock_orders
// 	// responseObject.fills = mock_fills
// 	// res.send(responseObject)
// })

var request = require('request');
var crypto = require('crypto');

router.post('/login', function(req, res, next) {

	var gdaxKey = req.body.key;
	var gdaxPassphrase = req.body.passphrase;

	var timestamp = Date.now() / 1000;
	var requestPath = req.body.path.toString();

	var what = timestamp + 'GET' + requestPath;

	var b64secret = Buffer(req.body.secret, 'base64');
	var hmac = crypto.createHmac('sha256', b64secret);
	var sign = hmac.update(what).digest('base64');
	console.log(requestPath, what, sign)

	var options = {
	  url: 'https://api.gdax.com' + requestPath,
	  headers: {
	  	'User-Agent': 'request',
	  	'content-type': 'application/json',
	    'CB-ACCESS-KEY': gdaxKey.toString(),
		'CB-ACCESS-SIGN': sign,
		'CB-ACCESS-TIMESTAMP': timestamp,
		'CB-ACCESS-PASSPHRASE': gdaxPassphrase
	  }
	};

	request(options, function callback(error, response, body) {
		// console.log(error, response, body)
	  if (!error) {
	    var info = JSON.parse(body);
	    console.log('res successfull: ', info)
	    res.json(info)
	  } else {
	    console.log('res error: ', error)
	  	res.json(error)
	  }
	})
})

module.exports = router;
