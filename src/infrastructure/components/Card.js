import { Paper,  Box } from "@mui/material";

export const Card = ({children}) => {
  return (
    <Box pt={4}>
      <Paper elevation={8}>
        {children}
      </Paper>
    </Box>
  );
}
