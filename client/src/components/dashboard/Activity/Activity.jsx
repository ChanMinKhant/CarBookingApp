import React, { useState, useEffect } from 'react';
import Details from './Details';
import { getActivities } from '../../../service/bookingService';

const Activity = () => {
  const [showDetails, setShowDetails] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [activityData, setActivityData] = useState([]);

  useEffect(() => {
    // Function to fetch data based on the selected date
    const fetchData = async () => {
      try {
        const formattedDate = selectedDate
          ? formatDate(new Date(selectedDate))
          : null;
        // Assuming activities function returns data based on the date
        const data = await getActivities(formattedDate);
        setActivityData(data.data);
      } catch (error) {
        console.log(error.response.data);
      }
    };

    if (selectedDate) {
      fetchData();
    }
  }, [selectedDate]);

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const formatDate = (date) => {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return date.toLocaleDateString('en-GB', options);
  };

  return (
    <>
      <input type='date' value={selectedDate} onChange={handleDateChange} />
      {activityData.map((activity, index) => (
        <Details
          data={activity}
          showDetails={showDetails}
          setShowDetails={setShowDetails}
          key={index}
          toggleDetails={toggleDetails}
        />
      ))}
    </>
  );
};

export default Activity;
