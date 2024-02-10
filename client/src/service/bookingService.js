import apiService from './apiService';

export const checkSeatAvailability = async (date, time, from) => {
  try {
    if (from === 'Yangon → Pyay') {
      from = 'yangon';
    } else if (from === 'Pyay → Yangon') {
      from = 'pyay';
    }
    const response = await apiService.get(
      `/checkseat/?date=${date}&time=${time}&from=${from}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createBook = async (data) => {
  try {
    const response = await apiService.post(`/create-book`, data);
    return await response.data;
  } catch (error) {
    throw error;
  }
};

export const getPendingSeats = async () => {
  try {
    const response = await apiService.get('/pendingseats');
    return response.data.pendingBookings;
  } catch (error) {
    throw error;
  }
};

export const getApprovedSeats = async () => {
  try {
    const response = await apiService.get('/approvedseats');
    return response.data.approvedBookings;
  } catch (error) {
    throw error;
  }
};

export const approveBooking = async (id) => {
  try {
    const response = await apiService.put(`/approve/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const cancelBooking = async (id) => {
  try {
    const response = await apiService.put(`/cancel/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteBooking = async (id) => {
  try {
    const response = await apiService.put(`/delete/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getBookingDataForForm = async (date, time, from, seatNumber) => {
  try {
    if (from === 'Yangon → Pyay') {
      from = 'yangon';
    } else if (from === 'Pyay → Yangon') {
      from = 'pyay';
    } else {
      throw new Error('Please provide a valid from');
    }
    const response = await apiService.get(
      `/get-booking-data-for-form?date=${date}&time=${time}&from=${from}&seatNumber=${seatNumber}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
