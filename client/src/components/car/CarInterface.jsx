import React, { useCallback, useEffect, useState } from 'react';
import {
  checkSeatAvailability,
  createBook,
  getApprovedSeats,
} from '../../service/bookingService';
import CarSeatIcon from '../../utils/CarSeatIcon';
import BookingForm from './BookingForm';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const defaultBook = {
  userName: '',
  phoneNumber: '',
  pickupLocation: '',
  deliveryLocation: '',
  seatNumber: null,
  message: '',
};

const CarInterface = ({
  data: { chosenDirection, choseDate, chosenTime },
  isAdmin,
}) => {
  const [availableSeats, setAvailableSeats] = useState([1, 2, 3, 4]);
  const [pendingSeats, setPendingSeats] = useState([]); // [1, 2, 3, 4]
  const [approvedSeats, setApprovedSeats] = useState([]);
  const [open, setOpen] = useState(false);
  //clicked is used to check if the button is clicked or not if clicked then run the tempFunc for admin
  //to get the seats data and show as default
  const [clicked, setClicked] = useState(false);
  const [book, setBook] = useState({
    ...defaultBook,
    travelDirection: '',
    carTime: '',
    bookingDate: '',
  });

  useEffect(() => {
    const tempFunc = async () => {
      if (choseDate) {
        const { pendingSeats, availableSeats, approvedSeats } =
          await checkSeatAvailability(choseDate, chosenTime, chosenDirection);
        console.log(availableSeats);
        setApprovedSeats(approvedSeats);
        setAvailableSeats(availableSeats);
        setPendingSeats(pendingSeats);
      }
    };
    if (!open) {
      tempFunc();
      setBook({
        ...book,
        travelDirection: chosenDirection,
        carTime: chosenTime,
        bookingDate: choseDate,
      });
    }
  }, [choseDate, chosenDirection, chosenTime, open]);

  const isSeatBooked = (seatNum) => availableSeats.includes(seatNum);
  const isSeatPending = (seatNum) => pendingSeats.includes(seatNum);
  const isSeatApproved = (seatNum) => approvedSeats.includes(seatNum);

  const addDataToBook = (data) => {
    setBook({ ...book, ...data });
  };

  const postToServer = async () => {
    try {
      // const existingBookingsJSON = sessionStorage.getItem('bookings');
      // const existingBookings = existingBookingsJSON
      //   ? JSON.parse(existingBookingsJSON)
      //   : [];
      // if (existingBookings.length < 2) {
      //   const res = await createBook(book);
      //   toast.success('Booking successful', {
      //     position: 'top-center',
      //   });
      //   setOpen(false);
      //   existingBookings.push(book);
      //   console.log(existingBookings);
      //   sessionStorage.setItem('book', JSON.stringify(existingBookings));
      //   setDefaultBook();
      //   toast.success('Booking successful');
      // } else {
      //   toast.error('You can only book 5 seats at a time', {
      //     position: 'top-center',
      //   });
      // }
    } catch (error) {
      console.log(error.response?.data?.message);
      toast.error(error.response?.data?.message || 'Booking failed', {
        position: 'top-center',
      });
    }
  };

  const setDefaultBook = () => {
    setBook({ ...book, ...defaultBook });
  };

  const handleSeat = useCallback(
    (seatNum) => {
      setBook({ ...book, seatNumber: seatNum });
      setOpen(true);
      setClicked(true);
    },
    [book, setBook, setOpen]
  );

  return (
    <div className='flex flex-col justify-center items-center m-5'>
      <h1 className='m-4 text-xl font-bold'>{chosenDirection}</h1>
      <BookingForm
        addDataToBook={addDataToBook}
        postToServer={postToServer}
        open={open}
        setOpen={setOpen}
        isAdmin={isAdmin}
        book={book}
        setBook={setBook}
        clicked={clicked}
        setClicked={setClicked}
        setDefaultBook={setDefaultBook}
      />
      <div className='border border-red-600 p-2 rounded-xl shadow-lg flex flex-col items-start justify-center gap-2'>
        <CarSeatIcon
          isApproved={isSeatApproved(1)}
          isAvailable={isSeatBooked(1)}
          isPending={isSeatPending(1)}
          handleSeat={handleSeat}
          isAdmin={isAdmin}
          Number={1}
        />
        <div className='flex justify-center items-center'>
          <CarSeatIcon
            isApproved={isSeatApproved(2)}
            isAvailable={isSeatBooked(2)}
            isPending={isSeatPending(2)}
            handleSeat={handleSeat}
            isAdmin={isAdmin}
            Number={2}
          />
          <CarSeatIcon
            isApproved={isSeatApproved(3)}
            isAvailable={isSeatBooked(3)}
            isPending={isSeatPending(3)}
            handleSeat={handleSeat}
            isAdmin={isAdmin}
            Number={3}
          />
          <CarSeatIcon
            isApproved={isSeatApproved(4)}
            isAvailable={isSeatBooked(4)}
            isPending={isSeatPending(4)}
            handleSeat={handleSeat}
            isAdmin={isAdmin}
            Number={4}
          />
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default CarInterface;
