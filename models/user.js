const mongoose = require('mongoose');

userSchema = mongoose.Schema({
    email: {type: String, unique: true},
    password: {type: String, unique: true},
    user_id: String
},{collection: 'users'});

const model = mongoose.model('User', userSchema);

module.exports = model;