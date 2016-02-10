var express = require('express');
var router = express.Router();
var postsController = require("../controllers/posts");

/* GET home page. */
router.get('/', postsController.getPosts);
router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
})
module.exports = router;
