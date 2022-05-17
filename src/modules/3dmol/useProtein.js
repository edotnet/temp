import { useContext } from "react";
import { DashboardContext } from "../dashboard/context/DashboardContext";

export const useProtein = () => {
  const {state} = useContext(DashboardContext);
  return state.protein;
}
