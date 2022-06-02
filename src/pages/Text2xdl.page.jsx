import { Text2xdlFeature } from "../modules/text2xdl/Text2xdl";
import { DashboardLayout } from "../infrastructure/layouts/Dashboard.layout";
import { Container } from "@mui/material";

export const Text2xdl = () => {
  return (
    <DashboardLayout>
      <Container>
        <Text2xdlFeature />
      </Container>
    </DashboardLayout>
  )
}
