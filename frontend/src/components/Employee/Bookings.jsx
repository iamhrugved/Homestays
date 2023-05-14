import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import { serverURL } from '../../utils/config';

function BookingsTable() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    async function fetchBookings() {
      try {
        const response = await axios.get(`${serverURL}/employee/bookings/${localStorage.getItem('email')}`);
        setBookings(response.data);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchBookings();
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="bookings table">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Guest Name</TableCell>
            <TableCell>No Of Guests</TableCell>
            <TableCell>Place Reserved</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {bookings.map((booking) => (
            <TableRow key={booking._id}>
              <TableCell>{new Date(booking.startDate).toLocaleDateString()} - {new Date(booking.endDate).toLocaleDateString()}</TableCell>
              <TableCell>{booking.customerName}</TableCell>
              <TableCell>{booking.noOfGuests}</TableCell>
              <TableCell>{booking.hotelName}</TableCell>
              <TableCell>${booking.finalCost}</TableCell>
              <TableCell>{booking.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default BookingsTable;
