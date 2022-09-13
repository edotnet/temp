import {Outlet} from 'react-router-dom';
import {useApiToken} from "../api/useApiToken";
import {Navbar} from "../../modules/dashboard/Navbar";

export const Base = () => {
  useApiToken();
  return (
    <>
      <Navbar/>
      <Outlet />
    </>
  )
}