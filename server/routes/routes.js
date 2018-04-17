//server/routes/routes.js
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var Dealer = require('../../models/dealer');

router.get('/', function(req, res){
  res.render('index')
});

router.route('/insert')
.post(function(req,res) {
 var dealer = new Dealer();
  dealer.cards = req.body.cards;
  dealer.score = req.body.score;
  dealer.save(function(err) {
        if (err)
          res.send(err);
        res.send('cards successfully added!');
        //console.log('cards successfully added!');
    });
  })


router.get('/getAll',function(req, res) {
  Dealer.find({}, function(err, dealer) {
   if (err)
    res.send(err);
   res.json(dealer);
  });
 });


module.exports = router;
