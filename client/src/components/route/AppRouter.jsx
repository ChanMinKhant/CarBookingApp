import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './../../App';
import AdminLoginForm from './../admin/AdminLoginForm';
import AdminApproveForm from './../admin/AdminApproveForm';
import CancelByEmail from '../email/CancelByEmail';
import ApproveByEmail from '../email/ApproveByEmail';
import DeleteByEmail from '../email/DeleteByEmail';
import Loading from '../../utils/Loading';
import ControlCarTime from '../controlCarTime/ControlCarTime';
import Dashboard from '../dashboard/Dashboard';
import Activity from '../dashboard/Activity/Activity';
import Order from '../dashboard/Order/Order';

const AppRouter = () => {
  const routes = [
    {
      id: 1,
      path: '/',
      component: <App />,
    },
    {
      id: 2,
      path: '/login',
      component: <AdminLoginForm />,
    },
    {
      id: 3,
      path: '/admin',
      component: <Loading />,
    },
    {
      id: 4,
      path: '/admin/approve/:id/:token',
      component: <ApproveByEmail />,
    },
    {
      id: 5,
      path: '/admin/cancel/:id/:token',
      component: <CancelByEmail />,
    },
    {
      id: 6,
      path: '/admin/delete/:id/:token',
      component: <DeleteByEmail />,
    },
    {
      id: 7,
      path: '/admin/control-car-time',
      component: <ControlCarTime />,
    },
  ];

  const routeGenerator = ({ id, path, component }) => {
    return <Route key={id} path={path} element={component} />;
  };

  return (
    <BrowserRouter>
      <Routes>
        {routes.map((item) =>
          routeGenerator({
            id: item.id,
            path: item.path,
            component: item.component,
          })
        )}
        <Route path='/dashboard/*' element={<Dashboard />}>
          <Route path='activity' element={<Activity />} />
          <Route path='order' element={<Order />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
