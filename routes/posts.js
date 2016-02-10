var express = require('express');
var router = express.Router();
var postsController = require("../controllers/posts");

router.get('/new', postsController.newPost);
router.post('/create', postsController.postPost);
router.get('/:id', postsController.getPost);
router.post('/:id/vote', postsController.postVotes);

module.exports = router;