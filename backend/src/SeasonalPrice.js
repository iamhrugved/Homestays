
module.exports = function(bookingPrice) {
    let sesaonalDiscount = 20;
    let v = bookingPrice.total();
    bookingPrice.total = function () {
        let currentMonth = new Date().getMonth();
        if(currentMonth === 4|| currentMonth === 5 || currentMonth === 6) {
            return v - sesaonalDiscount;
        }
        else {
            return v;
        }
    }
}