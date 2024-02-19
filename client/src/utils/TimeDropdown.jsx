import React, { useEffect, useState } from 'react';

const TimeDropdown = ({ setChosenTime, choseDate }) => {
  const [times] = useState(['6:00', '6:05', '6:10', '6:15', '6:20']);
  const handleChooseTime = (event) => {
    setChosenTime(event.target.value);
  };
  useEffect(() => {
    if (choseDate) {
      // Fetch the time from the server
    }
    setChosenTime(times[0]); // Assuming set the first date
  }, []);

  return (
    <div className='mt-5'>
      <label>Select a time:</label>
      <select onLoad={handleChooseTime} onChange={handleChooseTime}>
        {times.map((time, index) => (
          <option key={index} value={time}>
            {time}
          </option>
        ))}
      </select>
    </div>
  );
};

export default React.memo(TimeDropdown);
