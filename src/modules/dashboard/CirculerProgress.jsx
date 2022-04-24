import { Box, CircularProgress as MCriculerProgress, Typography } from "@mui/material";

export const CircularProgress = (props) => {
  return (
    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
      <MCriculerProgress variant="determinate" {...props} />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography variant="caption" component="div" color="text.secondary">
          {`${Math.round(props.value)}%`}
        </Typography>
      </Box>
    </Box>
  );
}
