const mongoose = require('mongoose');

const userSchema  = new mongoose.Schema({
    userName: { type: String, required: true },
    password: { type: String, required: true },
    email : { type: String, required: true },
    mobile : { type: Number, required: true },
    profileImage : { type: String },
    isAdmin : {type: Boolean, default:'false'}
})

module.exports = mongoose.model('users', userSchema);