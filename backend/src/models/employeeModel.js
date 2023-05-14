const mongoose = require('mongoose');

let employeeSchema = new mongoose.Schema({
    email: {type: String, required: true},
    name: {type: String, required: true},
    password: {type: String, required: true},
    contactNumber: {type: Number, required: true},
    address: {type: String},
},
{
    versionKey: false
});

const employeeModel = mongoose.model('Employee', employeeSchema);
module.exports = employeeModel;