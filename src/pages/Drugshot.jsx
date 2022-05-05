import { DrugshotFeature } from "../modules/drugshot/Drugshot.feature";
import { DashboardLayout } from "../infrastructure/layouts/Dashboard.layout";

export const Drugshot = () => {
  return (
    <>
      <DashboardLayout>
        <DrugshotFeature />
      </DashboardLayout>
    </>
  );
}
