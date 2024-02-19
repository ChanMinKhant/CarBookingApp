import React from 'react';
import { addCarTime, removeCarTime } from '../../service/bookingService';
import { checkAdmin } from '../../service/adminService';
import DateDropdown from '../../utils/DateDropdown';
import TravelDirectionDropdown from '../../utils/TravelDirectionDropdown';

const ControlCarTime = () => {
  const [choseDate, setChoseDate] = React.useState('');
  const [chosenDirection, setChosenDirection] = React.useState('');
  const [isAdmin, setIsAdmin] = React.useState(false);
  React.useEffect(() => {
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

  const handleAddCarTime = async () => {
    try {
      console.log(choseDate, chosenDirection);
      const response = await addCarTime({
        bookingDate: choseDate,
        travelDirection: chosenDirection,
      });
      console.log(response);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const handleRemoveCarTime = async () => {
    try {
      const response = await removeCarTime({
        bookingDate: choseDate,
        travelDirection: chosenDirection,
      });
      console.log(response);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  if (!isAdmin) {
    return <div>You are not authorized to view this page.</div>;
  }
  return (
    <div className='flex flex-col justify-center items-center w-full h-auto'>
      <div className='flex flex-col items-start justify-center'>
        <DateDropdown setChoseDate={setChoseDate} />
        <TravelDirectionDropdown setChosenDirection={setChosenDirection} />
      </div>
      <div className='flex flex-col items-start justify-center'>
        <button
          className='bg-green-500 text-white p-2 rounded-md mb-3'
          onClick={handleAddCarTime}
        >
          Add Car Time
        </button>

        <button
          className='bg-red-500 text-white p-2 rounded-md'
          onClick={handleRemoveCarTime}
        >
          Remove Car Time
        </button>
      </div>
    </div>
  );
};

export default ControlCarTime;
