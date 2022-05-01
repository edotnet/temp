import { DrugInteraction } from "../modules/drug-interaction/DrugInteraction.feature";
import { Navbar } from "../modules/dashboard/Navbar";


export const DrugInteractionPage = () => {
  return (
    <>
      <Navbar/>
      <DrugInteraction />
    </>
  );
}
