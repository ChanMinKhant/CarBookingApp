import { useEffect, useState } from "react";
import {
  getBookingDataForForm,
  cancelBooking,
  approveBooking,
  deleteBooking,
} from "../../service/bookingService";
import { toast, ToastContainer } from "react-toastify";

const BookingForm = ({
  addDataToBook,
  postToServer,
  open,
  setOpen,
  isAdmin,
  book,
  setBook,
  clicked,
  setClicked,
  setDefaultBook,
}) => {
  const tempFunc = async () => {
    try {
      const res = await getBookingDataForForm(
        book.bookingDate,
        book.carTime,
        book.travelDirection,
        book.seatNumber
      );
      if (res.data.length === 0) {
      }
      setBook(res.data[0]);
      setClicked(false);
    } catch (err) {
      console.log(err.response?.data?.message);
    }
  };

  useEffect(() => {
    if (clicked && isAdmin) {
      tempFunc();
    }
  }, [clicked, isAdmin]);

  const handleInputChange = (property, evt) => {
    addDataToBook({ [property]: evt.target.value });
  };

  const handleApproveBooking = async () => {
    try {
      const res = await approveBooking(book?._id);
      toast.success("Booking Approved");
    } catch (err) {
      console.log(err.response?.data?.message);
    }
  };

  const handleCancleBooking = async () => {
    try {
      const res = await cancelBooking(book?._id);
      console.log(res);
    } catch (err) {
      console.log(err.response?.data?.message);
    }
  };

  const handleDeleteBooking = async () => {
    try {
      const res = await deleteBooking(book?._id);
      console.log(res);
    } catch (err) {
      console.log(err.response?.data?.message);
    }
  };

  if (open) {
    return (
      <div
        className={`absolute z-50 w-[80vw] h-auto border border-gray-100 bg-white shadow-lg rounded-lg flex flex-col justify-center items-center p-5 m-5 ${
          open ? "" : "hidden"
        }`}
      >
        <button
          onClick={() => {
            setOpen(false);
            setClicked(false);
            setDefaultBook();
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 hover:bg-red-100 rounded-full p-1 absolute right-2 top-2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18 18 6M6 6l12 12"
            />
          </svg>
        </button>
        <h1 className="m-2 text-orange-500 font-bold">Your Information</h1>
        <div className="m-2">
          <h1>Name:</h1>
          <input
            defaultValue={book?.userName ? book.userName : ""}
            onChange={(evt) => handleInputChange("userName", evt)}
            type="text"
            className="w-[64vw] h-[5vh] bg-gray-200 rounded-lg p-4 focus:outline-orange-300"
          />
        </div>
        <div className="m-2">
          <h1>Phone number:</h1>
          <input
            defaultValue={book?.phoneNumber ? book?.phoneNumber : ""}
            onChange={(evt) => handleInputChange("phoneNumber", evt)}
            type="text"
            className="w-[64vw] h-[5vh] bg-gray-200 rounded-lg p-4 focus:outline-orange-300"
          />
        </div>
        <div className="m-2">
          <h1>Location to pick you up:</h1>
          <input
            defaultValue={book?.pickupLocation ? book?.pickupLocation : ""}
            onChange={(evt) => handleInputChange("pickupLocation", evt)}
            type="text"
            className="w-[64vw] h-[5vh] bg-gray-200 rounded-lg p-4 focus:outline-orange-300"
          />
        </div>
        <div className="m-2">
          <h1>Your destination:</h1>
          <input
            defaultValue={book?.deliveryLocation ? book?.deliveryLocation : ""}
            onChange={(evt) => handleInputChange("deliveryLocation", evt)}
            type="text"
            className="w-[64vw] h-[5vh] bg-gray-200 rounded-lg p-4 focus:outline-orange-300"
          />
        </div>
        <div className="m-2">
          <h1>Leave us a message:</h1>
          <input
            defaultValue={book?.message ? book?.message : ""}
            onChange={(evt) => handleInputChange("message", evt)}
            type="text"
            className="w-[64vw] h-[5vh] bg-gray-200 rounded-lg p-4 focus:outline-orange-300"
          />
        </div>
        <button
          onClick={postToServer}
          className="m-2 bg-orange-500 hover:bg-orange-300 hover:border-solid hover:border-2 hover:border-orange-600 active:shadow-md text-white w-[24vw] rounded-full p-2"
        >
          Book
        </button>
        <div>
          {isAdmin &&
            (book.isApproved ? (
              <button
                onClick={handleCancleBooking}
                className="m-2 bg-orange-500 hover:bg-orange-300 hover:border-solid hover:border-2 hover:border-orange-600 active:shadow-md text-white w-32 rounded-full p-2"
              >
                Cancle
              </button>
            ) : (
              <button
                onClick={handleApproveBooking}
                className="m-2 bg-orange-600 hover:bg-orange-300 text-white w-auto rounded-full p-2"
              >
                Approve
              </button>
            ))}
          {isAdmin && (
            <button
              className="m-2 bg-orange-600 hover:bg-orange-300 hover:border-solid hover:border-2 hover:border-orange-600 active:shadow-md w-32 text-white rounded-full p-2"
              onClick={handleDeleteBooking}
            >
              delete
            </button>
          )}
        </div>
      </div>
    );
  }
};

export default BookingForm;
