import { IconButton, Tooltip, Zoom } from "@mui/material";
import { ContentCopy } from "@mui/icons-material";
import { useState } from "react";

export const CopyComponent = ({text}) => {
  const [open, setOpen] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(text).then(() => {
      setOpen(true);
      setTimeout(() => setOpen(false), 2000);
    })
  }

  return (
    <Tooltip title="Copied!" open={open} TransitionComponent={Zoom} arrow placement="right">
      <IconButton onClick={handleCopy}>
        <ContentCopy/>
      </IconButton>
    </Tooltip>
  );
}
