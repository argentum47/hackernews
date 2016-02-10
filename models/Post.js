var crypto = require("crypto");
var mongoose = require("mongoose");

var PostSchema = new mongoose.Schema({
  content: { type: String },
  points: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date }
});

PostSchema.pre('findOneAndUpdate', function (next) {
  this._update = this._update || {};
  this._update['updatedAt'] = Date.now();
  next();
});

module.exports = mongoose.model('Post', PostSchema);