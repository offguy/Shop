const mongoose = require("mongoose")

const customerSchema = new mongoose.Schema({
    fname: {type: String, required: true},
    lname: {type: String, required: true},
    //need to enter the whole address when updating
    address: {
        city: {type: String},
        street: {type: String},
        number: {type: Number}
},
    email: {type: String, required: true}

},
{versionKey:false}
);
const Customer = mongoose.model('customer', customerSchema);
module.exports = Customer