var Post = require("../models/Post");

exports.getPosts = function (req, res, next) {
  Post.find().then(posts => {
    res.render('index', { title: "HN", posts: posts });
  }).catch(err => next(err));
};

exports.getPost = function (req, res, next) {
  Post.findOne({ _id: req.params.id }).then(post => {
    res.render('post', { post: post });
  }).catch(err => next(err));
};

exports.newPost = function (req, res, next) {
  if(req.user) {
    res.render('new_post', { title: 'Create Post' })
  } else {
    next({ status: 401, message: "Login to continue"})
  }
};

exports.postPost = function (req, res, next) {
  req.assert('content', 'content must be present and more than 10 characters').len(10)
  var errors = req.validationErrors();

  if(errors) return res.status(400).send(errors);

  var content = req.body.content;

  Post.create({ content: content }).then(post => {
    res.redirect(`/posts/${post.id}`);
  }).catch(err => { console.log(err); next(err) });
};

exports.postVotes = function (req, res, next) {
  Post.findOneAndUpdate({ id: req.params.id }, { $inc: {votes: 5 }}, {new: true}).then((post) => {
    res.send(post);
  }).catch(err => next(err));;
};