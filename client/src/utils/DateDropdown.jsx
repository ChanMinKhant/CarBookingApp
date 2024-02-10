import React, { useEffect, useState } from 'react';

const DateDropdown = ({ setChoseDate }) => {
  const [dates, setDates] = useState([]);
  const options = { day: '2-digit', month: '2-digit', year: 'numeric' };

  const handleChooseDate = (event) => {
    setChoseDate(event.target.value);
  };
  useEffect(() => {
    const today = new Date();
    const nextDates = [];
    for (let i = 0; i < 15; i++) {
      const nextDay = new Date(today);
      nextDay.setDate(today.getDate() + i);

      const formattedDate = nextDay.toLocaleDateString('en-GB', options);
      nextDates.push(formattedDate);
    }
    setDates(nextDates);

    setChoseDate(nextDates[0]); // Assuming set the first date
  }, []);

  return (
    <div className='mt-5'>
      <label>Select a date:</label>
      <select onChange={handleChooseDate}>
        {dates.map((date, index) => (
          <option key={index} value={date}>
            {date}
          </option>
        ))}
      </select>
    </div>
  );
};

export default React.memo(DateDropdown);
