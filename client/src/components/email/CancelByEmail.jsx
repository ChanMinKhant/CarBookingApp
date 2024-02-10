import React, { useState, useEffect } from 'react';
import { cancelByEmail } from '../../service/adminService';
import { useParams } from 'react-router-dom';

const CancelByEmail = () => {
  const [message, setMessage] = useState('cancling...');
  const { id, token } = useParams();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await cancelByEmail(id, token);
        setMessage(response.data?.message || 'Booking cancelled successfully!');
      } catch (error) {
        setMessage(error.response?.data?.message || 'Something went wrong!');
      }
    };
    fetchData();
  }, []);
  return (
    <div className='flex justify-center items-center h-screen'>
      <div className='max-w-md w-full bg-white shadow-md p-8 rounded-md'>
        <h2 className='text-2xl mb-4 font-semibold text-center'>
          Cancellation Status
        </h2>
        <div className='text-center'>{message}</div>
      </div>
    </div>
  );
};

export default CancelByEmail;
