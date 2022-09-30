import {styled} from '@mui/material/styles';
import Tooltip, {tooltipClasses} from '@mui/material/Tooltip';

export const StyledTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    boxShadow: '-21px 9px 46px 0 rgba(87, 76, 153, 0.29)',
    backgroundColor: 'rgba(255, 255, 255, 0.79)',
    color: 'rgba(0, 0, 0, 0.87)',
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: '1px solid #dadde9',
    borderRadius: 10,
    backdropFilter: 'blur(28px)',
    position: 'absolute',
    right: 0,
    bottom: 0
  },
}));
