import React from 'react';

const Details = ({ data, showDetails, toggleDetails }) => {
  const {
    userName,
    phoneNumber,
    pickupLocation,
    deliveryLocation,
    carTime,
    seatNumber,
    travelDirection,
    message,
  } = data.booking_id;
  const { createdAt } = data;
  const createdAtDate = new Date(createdAt);

  // Format options for toLocaleString
  const options = {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
    timeZone: 'Asia/Yangon',
  };

  // Format the time in Myanmar time
  const formattedTime = createdAtDate.toLocaleString('en-US', options);
  return (
    <div className='flex items-center justify-center'>
      {' '}
      <div className='flex items-center justify-between mb-2'>
        <span className='text-lg font-semibold'>{data.status}</span>
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
        <div className='flex items-center mb-2'>
          <span className='text-gray-500'>Date: </span>
          <span>{formattedTime}</span>
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
    </div>
  );
};

export default Details;
