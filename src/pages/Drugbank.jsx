import { ListDrugsFeature } from "../modules/drugbank/list-drugs/ListDrugs.feature";
import { Navbar } from "../modules/dashboard/Navbar";

export const Drugbank = () => {
  return (
    <>
      <Navbar/>
      <ListDrugsFeature />
    </>
  );
}
