import "./booking.css";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import MailList from "../../components/mailList/MailList";
import Footer from "../../components/footer/Footer";
import { useContext, useState, useEffect } from "react";
import useFetch from "../../hooks/useFetch";
import { useLocation, useNavigate } from "react-router-dom";
import { SearchContext } from "../../context/SearchContext";
import axios from "axios";
import moment from "moment";
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from "@material-ui/core";


const Hotel = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [showModal, setShowModal] = useState(false);
  const [rewards, setRewards] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [bookingsPerPage] = useState(1);

  const { data, loading, error } = useFetch(`/hotels/booking/${localStorage.getItem('name')}`);

  useEffect(() => {
    axios.get(`/hotels/rewards/${localStorage.getItem('name')}`)
        .then(function (response) {
            // I need this data here ^^
            // console.log(response.data);
            setRewards(response.data[0].rewards)
        })
        .catch(function (error) {
            console.log(error);
        });
        
  }, []);

  const navigate = useNavigate();

  // const { dates, options } = useContext(SearchContext);
  // console.log(data);
  // console.log(rewards);

  const indexOfLastBooking = currentPage * bookingsPerPage;
  const indexOfFirstBooking = indexOfLastBooking - bookingsPerPage;
  const currentBookings = data.slice(
    indexOfFirstBooking,
    indexOfLastBooking
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleClick = (e) => {
      console.log(e);
      axios.put(`/hotels/booking/${e}`)
      .then((res) => {
        alert('Reservation Cancelled!');
        window.location.reload();
        // console.log(res);
      })
      .catch((err)=>{
        console.log(err);
      })
  };

  const handleHome = () => {
    navigate("/customer");
  };

  const handleOpenModal = (e) => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };


  return (
    <div>
      <Navbar />
      <Header type="list" />
      {loading ? (
        "loading"
      ) :(
        <div className="hotelContainer">
           <div className="hotelWrapper">
            
          {currentBookings.map((item) => (
             <div className="col">
              <div className="hotelDetailsTexts">
                 <h1 className="hotelTitle">{item.hotelName}</h1>
                 <p className="hotelDesc">Customer: {item.customerName}</p>
                 <p className="hotelDesc">No. of Guests: {item.noOfGuests}</p>
                 <p className="hotelDesc">Reserved From: {moment(item.startDate).format('MM-DD-YYYY').toString()} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Reserved Till: {moment(item.endDate).format('MM-DD-YYYY').toString()}</p>
                 <p className="hotelDesc">Amount Paid: ${item.finalCost}</p>
                 <p className="hotelDesc">Booking Status: {item.status}</p>
                 {/* <button className="can" onClick={() => { handleClick(`${item._id}`) }}>Cancel Reservation</button> */}
                 <button className="can" onClick={() => { handleOpenModal(`${item._id}`) }}>Cancel Reservation</button>
                 <Dialog open={showModal} onClose={handleCloseModal}>
                  <DialogTitle>Confirm Cancel</DialogTitle>
                  <DialogContent>
                    <DialogContentText>
                      Are you sure you want to cancel this reservation?
                      Any reward points used will not be refunded.
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleCloseModal} color="primary">
                      Cancel
                    </Button>
                    <Button onClick={() => { handleClick(`${item._id}`); handleCloseModal(); }} color="secondary">
                      Confirm
                    </Button>
                  </DialogActions>
                </Dialog>
               </div>
            
               </div>
            
          ))}
          <div className="pagination">
            {currentPage > 1 && (
              <button className="arrow" onClick={() => paginate(currentPage - 1)}>
                &#8249;
              </button>
            )}
            {data.length > bookingsPerPage && (
              <ul className="pagination">
                {Array.from(
                  { length: Math.ceil(data.length / bookingsPerPage) },
                  (_, i) => (
                    <li key={i} className={`page-item ${i + 1 === currentPage ? 'active' : ''}`} onClick={() => paginate(i + 1)}>
                      <span className="page-link">{i + 1}</span>
                    </li>
                  )
                )}
              </ul>
            )}
            {currentPage < Math.ceil(data.length / bookingsPerPage) && (
              <button className="arrow" onClick={() => paginate(currentPage + 1)}>
                &#8250;
              </button>
            )}
          </div>
          <div className="bookNow">
              <div className="hotelDetailsTexts">
              </div>

              <div className="hotelDetailsPrice">
                <p className="hotelTitle">
                  Your Rewards
                </p>
                  <h2>
                  <b>{rewards.toFixed(0)}</b>
                  
                  </h2>
                <button onClick={handleHome}>Use Your Rewards on Booking!</button>
              </div>
            </div>  
          
          </div> 
             
          <MailList />
          <Footer />
        </div>
      )
      }
    </div>
  );
};

export default Hotel;
