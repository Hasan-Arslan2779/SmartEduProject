const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// bcrypt şifreleme
const bcrypt = require('bcrypt');

const UsersSchema = new Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
  },
});
UsersSchema.pre('save', function (next) {
  const user = this;
  bcrypt.hash(user.password, 10, (err, hash) => {
    user.password = hash;
    next();
  });
});
const User = mongoose.model('User', UsersSchema);
module.exports = User;
