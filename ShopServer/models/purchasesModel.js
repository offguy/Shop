const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Import customer and product schemas
const customerSchema = require('./customersModel');
const productSchema = require('./productsModel');

const purchaseSchema = new mongoose.Schema({
    customerId: {type: Schema.Types.ObjectId, ref: 'customer', required: true},
    products: [{
        productId: {type: Schema.Types.ObjectId, ref: 'product', required: true},
        quantity: {type: Number, require: true}
    }],
    date: {type: Date, default: Date.now} // setting default date to current date
}, { versionKey: false });

const Purchase = mongoose.model('purchase', purchaseSchema);

module.exports = Purchase;
