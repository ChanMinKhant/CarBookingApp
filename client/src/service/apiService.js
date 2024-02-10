import axios from 'axios';

axios.defaults.withCredentials = true;

// const apiService = axios.create({
//   baseURL: 'http://localhost:3000',
//   withCredentials: true,
// });

const apiService = axios.create({
  baseURL: 'https://carbookingapp.onrender.com',
  withCredentials: true,
});

export default apiService;

// axios.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   (error) => {
//     if (error.response.status === 401) {
//       window.location.href = '/login';
//     }
//     return error;
//   }
// );
