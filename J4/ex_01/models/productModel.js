const moogose = require('mongoose');

const productSchema = new moogose.Schema({
    title: { type: String, required: true },
    price: { type: Number, required: true },
    desc: { type: String },
    categories: {type: moogose.Schema.Types.ObjectId, ref: 'categories'}
});

module.exports = moogose.model('products', productSchema);