const moogose = require('mongoose');

const productSchema = new moogose.Schema({
    title: {type: String, required: true},
    price: {type: Number, required: true}
});

module.exports = moogose.model('products', productSchema);