const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
    name: {type: String},
    price: {type: Number},
    quantity: {type: Number},

},
{versionKey:false}
);
const Product = mongoose.model('product', productSchema);
module.exports = Product