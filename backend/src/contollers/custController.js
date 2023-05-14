var con = require("../database/mongoConnection");
const Customer = require('../models/customerModel');
const bcrypt = require('bcrypt');

exports.signupCustomer = async (req, res) => {
    console.log("req.body ", req.body);
    let saltRounds = 10;
    let hashedPassword = await bcrypt.hash(req.body.password, saltRounds);

    try{
        let isUserPresent;
        isUserPresent = await Customer.findOne({email: req.body.email});

        if(isUserPresent) {
            res.status(400).send('Customer already exists!');
        }
        else {
            const newCustomer = new Customer({
                email: req.body.email,
                name: req.body.name,
                password: hashedPassword,
                contactNumber: req.body.contactNumber,
                address: req.body.address,
                rewards: 500
            });
            newCustomer.save((err, data) => {
                if(err) {
                    console.log('error in saving to db ', err);
                    res.status(500).end('Error occured in saving to db');
                }
                else {
                    console.log('signup customer successful');
                    res.status(200).end('signup customer successful');
                }
            })
        }
    }
    catch(err) {
        console.log(err);
        res.status(500).end('Error in query execution for customer signup ');
    }
}


exports.loginCustomer = async (req, res) => {
    console.log('in login backend req.body ', req.body);
    try {
        let user;
        user = await Customer.findOne({email: req.body.email});
        console.log('user from db ', user);
        console.log('passwords from req.body and db ', req.body.password, user.password);

        let isPasswordMatch = await bcrypt.compare(req.body.password, user.password);
        if(isPasswordMatch) {
            console.log('passwords matched');
            console.log(user);
            res.status(200).send(user);
        }
        else {
            console.log('Password does not match ');
            res.status(401).end('Invalid Credentials');
        }
    }
    catch(err) {
        console.log('error ', err);
        res.status(500).end('Error occured');
    }
}