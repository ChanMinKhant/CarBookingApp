import React, { useEffect, useState } from 'react';

const TimeDropdown = ({ setChosenTime, choseDate, count }) => {
  const [times] = useState(['6:00', '6:05', '6:10', '6:15', '6:20']);
  const handleChooseTime = (event) => {
    setChosenTime(event.target.value);
  };
  useEffect(() => {
    setChosenTime(times[0]); // Assuming set the first date
  }, []);

  // Prepare options before the return statement
  // const options = [];
  // for (let i = 0; i < count && i < times.length; i++) {
  //   options.push(
  //     <option key={i} value={times[i]}>
  //       {times[i]}
  //     </option>
  //   );
  // }

  const options = times.slice(0, count).map((time, index) => (
    <option key={index} value={time}>
      {time}
    </option>
  ));

  return (
    <div className='mt-5'>
      <label>Select a time:</label>
      <select onLoad={handleChooseTime} onChange={handleChooseTime}>
        {options}
      </select>
    </div>
  );
};

export default React.memo(TimeDropdown);
