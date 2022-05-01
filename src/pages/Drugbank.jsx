import { ListDrugsFeature } from "../modules/drugbank/list-drugs/ListDrugs.feature";
import { DashboardLayout } from "../infrastructure/layouts/Dashboard.layout";

export const Drugbank = () => {
  return (
    <>
      <DashboardLayout>
        <ListDrugsFeature/>
      </DashboardLayout>
    </>
  );
}
