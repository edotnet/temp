import { DrugInteractionFeature } from "../modules/drug-interaction/DrugInteraction.feature";
import { DashboardLayout } from "../infrastructure/layouts/Dashboard.layout";

export const DrugInteractionPage = () => {
  return (
    <>
      <DashboardLayout>
        <DrugInteractionFeature/>
      </DashboardLayout>
    </>
  );
}
