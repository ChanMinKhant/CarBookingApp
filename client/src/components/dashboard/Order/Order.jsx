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
        if (bookingDate === 'all') {
          console.log(bookingDate);
          const pendingSeatsData = await getPendingSeats(bookingDate);
          setPendingSeats(pendingSeatsData.data);
        } else {
          const formattedDate = bookingDate
            ? formatDate(new Date(bookingDate))
            : null;
          console.log(formattedDate);
          const pendingSeatsData = await getPendingSeats(formattedDate);
          setPendingSeats(pendingSeatsData.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (bookingDate) {
      fetchPendingSeats();
    }
  }, [bookingDate]);
  console.log(bookingDate);

  const formatDate = (date) => {
    const options = {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      timeZone: 'Asia/Yangon',
    };
    return date.toLocaleDateString('en-GB', options);
  };

  const handleApprove = async (id) => {
    try {
      // show comfirmation message
      if (window.confirm('Are you sure you want to approve this booking?')) {
        const response = await approveBooking(id);
        setPendingSeats(pendingSeats.filter((seat) => seat._id !== id));
        console.log(response);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      // show comfirmation message
      if (window.confirm('Are you sure you want to delete this booking?')) {
        const response = await deleteBooking(id);
        setPendingSeats(pendingSeats.filter((seat) => seat._id !== id));
        console.log(response);
      }
    } catch (error) {
      console.log(error.response);
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
      <div className='flex justify-center mt-4'>
        <button
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
          onClick={() => {
            setBookingDate('all');
          }}
        >
          View all orders
        </button>
      </div>
      <div className='mt-4'>
        {pendingSeats.length === 0 ? (
          <div className='flex justify-center mt-4 text-4xl text-red-500'>
            No order found.
          </div>
        ) : (
          <div>
            <div className='text-center mt-4'>
              <span className='text-lg font-bold'>
                Result: {pendingSeats.length}
              </span>
            </div>
            <div className='grid grid-cols-1 gap-4 mt-4'>
              <PendingSeatsList
                pendingSeats={pendingSeats}
                handleApprove={handleApprove}
                handleDelete={handleDelete}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Order;
