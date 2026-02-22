const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    // Additional fields can be added here
}, {
    timestamps: true
});

const User = mongoose.model('User', userSchema);

module.exports = User;