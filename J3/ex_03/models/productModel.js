const moogose = require('mongoose');

const productSchema = new moogose.Schema({
    title: {type: String, required: true},
    price: {type: Number, required: true},
    desc: {type: String}
});

module.exports = moogose.model('products', productSchema);