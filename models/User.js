const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    user_email: String,
    password: String
});

const UserModel = mongoose.model('users', UserSchema);

module.exports = UserModel;