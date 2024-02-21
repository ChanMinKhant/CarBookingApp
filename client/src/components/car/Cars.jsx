import React, { useEffect } from 'react';
import { checkAdmin } from '../../service/adminService';
import DateDropdown from '../../utils/DateDropdown';
import TimeDropdown from '../../utils/TimeDropdown';
import TravelDirectionDropdown from '../../utils/TravelDirectionDropdown';
import CarInterface from './CarInterface';
import { getCount } from '../../service/bookingService';

// i need to use memo not to execute the function again and again
// when i change only date or time or direction only want to render the necessary part
const Cars = () => {
  const [choseDate, setChoseDate] = React.useState('');
  const [chosenTime, setChosenTime] = React.useState('');
  const [chosenDirection, setChosenDirection] = React.useState('');
  const [isAdmin, setIsAdmin] = React.useState(false);
  const [count, setCount] = React.useState(0);
  const data = {
    choseDate,
    chosenTime,
    chosenDirection,
  };

  useEffect(() => {
    const checkAdm = async () => {
      try {
        const response = await checkAdmin();
        setIsAdmin(Boolean(response.isAdmin));
      } catch (error) {
        setIsAdmin(false);
      }
    };
    checkAdm();
  }, []);

  useEffect(() => {
    const getCounts = async () => {
      try {
        const response = await getCount(choseDate, chosenDirection);
        setCount(response.count);
      } catch (error) {
        console.log(error.response.data.message);
      }
    };
    if (choseDate && chosenDirection) getCounts();
  }, [choseDate, chosenDirection]);
  console.log(count);
  return (
    <div className='flex flex-col justify-center items-center w-full h-auto'>
      {/* Car img */}
      <div className='flex flex-col items-start justify-center'>
        <DateDropdown setChoseDate={setChoseDate} />
        <TimeDropdown
          setChosenTime={setChosenTime}
          carDate={choseDate}
          count={count}
        />
        <TravelDirectionDropdown setChosenDirection={setChosenDirection} />
      </div>
      <CarInterface data={data} isAdmin={isAdmin} />
    </div>
  );
};

export default Cars;
