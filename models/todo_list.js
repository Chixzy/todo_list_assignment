const mongoose = require('mongoose');

const todoSchema = mongoose.Schema({
    user_id: String,
    created_at: Date,
    body: [String],
    done: {type: String, default: false},
    owner_id: String

}, {collection: 'todo_list'});

const model = mongoose.model('Todo_list', todoSchema);
module.exports = model;