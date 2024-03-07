var express = require('express');
var router = express.Router();
const collectionsController = require('../controllers/collections');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

//GET /profile
router.get('/profile', collectionsController.index);

//POST /profile
router.post('/profile/:id', collectionsController.addToCollection);



module.exports = router;