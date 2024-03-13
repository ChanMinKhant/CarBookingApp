import React, { useEffect } from 'react';

const TravelDirectionDropdown = ({ setChosenDirection }) => {
  const directions = ['Pyay → Yangon', 'Yangon → Pyay'];

  const handleChooseDirection = (event) => {
    setChosenDirection(event.target.value);
  };

  useEffect(() => {
    setChosenDirection(directions[0]);
  }, []);

  return (
    <div className='mt-3'>
      <label>Select a travel direction:</label>
      <select onChange={handleChooseDirection}>
        {directions.map((direction, index) => (
          <option key={index} value={direction}>
            {direction}
          </option>
        ))}
      </select>
    </div>
  );
};

export default React.memo(TravelDirectionDropdown);
