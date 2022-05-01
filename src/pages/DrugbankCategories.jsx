import { ListCategoriesFeature } from "../modules/drugbank/list-categories/ListCategories.feature";
import { Navbar } from "../modules/dashboard/Navbar";

export const DrugbankCategories = () => {
  return (
    <>
      <Navbar/>
      <ListCategoriesFeature />
    </>
  );
}
