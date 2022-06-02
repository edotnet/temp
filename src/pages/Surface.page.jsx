import {DashboardLayout} from '../infrastructure/layouts/Dashboard.layout';
import { Surface3d } from "../modules/surface3d/Surface3d";

export const SurfacePage = () => {
  return (
    <DashboardLayout>
      <Surface3d />
    </DashboardLayout>
  );
}
