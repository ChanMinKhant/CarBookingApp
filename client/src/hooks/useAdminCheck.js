// import { useState, useEffect } from 'react';
// import { checkAdmin } from '../service/adminService';

// const useAdminCheck = () => {
//   const [isAdmin, setIsAdmin] = useState(false);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const checkAdminStatus = async () => {
//       try {
//         const response = await checkAdmin();
//         setIsAdmin(Boolean(response.isAdmin));
//       } catch (error) {
//         setIsAdmin(false);
//       } finally {
//         setLoading(false);
//       }
//     };
//     if (!isAdmin && loading) {
//       checkAdminStatus();
//     } else {
//       setLoading(false);
//     }
//   }, []);

//   return { isAdmin, loading, setLoading };
// };

// export default useAdminCheck;

// version 2 using session storage

import { useState, useEffect } from 'react';
import { checkAdmin } from '../service/adminService';

const useAdminCheck = () => {
  const [isAdmin, setIsAdmin] = useState(() => {
    // Check if isAdmin status is stored in session storage
    const isAdminCached = sessionStorage.getItem('isAdmin');
    return isAdminCached ? JSON.parse(isAdminCached) : false;
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAdminStatus = async () => {
      console.log('calling checkAdminStatus');
      try {
        const response = await checkAdmin();
        const isAdmin = Boolean(response.isAdmin);
        setIsAdmin(isAdmin);
        // Store isAdmin status in session storage
        sessionStorage.setItem('isAdmin', JSON.stringify(isAdmin));
      } catch (error) {
        setIsAdmin(false);
        sessionStorage.setItem('isAdmin', JSON.stringify(false));
      } finally {
        setLoading(false);
      }
    };

    // Only run the effect once during component mount
    if (!isAdmin && loading) {
      checkAdminStatus();
    } else {
      setLoading(false); // If isAdmin is already set, stop loading
    }
  }, []);

  return { isAdmin, loading, setLoading };
};

export default useAdminCheck;
