import { Grid, Typography } from '@mui/material';

// styles imported here
import styles from './styles';

/**
 * Renders a timer unit component with a chip and text.
 *
 * @param {Object} props - The properties object.
 * @param {string} props.text - The text displayed in the component.
 * @param {string} props.units - The units displayed in the chip.
 * @param {Object} props.chipContainerProps - The container props for the chip.
 * @param {Object} props.timerUnitContainerProps - The container props for the entire component.
 * @return {JSX.Element} The timer unit component.
 */
const TimerUnit = (props) => {
  const { text, units, chipContainerProps, timerUnitContainerProps, color } =
    props;

  // render functions for this component's views
  const renderChip = () => {
    return (
      <Grid {...styles.gradientGridConfig(color)} {...chipContainerProps}>
        <Grid {...styles.innerChipGridConfig}>
          <Grid {...styles.unitConfig(color)}>{units}</Grid>
        </Grid>
      </Grid>
    );
  };

  const renderText = () => {
    return (
      <Typography {...styles.timerLabelTextConfig(color)}>{text}</Typography>
    );
  };

  return (
    <Grid {...styles.mainGridConfig} {...timerUnitContainerProps}>
      {renderChip()}
      {renderText()}
    </Grid>
  );
};

export default TimerUnit;
