var express = require('express');
var router = express.Router();
var Gdax = require('gdax');


router.get('/login', function(req, res, next) {
	console.log('in /data/login')
	res.render('login')
})

router.post('/login', function(req, res, next) {
	var gdaxKey = req.body.key;
	var b64secret = Buffer(req.body.secret, 'base64');
	var gdaxPassphrase = req.body.passphrase;

	var authedClient = new Gdax.AuthenticatedClient(gdaxKey, b64secret, gdaxPassphrase);

	authedClient.getAccounts(function(err, response, data) {
		if (err) {
			console.error('There was an error: ', err)
		} else {
			console.log('response is successfull: ', data)
 			res.render('login', { gdaxData: data })
		}
	})
	//test data
	// body = [{"id":"84214645-0323-4525-b55b-e446806e7924","currency":"USD","balance":"test","available":"test","hold":"test","profile_id":"cd38fbdb-8ece-4921-8120-8c74189bc120"},{"id":"133956bd-6fea-4668-8a90-2e037f32856f","currency":"LTC","balance":"0.0000000000000000","available":"0.0000000000000000","hold":"0.0000000000000000","profile_id":"cd38fbdb-8ece-4921-8120-8c74189bc120"},{"id":"f8b46e0b-071d-4ec6-b4d2-43bc1310e9d1","currency":"ETH","balance":"0.0000000000000000","available":"0.0000000000000000","hold":"0.0000000000000000","profile_id":"cd38fbdb-8ece-4921-8120-8c74189bc120"},{"id":"ed9274db-0389-418b-b2ef-da6244c8c3b4","currency":"BTC","balance":"0.0000000000000000","available":"0.0000000000000000","hold":"0.0000000000000000","profile_id":"cd38fbdb-8ece-4921-8120-8c74189bc120"}]
})

module.exports = router;
