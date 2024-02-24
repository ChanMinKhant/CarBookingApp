import React, { useEffect, useState } from 'react';
import {
  getPendingSeats,
  approveBooking,
  deleteBooking,
} from './../../../service/bookingService';
import PendingSeatsList from './PendingSeatsList ';

const Order = () => {
  const today = new Date().toISOString().split('T')[0];
  const [bookingDate, setBookingDate] = useState(today);
  const [pendingSeats, setPendingSeats] = useState([]);

  useEffect(() => {
    const fetchPendingSeats = async () => {
      try {
        const formattedDate = bookingDate
          ? formatDate(new Date(bookingDate))
          : null;
        const pendingSeatsData = await getPendingSeats(formattedDate);
        setPendingSeats(pendingSeatsData.data);
      } catch (error) {
        console.log(error);
      }
    };
    if (bookingDate) {
      fetchPendingSeats();
    }
  }, [bookingDate]);

  const formatDate = (date) => {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return date.toLocaleDateString('en-GB', options);
  };
  console.log(bookingDate);

  const handleApprove = async (id) => {
    try {
      const response = await approveBooking(id);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await deleteBooking(id);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className='flex justify-center mt-4'>
        <input
          type='date'
          defaultValue={today}
          onChange={(e) => setBookingDate(e.target.value)}
          style={{ border: '2px solid black', fontSize: '2rem' }}
        />
      </div>
      <div className='mt-4'>
        <PendingSeatsList
          pendingSeats={pendingSeats}
          handleApprove={handleApprove}
          handleDelete={handleDelete}
        />
      </div>
    </div>
  );
};

export default Order;
