import React, { useState } from 'react';
import { getSearchBookings } from './../../../service/bookingService';
import SearchResult from './SearchResult';

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [bookingDate, setBookingDate] = useState(null);
  const [data, setData] = useState([]);
  const [searched, setSearched] = useState(false); // New state to track if search has been performed

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleDateChange = (e) => {
    setBookingDate(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formattedDate = bookingDate
      ? formatDate(new Date(bookingDate))
      : null;
    const userName = searchTerm;
    try {
      const responseData = await getSearchBookings(formattedDate, userName);
      setData(responseData.data);
      setSearched(true); // Set searched to true after search is performed
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  const formatDate = (date) => {
    const options = {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      timeZone: 'Asia/Yangon',
    };
    return date.toLocaleDateString('en-GB', options);
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className='w-full max-w-sm mx-auto mt-4'>
        <div className='flex items-center border-b-2 border-teal-500 py-2'>
          <input
            type='text'
            placeholder='Search...'
            value={searchTerm}
            onChange={handleChange}
            className='appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none'
          />
          <button
            type='submit'
            className='flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded'
          >
            Search
          </button>
        </div>
        <input
          type='date'
          onChange={handleDateChange}
          className='mt-4 mx-auto block'
          style={{ border: '2px solid black', fontSize: '1rem' }}
        />
      </form>
      {searched && data.length === 0 && (
        <div className='text-center mt-4 text-red-500 font-bold'>
          No result found.
        </div>
      )}
      {data.length > 0 && (
        <>
          <div className='text-center mt-4'>
            <span className='text-lg font-bold'>Result: {data.length}</span>
          </div>
          <div className='grid grid-cols-1 gap-4 mt-4'>
            <SearchResult data={data} />
          </div>
        </>
      )}
    </div>
  );
};

export default Search;
