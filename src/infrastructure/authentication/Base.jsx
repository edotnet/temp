import {Outlet} from 'react-router-dom';
import {useApiToken} from "../api/useApiToken";

export const Base = () => {
  useApiToken();
  return (
    <Outlet />
  )
}