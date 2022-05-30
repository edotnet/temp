import { DashboardLayout } from "../infrastructure/layouts/Dashboard.layout";
import { useWindowSize } from "../infrastructure/hooks/useWindowSize";

export const Engine = () => {
  const {width, height} = useWindowSize();
  return (
    <DashboardLayout>
      <iframe src="https://c45c-5-228-163-101.eu.ngrok.io/?mode=Search+Engine" width={width} height={height}/>
    </DashboardLayout>
  );
}
