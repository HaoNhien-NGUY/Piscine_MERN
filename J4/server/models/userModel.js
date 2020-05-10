const moogose = require('mongoose');

const userSchema = new moogose.Schema({
    login: { type: String, required: true, minlength: 5, maxlength: 20, trim: true, unique: true },
    email: { type: String, required: true, trim: true, unique: true },
    password: { type: String, required: true },
    admin: { type: Boolean, default: false, required: true },
}, {
    timestamps: true
});

module.exports = moogose.model('User', userSchema);