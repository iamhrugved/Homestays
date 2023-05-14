import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardHeader, CardContent, CardActions, Button, CardMedia } from '@material-ui/core';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Header from './Header';
import BookingsTable from './Bookings';
import { serverURL } from '../../utils/config';

const useStyles = makeStyles({
  card: {
    width: '300px',
    margin: '15px',
  },
  cardTitle: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
  },
  cardContent: {
    minHeight: '5px',
  },
  button: {
    margin: '10px',
  },
});

const EmployeeDashboard = () => {
  const classes = useStyles();
  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const response = await axios.get(`${serverURL}/employee/hotels`);
        setHotels(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchHotels();
  }, []);

  return (
    <><Header /><div>
          <Button component={Link} to="/admin/addplace" variant="contained" color="primary" className={classes.button}>
              Add New Place
          </Button>
          <div style={{ display: 'flex', flexWrap: 'wrap' }}>
              {hotels.map((hotel) => (
                  <Card key={hotel._id} className={classes.card}>
                      <CardHeader title={hotel.name} classes={{ title: classes.cardTitle }} />
                      <CardMedia component="img" image={hotel.photos} height="150" />
                      <CardContent className={classes.cardContent}>
                          <div>
                              <span style={{ fontWeight: 'bold' }}>Location:</span> {hotel.location}
                          </div>
                          <div>
                              <span style={{ fontWeight: 'bold' }}>Description:</span> {hotel.description}
                          </div>
                          <div>
                              <span style={{ fontWeight: 'bold' }}>Base Price:</span> {hotel.basePrice}
                          </div>
                          {/* <div>
                              <span style={{ fontWeight: 'bold' }}>Amenities:</span> {hotel.amenitiesList}
                          </div>
                          <div>
                              <span style={{ fontWeight: 'bold' }}>Amenities Charges:</span> {hotel.amenitiesCharges}
                          </div>
                          <div>
                              <span style={{ fontWeight: 'bold' }}>No. of Guests:</span> {hotel.noOfGuests}
                          </div>
                          <div>
                              <span style={{ fontWeight: 'bold' }}>Rooms:</span> {hotel.roomCount}
                          </div> */}
                      </CardContent>
                      {/* <CardActions>
    <Button component={Link} to={`/admin/addplace/${hotel._id}`} size="small">
      Edit
    </Button>
  </CardActions> */}
                  </Card>
              ))}
          </div>
          <BookingsTable />
      </div></>
  );
};

export default EmployeeDashboard;
