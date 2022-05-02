import {Box} from "@mui/material";
import {styled} from "@mui/material/styles";

export const GraphBackground = styled(Box)({
    background: 'repeating-linear-gradient(\n' +
        '  to right,\n' +
        '  rgba(0, 0, 0, 0.11),\n' +
        '  rgba(0, 0, 0, 0.11) 1px,' +
        ' white 2px, white 20px' +
        '\n)'
})