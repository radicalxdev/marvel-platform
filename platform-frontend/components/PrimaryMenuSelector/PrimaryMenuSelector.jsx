import { Grid, Select } from '@mui/material';

import styles from './styles';

const PrimaryMenuSelector = (props) => {
  const {
    value,
    defaultValue,
    renderOptions,
    isLeaderboards,
    color,
    disabled,
    darkValue,
    textGradient,
    minWidth,
    icon,
  } = props;

  return (
    <Grid {...styles.mainGridProps(isLeaderboards, color)}>
      <Select
        autoWidth
        IconComponent={icon}
        value={value}
        defaultValue={defaultValue}
        disabled={disabled}
        {...styles.gradientSelectMenuProps(
          color,
          darkValue,
          textGradient,
          minWidth
        )}
      >
        {renderOptions()}
      </Select>
    </Grid>
  );
};

export default PrimaryMenuSelector;
