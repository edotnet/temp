import { ListCategoriesFeature } from "../modules/drugbank/list-categories/ListCategories.feature";
import { DashboardLayout } from "../infrastructure/layouts/Dashboard.layout";

export const DrugbankCategories = () => {
  return (
    <>
      <DashboardLayout>
        <ListCategoriesFeature/>
      </DashboardLayout>
    </>
  );
}
