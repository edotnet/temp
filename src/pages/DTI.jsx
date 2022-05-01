import { DTI } from "../modules/dti/DTI.feature";
import { DashboardLayout } from "../infrastructure/layouts/Dashboard.layout";

export const DTIPage = () => {
  return (
    <>
      <DashboardLayout>
        <DTI/>
      </DashboardLayout>
    </>
  );
}
