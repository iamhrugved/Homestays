import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";

import "./reserve.css";
import useFetch from "../../hooks/useFetch";
import { useContext, useState, useEffect } from "react";
import { SearchContext } from "../../context/SearchContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Reserve = ({ setOpen, hotelId, finalPrice, noOfDays, hotelName }) => {
  const [selectedRooms, setSelectedRooms] = useState({ Single: 1, Double: 1, Suite: 1 });
  const [roomCosts, setRoomCosts] = useState({ Single: 0, Double: 0, Suite: 0 });
  const [amenities, setAmenities] = useState();
  const [data, setData] = useState();
  const [cost, setCost] = useState(finalPrice);
  const [rewards, setRewards] = useState(0)
  const [rewardsRemaining, setRewardsRemaining] = useState(0)
  const { dates, options } = useContext(SearchContext);
  const customerName = localStorage.getItem('name')
  const noOfGuests = options.adult + options.children

  useEffect(() => {
    axios.get(`/hotels/amenities`)
      .then(function (response) {
        // I need this data here ^^
        setAmenities(response.data)
      })
      .catch(function (error) {
        console.log(error);
      });
    axios.get(`/hotels/rooms/${hotelId}`)
      .then(function (response) {

        // I need this data here ^^
        setData(response.data)
        calculateRoomCosts(response.data)
      })
      .catch(function (error) {
        console.log(error);
      });
    axios.get(`/hotels/rewards/${customerName}`)
      .then(function (response) {

        // I need this data here ^^
        setRewards(response.data[0].rewards)
        console.log(response.data[0].rewards)
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const getDatesInRange = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const date = new Date(start.getTime());
    const dates = [];
    while (date <= end) {
      dates.push(new Date(date).getTime());
      date.setDate(date.getDate() + 1);
    }

    return dates;
  };

  const alldates = getDatesInRange(dates[0].startDate, dates[0].endDate);

  const handleAmenitiesCost = async (e) => {
    const value = e.target.value;
    const checked = e.target.checked
    if (checked) { setCost(cost + value * noOfDays) }
    else { setCost(cost - value * noOfDays) }
  };

  const handleRewards = async (e) => {
    const checked = e.target.checked
    if (checked) { 
      setCost(cost - rewards / 10)
      setRewardsRemaining(0)
    }
    else { 
      setCost(cost + rewards / 10) 
      setRewardsRemaining(rewards)
    }
  };

  const handleRoomsCost = async (e) => {
    const value = e.target.value;
    const name = e.target.name
    setSelectedRooms(prevState => ({ ...prevState, [name]: value }));
  };

  const calculateRoomCosts = (inp) => {
    const roomCosts = inp.map((item) => {
      if (item.roomType === 'Single') setRoomCosts(prevState => ({ ...prevState, ['Single']: item.baseRent }))
      if (item.roomType === 'Double') setRoomCosts(prevState => ({ ...prevState, ['Double']: item.baseRent }))
      if (item.roomType === 'Suite') setRoomCosts(prevState => ({ ...prevState, ['Suite']: item.baseRent }))
    })
  }

  const calculateFinalCost = () => {
    const singleRooms = selectedRooms["Single"]
    const doubleRooms = selectedRooms["Double"]
    const suiteRooms = selectedRooms["Suite"]
    let singleRoomRent = roomCosts['Single']
    let doubleRoomRent = roomCosts['Double']
    let suiteRoomRent = roomCosts['Suite']

    const totalCost =
      singleRooms * singleRoomRent * noOfDays +
      doubleRooms * doubleRoomRent * noOfDays +
      suiteRooms * suiteRoomRent * noOfDays +
      finalPrice
    setCost(totalCost)
    console.log(totalCost)
  }

  const navigate = useNavigate();

  const handleClick = () => {
    const room = Object.entries(selectedRooms).map(([k, v]) => ({
      Room: k,
      Guests: v
    }))
    const data = {
      hotelId,
      status: "Reserved",
      finalCost: cost,
      customerName,
      startDate: dates[0].startDate,
      endDate: dates[0].endDate,
      noOfGuests,
      hotelName,
      selectedRooms,
      room,
      rewards: rewardsRemaining
    }
    console.log(rewardsRemaining)
    axios.post(`/hotels/booking/${hotelId}`, data).then((res) => {
      console.log(res)
      setOpen(false);
      navigate('/booking')
    })
  };

  return (
    <div className="reserve">
      <div className="rContainer">
        <FontAwesomeIcon
          icon={faCircleXmark}
          className="rClose"
          onClick={() => setOpen(false)}
        />
        <span>Select your rooms:</span>
        {data && (data.map((item) => (
          <div className="rItem" key={item._id}>
            <div className="rItemInfo">
              <div className="rTitle">{item.roomType}</div>
              <div className="rDesc">{item.hotelId}</div>
              <div className="rMax">
                Max people: <b>{item.noOfGuests}</b>
              </div>
              <div className="rMax">
                Rooms Available: <b>{item.roomCount}</b>
              </div>
              <div className="rPrice">${item.baseRent}</div>
            </div>
            <div className="rSelectRooms">
              <div className="room">
                <label>No. of Rooms</label>
                <input
                  type="number"
                  name={item.roomType}
                  onChange={handleRoomsCost}
                  value={selectedRooms[item.roomType]}
                  min="0"
                  max={item.roomCount}
                />
              </div>
            </div>
          </div>
        )))}
        <h4>Enjoy extra benefits with negligible cost!</h4>
        {amenities && (amenities.map((item) => (
          <div key={item._id}>
            <div className="rTitle">
              <div className="rTitle"><input
                type="checkbox"
                value={item.charge}

                onChange={handleAmenitiesCost}
              />&nbsp;{item.name} - <b>${item.charge}</b>
              </div>
            </div>
          </div>
        )))}

        <div className="finalCost">
          <div className="finalCostItem">
            <button className="rButton" onClick={calculateFinalCost}>Calculate final cost</button>
          </div>
          <div className="finalCostItem">
            <h3>Total cost: ${cost}</h3>
          </div>
        </div>
        <div className="rewards"><input
          type="checkbox"
          value={rewards}
          onChange={handleRewards}
        />Apply your <b>{rewards}</b> reward points to get <b>${rewards / 10}</b> discount!
        </div>

        <button onClick={handleClick} className="rButton">
          Reserve Now
        </button>
        <p className="getRewards">Get <b>{cost/10}</b> reward points on this booking!</p>
      </div>
    </div>
  );
};

export default Reserve;