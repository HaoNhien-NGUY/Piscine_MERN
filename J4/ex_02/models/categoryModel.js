const moogose = require('mongoose');

const categorieSchema = new moogose.Schema({
    name: {type: String, required: true}
});

module.exports = moogose.model('categories', categorieSchema);