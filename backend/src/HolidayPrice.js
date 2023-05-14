let Holidays = require('date-holidays');
       
module.exports = function(bookingPrice) {
    let holidayDiscount = 50;
    let v = bookingPrice.total();
    bookingPrice.total = function () {
        hd = new Holidays('US', 'la', 'no')
        hd.getHolidays(new Date().getFullYear());
        if(hd.isHoliday(new Date())) {
            return v - holidayDiscount;
        }
        else {
            return v;
        }
    }
}