import React, { useEffect } from 'react';
import useAdminCheck from '../../hooks/useAdminCheck';
import DateDropdown from '../../utils/DateDropdown';
import TimeDropdown from '../../utils/TimeDropdown';
import Loading from '../../utils/Loading';
import TravelDirectionDropdown from '../../utils/TravelDirectionDropdown';
import CarInterface from './CarInterface';
import { getCount } from '../../service/bookingService';

// i need to use memo not to execute the function again and again
// when i change only date or time or direction only want to render the necessary part
const Cars = () => {
  const [choseDate, setChoseDate] = React.useState('');
  const [chosenTime, setChosenTime] = React.useState('');
  const [chosenDirection, setChosenDirection] = React.useState('');
  const [count, setCount] = React.useState(0);
  const data = {
    choseDate,
    chosenTime,
    chosenDirection,
  };
  const { isAdmin, loading, setLoading } = useAdminCheck();
  console.log(isAdmin, loading);

  useEffect(() => {
    const getCounts = async () => {
      try {
        setLoading(true);
        const response = await getCount(choseDate, chosenDirection);
        setCount(response.count);
        setLoading(false);
      } catch (error) {
        console.log(error.response.data.message);
      }
    };
    if (choseDate && chosenDirection) getCounts();
  }, [choseDate, chosenDirection]);
  console.log(count);
  // if (loading) return <Loading />;
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
      {loading ? <Loading /> : <CarInterface data={data} isAdmin={isAdmin} />}
    </div>
  );
};

export default Cars;
