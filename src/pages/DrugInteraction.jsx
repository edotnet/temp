import { DrugInteraction } from "../modules/drug-interaction/DrugInteraction.feature";
import { DashboardLayout } from "../infrastructure/layouts/Dashboard.layout";

export const DrugInteractionPage = () => {
  return (
    <>
      <DashboardLayout>
        <DrugInteraction/>
      </DashboardLayout>
    </>
  );
}
