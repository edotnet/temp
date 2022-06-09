import { DrugshotFeature } from "../modules/drugshot/Drugshot.feature";
import { DashboardLayout } from "../infrastructure/layouts/Dashboard.layout";
import { Box, Tabs, Tab } from "@mui/material";
import { useState } from "react";
import { TabPanel } from "../infrastructure/components/TabPanel";
import { AssociateFeature } from "../modules/drugshot/Associate.feature";

function a11yProps(index) {
  return {
    id: `tab-${index}`,
    'aria-controls': `tabpanel-${index}`,
  };
}

export const Drugshot = () => {
  const [selected, setSelected] = useState(0);
  const handleChange = (e, v) => {
    setSelected(v);
  }

  return (
    <>
      <DashboardLayout>
        <>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={selected} onChange={handleChange} centered>
              <Tab label="Search" {...a11yProps(0)} />
              <Tab label="Associate" {...a11yProps(1)} />
            </Tabs>
          </Box>
          <TabPanel value={selected} index={0}>
            <DrugshotFeature />
          </TabPanel>
          <TabPanel value={selected} index={1}>
            <AssociateFeature />
          </TabPanel>
        </>
      </DashboardLayout>
    </>
  );
}
