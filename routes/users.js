var express = require('express');
var router = express.Router();
const usersController = require('../controllers/users');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

//GET /profile
router.get('/profile', usersController.index);

module.exports = router;
