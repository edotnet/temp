import { Navbar } from "../../modules/dashboard/Navbar";

export const DashboardLayout = ({children}) => (
  <>
    <Navbar/>
    <div className="dashboarddnd">
      {children}
    </div>
  </>
)
