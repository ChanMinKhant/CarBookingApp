import React, { useEffect, useState } from 'react';
import { getPendingSeats } from './../../../service/bookingService';

const Order = () => {
  const [bookingDate, setBookingDate] = useState(null);
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

    fetchPendingSeats();
  }, [bookingDate]);

  const formatDate = (date) => {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return date.toLocaleDateString('en-GB', options);
  };
  console.log(bookingDate);

  return (
    <div>
      <input type='date' onChange={(e) => setBookingDate(e.target.value)} />

      <div className='mt-4'>
        {pendingSeats.map((seat, index) => (
          <div key={index} className='border p-4 my-2'>
            <p>
              <strong>Booking Date:</strong> {seat.bookingDate}
            </p>
            <p>
              <strong>Car Time:</strong> {seat.carTime}
            </p>
            <p>
              <strong>Delivery Location:</strong> {seat.deliveryLocation}
            </p>
            <p>
              <strong>Is Approved:</strong> {seat.isApproved ? 'Yes' : 'No'}
            </p>
            <p>
              <strong>Message:</strong> {seat.message}
            </p>
            <p>
              <strong>Phone Number:</strong> {seat.phoneNumber}
            </p>
            <p>
              <strong>Pickup Location:</strong> {seat.pickupLocation}
            </p>
            <p>
              <strong>Seat Number:</strong> {seat.seatNumber}
            </p>
            <p>
              <strong>Travel Direction:</strong> {seat.travelDirection}
            </p>
            <p>
              <strong>User Name:</strong> {seat.userName}
            </p>

            <div className='flex mt-2'>
              <button className='bg-green-500 text-white px-4 py-2 mr-2'>
                Approve
              </button>
              <button className='bg-red-500 text-white px-4 py-2'>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Order;
