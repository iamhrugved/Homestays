require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const port = 8800;
const indexRouter = require('./routes/index');
const custRouter = require('./routes/custRouter');
const employeeRouter = require('./routes/employeeRouter');
const hotelRouter = require('./routes/hotelRouter')
const session = require('express-session');
const cookieParser = require('cookie-parser');
const { connect } = require('mongoose');
const FRONTEND_URL = "http://localhost:3000"
var LocalStorage = require('node-localstorage').LocalStorage;
localStorage = new LocalStorage('./local');
// const FRONTEND_URL = "http://3.15.147.196:3000"

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//listening
app.listen(port, () => console.info("Listening on port " + port));

//use cors to allow cross origin resource sharing
app.use(cors({ origin: FRONTEND_URL, credentials: true }));

//use express session to maintain session data
app.use(session({
    secret              : 'FinalFlash_CMPE280',
    resave              : false, // Forces the session to be saved back to the session store, even if the session was never modified during the request
    saveUninitialized   : false, // Force to save uninitialized session to db. A session is uninitialized when it is new but not modified.
    duration            : 60 * 60 * 1000, // Overall duration of Session : 30 minutes : 1800 seconds
    activeDuration      :  5 * 60 * 1000
}));

//Allow Access Control
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', FRONTEND_URL);
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    res.setHeader('Cache-Control', 'no-cache');
    next();
  });

const { mongoConnectionURL } = require('./database/mongoConnection');
const mongoose = require('mongoose');

const mongoDbOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  maxPoolSize: 100
}

mongoose.set('strictQuery', true);
mongoose.connect(mongoConnectionURL, mongoDbOptions, (err, result) => {
    if(err){
      console.log("Error while connecting to mongoDB : "+err);
    } else {
      console.log("Connected to Mongo DB!");
    }
});
// auth();
app.use(express.json());
app.use("/", indexRouter);
app.use("/customer", custRouter);
app.use("/employee", employeeRouter);
app.use("/hotels", hotelRouter);

//app.use(cookieParser);


BookingPrice = require('./BookingPrice.js');
SeasonalPrice = require('./SeasonalPrice.js');
HolidayPrice = require('./HolidayPrice.js');

// let bookingPrice = new BookingPrice(100);
// SeasonalPrice(bookingPrice);
// HolidayPrice(bookingPrice);
// console.log(bookingPrice.total());