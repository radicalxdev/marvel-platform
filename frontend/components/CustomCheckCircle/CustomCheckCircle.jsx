import { SvgIcon } from '@mui/material';

const CustomCheckCircleIcon = (props) => (
  <SvgIcon {...props} viewBox="0 0 24 24">
    <circle
      cx="12"
      cy="12"
      r="10"
      stroke={props.stroke || 'currentColor'}
      strokeWidth="2"
      fill={props.fill || 'none'}
    />
    <path
      d="M9 12l2 2l4 -4"
      stroke={props.tickColor || 'currentColor'}
      strokeWidth={props.tickSize || '2'} // Adjust tick thickness
      fill="none"
    />
  </SvgIcon>
);

export default CustomCheckCircleIcon;
