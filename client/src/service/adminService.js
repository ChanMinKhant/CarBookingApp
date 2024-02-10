import apiService from './apiService';

export const login = async (email, password) => {
  try {
    const response = await apiService.post(`/admin/login`, { email, password });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const checkAdmin = async () => {
  try {
    const response = await apiService.get(`/admin/isAdmin`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const approveByEmail = async (id, token) => {
  try {
    const response = await apiService.patch(`/admin/approve/${id}/${token}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const cancelByEmail = async (id, token) => {
  try {
    const response = await apiService.patch(`/admin/cancel/${id}/${token}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteByEmail = async (id, token) => {
  try {
    const response = await apiService.delete(`/admin/delete/${id}/${token}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
