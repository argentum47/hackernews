var crypto = require("crypto");
var mongoose = require("mongoose");

var UserSchema = new mongoose.Schema({
	email: { type: String, unique: true, lowercase: true },
  password: String,
  profile: {
    name: String,
    gender: String,
    location: String,
    picture: String
  },
  resetPasswordToken: String,
  resetPasswordExpires: Date,
  createdAt: { type: Date, default: Date.now },
  updatedAt: Date
});

UserSchema.pre('save', function(next) {
  var user = this;

  if (!user.isModified('password')) {
    return next();
  }

  user.password = encrypt(user.password);
  next();
});

UserSchema.pre('update', (next) => {
  this._update = this._update || {};
  this._update['updatedAt'] = Date.now();
  next();
});

UserSchema.methods.comparePassword = function (passwordText) {
  return new Promise((res, rej) => {
    if (this.password == encrypt(passwordText)) {
      res(true);
    } else {
      res(false);
    }
  });
}

UserSchema.methods.gravatar = function (size) {
  if(!size) size = 200;

  if(!this.email) return `https://gravatar.com/avatar/?s=${size}&d=retro`;

  var md5 = crypto.createHash("md5").update(this.email).digest('hex');
  return `https://gravatar.com/avatar/${md5}?s=${size}&d=retro`;
}

function encrypt (text) {
  return crypto.createHash("sha256").update(text).digest("hex")
}

module.exports = mongoose.model('User', UserSchema);