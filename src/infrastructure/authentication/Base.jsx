import {Outlet} from 'react-router-dom';
import {Navbar} from '../../modules/dashboard/Navbar';

export const Base = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};
