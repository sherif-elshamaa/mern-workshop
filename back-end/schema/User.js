const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    password: { type: String, required: true },
    userName: { type: String, required: true },
    name: { type: String, required: true },
    age: { type: Number, required: true },
    registerDate: { type: Date, default: Date.now() },
})

module.exports = mongoose.model('User', userSchema)