var express = require('express');
var router = express.Router();
var usersController = require("../controllers/users");

/* GET users listing. */
router.get('/login', usersController.getLogin);
router.get('/signup', usersController.getSignup);

router.post('/login', usersController.login);
router.post('/signup', usersController.signup);

module.exports = router;
