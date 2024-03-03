import React, { useEffect, useState } from 'react';
import {
  getApprovedSeats,
  cancelBooking,
  deleteBooking,
} from '../../../service/bookingService';
import ApprovedSeatsList from './approvedSeatsList';

const Approved = () => {
  const today = new Date().toISOString().split('T')[0];
  const [bookingDate, setBookingDate] = useState(today);
  const [approvedSeats, setApprovedSeats] = useState([]);
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

  useEffect(() => {
    const fetchPendingSeats = async () => {
      try {
        const formattedDate = bookingDate
          ? formatDate(new Date(bookingDate))
          : null;
        const approvedSeatData = await getApprovedSeats(formattedDate);
        setApprovedSeats(approvedSeatData.data);
      } catch (error) {
        console.log(error.response);
      }
    };
    if (bookingDate) {
      fetchPendingSeats();
    }
  }, [bookingDate]);

  const handleCancel = async (id) => {
    try {
      if (window.confirm('Are you sure you want to cancel this booking?')) {
        const response = await cancelBooking(id);
        setApprovedSeats(approvedSeats.filter((seat) => seat._id !== id));
        console.log(response);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      if (window.confirm('Are you sure you want to delete this booking?')) {
        const response = await deleteBooking(id);
        setApprovedSeats(approvedSeats.filter((seat) => seat._id !== id));
        console.log(response);
      }
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
        {approvedSeats.length === 0 ? (
          <div className='flex justify-center mt-4 text-4xl text-red-500'>
            No approved seats found.
          </div>
        ) : (
          <div>
            <div className='text-center mt-4'>
              <span className='text-lg font-bold'>{approvedSeats.length}</span>{' '}
              Approved Seats
            </div>
            <div className='grid grid-cols-1 gap-4 mt-4'>
              {approvedSeats.map((seat, index) => (
                <ApprovedSeatsList
                  key={index}
                  seat={seat}
                  handleCancel={handleCancel}
                  handleDelete={handleDelete}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Approved;
