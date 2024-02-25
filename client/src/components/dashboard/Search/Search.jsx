import React, { useState } from 'react';
import { getSearchBookings } from './../../../service/bookingService';
import SearchResult from './SearchResult';

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [bookingDate, setBookingDate] = useState(null);
  const [data, setData] = useState([]);

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
    const data = await getSearchBookings(formattedDate, userName);
    setData(data.data);
    console.log(data.data);
  };

  const formatDate = (date) => {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
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
      <SearchResult data={data} />
    </div>
  );
};

export default Search;
