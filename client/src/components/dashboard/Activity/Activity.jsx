import React, { useState } from 'react';

const Activity = ({
  status = 'Pending',
  userName = 'username',
  phoneNumber = 'phone number',
  pickupLocation = 'pickup location',
  deliveryLocation = 'delivery location',
  seatNumber = 'seat number',
  travelDirection = 'travel direction',
  carTime = '6:00',
  message = 'message',
}) => {
  const [showDetails, setShowDetails] = useState(false);

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  const [selectedDate, setSelectedDate] = useState('');

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };
  console.log(selectedDate);

  return (
    <>
      <div className='flex items-center justify-between mb-2'>
        <input type='date' value={selectedDate} onChange={handleDateChange} />
        <span className='text-lg font-semibold'>{status}</span>
        <span className='text-gray-500'>{carTime}</span>
      </div>
      <div className='bg-white rounded-lg shadow-md p-4 mb-4'>
        <div className='flex items-center mb-2'>
          <span className='text-gray-500'>User: </span>
          <span>{userName}</span>
        </div>
        <div className='flex items-center mb-2'>
          <span className='text-gray-500'>Phone Number: </span>
          <span>{phoneNumber}</span>
        </div>
        {showDetails && (
          <>
            <div className='flex items-center mb-2'>
              <span className='text-gray-500'>Pickup Location: </span>
              <span>{pickupLocation}</span>
            </div>
            <div className='flex items-center mb-2'>
              <span className='text-gray-500'>Delivery Location: </span>
              <span>{deliveryLocation}</span>
            </div>
            <div className='flex items-center mb-2'>
              <span className='text-gray-500'>Seat Number: </span>
              <span>{seatNumber}</span>
            </div>
            <div className='flex items-center mb-2'>
              <span className='text-gray-500'>Travel Direction: </span>
              <span>{travelDirection}</span>
            </div>
            {message && (
              <div className='flex items-center mb-2'>
                <span className='text-gray-500'>Message: </span>
                <span>{message}</span>
              </div>
            )}
          </>
        )}
        <button
          className='text-blue-500 hover:underline'
          onClick={toggleDetails}
        >
          {showDetails ? 'Hide Details' : 'Show Details'}
        </button>
      </div>
    </>
  );
};

export default Activity;
