const mongoose = require('mongoose');

let customerSchema = new mongoose.Schema({
    email: {type: String, required: true},
    name: {type: String, required: true},
    password: {type: String, required: true},
    contactNumber: {type: Number, required: true},
    address: {type: String},
    rewards: {type: Number}
},
{
    versionKey: false
});

const customerModel = mongoose.model('Customer', customerSchema);
module.exports = customerModel;