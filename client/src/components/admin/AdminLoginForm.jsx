import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../../service/adminService';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdminLoginForm = () => {
  // Step 2: Create useRef instances
  const [adminData, setAdminData] = useState({
    email: '',
    password: '',
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await login(adminData.email, adminData.password);
      if (res) {
        toast.success(res?.data?.message || 'you are admin', {
          position: 'top-center',
        });
        navigate('/');
      }
    } catch (error) {
      console.log(error.response);
      toast.error('you are not admin', {
        position: 'top-center',
      });
    }
  };

  return (
    <>
      <div className='w-[100vw] h-[100vh] flex justify-center items-center'>
        <form className='w-[80dvw] h-[80dvh] border border-gray-100 shadow-lg rounded-lg flex flex-col justify-center items-center p-5'>
          <h1 className='m-5 text-orange-500 font-bold'>Admin Information</h1>
          <div className='m-3'>
            <h1>Email:</h1>
            {/* Step 3: Attach ref to the email input field */}
            <input
              onChange={(evt) =>
                setAdminData({ ...adminData, email: evt.target.value })
              }
              type='email'
              className='w-[64dvw] h-[5dvh] bg-gray-200 rounded-lg p-2 focus:outline-orange-300'
            />
          </div>
          <div className='m-3'>
            <h1>Password:</h1>
            {/* Step 3: Attach ref to the password input field */}
            <input
              onChange={(evt) =>
                setAdminData({ ...adminData, password: evt.target.value })
              }
              type='password'
              className='w-[64dvw] h-[5dvh] bg-gray-200 rounded-lg p-2 focus:outline-orange-300'
            />
          </div>
          <button
            onClick={handleSubmit}
            type='submit'
            className='m-2 bg-orange-500 hover:bg-orange-300 text-white w-[24dvw] rounded-full p-2'
          >
            Submit
          </button>
        </form>
      </div>
      <ToastContainer />
    </>
  );
};

export default AdminLoginForm;
