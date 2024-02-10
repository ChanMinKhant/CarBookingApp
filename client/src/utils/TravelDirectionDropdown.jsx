import React, { useEffect } from 'react';

const TravelDirectionDropdown = ({ setChosenDirection }) => {
  console.log('TravelDirectionDropdown rendered');
  const directions = ['Yangon → Pyay', 'Pyay → Yangon'];

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
