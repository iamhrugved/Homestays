import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";

import "./reserve.css";
import useFetch from "../../hooks/useFetch";
import { useContext, useState, useEffect } from "react";
import { SearchContext } from "../../context/SearchContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Reserve = ({ setOpen, hotelId, finalPrice, noOfDays, hotelName, surcharge }) => {
  const [amenities, setAmenities] = useState();
  const [cost, setCost] = useState(finalPrice);
  const [rewards, setRewards] = useState(0)
  const [finalSurcharge, setFinalSurcharge] = useState(0)
  const [rewardsRemaining, setRewardsRemaining] = useState(0)
  const { dates, options } = useContext(SearchContext);
  const customerName = localStorage.getItem('name')
  const noOfGuests = options.adult + options.children

  useEffect(() => {
    axios.get(`/hotels/amenities/${hotelId}`)
      .then(function (response) {
        // I need this data here ^^
        console.log(response.data)
        setAmenities(response.data)
      })
      .catch(function (error) {
        console.log(error);
      });
    axios.get(`/hotels/rewards/${customerName}`)
      .then(function (response) {
        // I need this data here ^^
        setRewards(response.data[0].rewards)
      })
      .catch(function (error) {
        console.log(error);
      });
      if (surcharge === 0) {
        setFinalSurcharge(1)
      } else {
        const finalSur = (100+surcharge) / 100
        setFinalSurcharge(finalSur.toFixed(1))
      }
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
    console.log(checked, value)
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
      setRewardsRemaining(rewards.toFixed(0))
    }
  };




  const calculateFinalCost = () => {
    const totalCost = finalPrice
    setCost(totalCost)
    console.log(totalCost)
  }

  const navigate = useNavigate();

  const handleClick = () => {

    const data = {
      hotelId,
      status: "Reserved",
      finalCost: (cost*finalSurcharge).toFixed(1),
      customerName,
      startDate: dates[0].startDate,
      endDate: dates[0].endDate,
      noOfGuests,
      hotelName,
      rewards: rewardsRemaining
    }
    console.log(data)
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
        <h4>Enjoy extra benefits with negligible cost!</h4>
        {amenities && (amenities.map((item) => (
          <div key={item._id}>
            <div className="rTitle">
              <div className="rTitle"><input
                type="checkbox"
                value={item.amenitiesCharges}
                onChange={handleAmenitiesCost}
              />&nbsp;{item.amenitiesList} - <b>${item.amenitiesCharges}</b><i>/day</i>
              </div>
            </div>
          </div>
        )))}
        <div className="finalCost">
          <div className="finalCostItem">
            <button className="rButton" onClick={calculateFinalCost}>Calculate final cost</button>
          </div>
          <div className="finalCostItem">
            <h3>Total cost: ${(cost*finalSurcharge).toFixed(1)}</h3>
          </div>
        </div>
        <div className="rewards"><input
          type="checkbox"
          value={rewards}
          onChange={handleRewards}
        />Apply your <b>{rewards.toFixed(0)}</b> reward points to get <b>${(rewards / 10).toFixed(1)}</b> discount!
        </div>

        <button onClick={handleClick} className="rButton">
          Reserve Now
        </button>
        <p className="getRewards">Get <b>{(cost/10).toFixed(0)}</b> reward points on this booking!</p>
      </div>
    </div>
  );
};

export default Reserve;