import {PlayArrow, PlayCircle} from "@mui/icons-material";
import {IconButton, useTheme} from "@mui/material";
export const PlayButton = ({onClick}) => {
  const theme = useTheme();
  return(
    <IconButton
      sx={{borderRadius: 25, }}
      onClick={onClick}>
      <PlayArrow color="primary" fontSize="large" style={{borderRadius: 25, border: '3px solid '+theme.palette.primary.main}}/>
    </IconButton>
  );
}
