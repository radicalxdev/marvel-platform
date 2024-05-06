import { Chip, Grid, Typography } from '@mui/material';

import styles from './styles';

/**
 * Returns a component that renders a statistic chip.
 *
 * @param {object} props - The props object
 * @param {string} props.statlabel - The label for the statistic
 * @param {string} props.stat - The value of the statistic
 * @param {node} props.icon - The icon for the chip
 * @param {string} props.color - The gradient for the chip background
 * @param {string} props.height - The gradient for the chip background
 * @param {object} props.extraChipGridProps - Additional props for the chip grid props
 * @param {object} props.extraChipProps - Additional props for the chip component
 * @param {object} props.extraChipContainerProps - Additional props for the chip container
 *
 * @return {JSX.Element} The StatisticChip component
 */
const StatisticChip = (props) => {
  const {
    statlabel,
    stat,
    icon,
    color,
    height,
    extraChipGridProps,
    extraChipProps,
    extraChipContainerProps,
  } = props;

  const renderChip = () => {
    return (
      <Grid {...styles.chipGridProps(color, height, extraChipGridProps)}>
        <Chip
          {...styles.chipProps(color, extraChipProps)}
          icon={icon}
          label={stat}
        />
      </Grid>
    );
  };

  const renderStatLabel = () => {
    return (
      statlabel && (
        <Grid {...styles.statLabelGridConfig}>
          <Typography {...styles.statLabelTextConfig}>{statlabel}</Typography>
        </Grid>
      )
    );
  };

  return (
    <Grid {...styles.mainGridProps(extraChipContainerProps)}>
      {renderChip()}
      {renderStatLabel()}
    </Grid>
  );
};

export default StatisticChip;
