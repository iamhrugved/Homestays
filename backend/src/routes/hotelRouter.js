const express = require('express');
const { 
    getHotels, 
    getHotel, 
    postBooking, 
    getBooking, 
    putBooking, 
    getAllHotels, 
    getAmenities, 
    getRewards, 
    getDiscounts } =  require("../contollers/hotelController");

const router = express.Router();


router.get("/", getHotels);
router.get("/find/:id", getHotel);
router.get("/amenities/:id", getAmenities)
router.post("/booking/:id", postBooking);
router.get("/booking/:id", getBooking);
router.put("/booking/:id", putBooking);
router.get("/allHotels", getAllHotels);
router.get("/rewards/:id", getRewards);
router.get("/setRewards/:id", getRewards);
router.post("/getDiscounts/", getDiscounts);


module.exports = router;
