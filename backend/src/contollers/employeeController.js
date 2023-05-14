var con = require("../database/mongoConnection");
const Employee = require('../models/employeeModel');
const Hotel = require('../models/hotelModel');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const Booking = require("../models/bookingModel");

exports.signupEmployee = async (req, res) => {
    console.log("req.body ", req.body);
    let saltRounds = 10;
    let hashedPassword = await bcrypt.hash(req.body.password, saltRounds);

    try{
        let isUserPresent;
        isUserPresent = await Employee.findOne({email: req.body.email});

        if(isUserPresent) {
            res.status(400).send('Employee already exists!');
        }
        else {

            const newEmployee = new Employee({
                email: req.body.email,
                name: req.body.name,
                password: hashedPassword,
                contactNumber: req.body.contactNumber,
                address: req.body.address
            });
            newEmployee.save((err, data) => {
                if(err) {
                    console.log('error in saving to db ', err);
                    res.status(500).end('Error occured in saving to db');
                }
                else {
                    console.log('signup employee successful');
                    res.status(200).end('signup employee successful');
                }
            })
        }
    }
    catch(err) {
        console.log(err);
        res.status(500).end('Error in query execution for employee signup ');
    }
}

exports.loginEmployee = async (req, res) => {
    console.log('in login backend req.body ', req.body);
    try {
        let user;
        user = await Employee.findOne({email: req.body.email});
        console.log('user from db ', user);
        console.log('passwords from req.body and db ', req.body.password, user.password);

        let isPasswordMatch = await bcrypt.compare(req.body.password, user.password);
        if(isPasswordMatch) {
            console.log('passwords matched');
            res.send(user);
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

exports.addPlace = async (req, res) => {
    console.log("req.body ", req.body);

    try{

            const newHotel = new Hotel({
                email: req.body.email,
                name: req.body.name,
                location: req.body.location,
                description: req.body.description,
                photos: req.body.photos,
                inPhotos: req.body.inPhotos,
                basePrice: req.body.basePrice,
                amenitiesList: req.body.amenitiesList,
                amenitiesCharges: req.body.amenitiesCharges,
                noOfGuests: req.body.noOfGuests,
                roomCount: req.body.roomCount,
            });

            newHotel.save((err, data) => {
                if(err) {
                    console.log('error in saving to db ', err);
                    res.status(500).end('Error occured in saving to db');
                }
                else {
                    console.log('Hotel added successfully'+ data);

                    res.status(200).end(JSON.stringify(data));
                }
            })

    }
    catch(err) {
        console.log(err);
        res.status(500).end('Error in query execution for hotel ');
    }
}

exports.getAllHotels = async (req, res) => {
    // console.log("req.body ", req.body);
    // const roomId = req.params.id
    try{

            let hotels  = await Hotel.find();

            if(hotels){
                res.status(200).end(JSON.stringify(hotels));
            } else {
                res.status(500).end('Error occured in fetching hotels data');
            }


    }
    catch(err) {
        console.log(err);
        res.status(500).end('Error in query execution for hotels ');
    }
}



exports.getAllBookings = async (req, res) => {
    // console.log("req.body ", req.body);
    console.log("inside employee bookings", req.params.id)
    try{

            let bookings  = await Booking.find({email: req.params.id}).sort( { 'created': -1 } );

            if(bookings){
                res.status(200).end(JSON.stringify(bookings));
            } else {
                res.status(500).end('Error occured in fetching  bookings data');
            }


    }
    catch(err) {
        console.log(err);
        res.status(500).end('Error in query execution for bookings ');
    }
}