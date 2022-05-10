import { Box } from "@mui/material";

export const Hr = ({block}) => {
  return <Box my={2} style={{border: `${block ? 'solid' : 'dashed'} 1px #979797`, width: "100%", height: 2}}/>;
}
