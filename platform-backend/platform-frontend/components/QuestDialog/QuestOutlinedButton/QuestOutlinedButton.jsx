import { Button, Grid, useTheme } from '@mui/material';

import styles from './styles';

/**
 * Generates a gradient outlined button component.
 *
 * @param {object} props - The props object containing the children, color, and clickHandler.
 * @param {string} props.children - The content of the button.
 * @param {string} props.color - The color of the button.
 * @param {function} props.clickHandler - The function to be called when the button is clicked.
 * @return {JSX.Element} The rendered GradientOutlinedButton component.
 */
const QuestOutlinedButton = (props) => {
  const {
    color,
    icon,
    iconPlacement,
    text,
    bgcolor,
    clickHandler,
    active,
    extraProps,
    extraButtonProps,
    left,
    disabled,
  } = props;

  const theme = useTheme();

  const setTextFillColor = () => {
    if (!active && !disabled) return 'transparent';
    if (disabled) return theme.palette.Greyscale[500];
    return 'white';
  };

  const renderButtonContent = () => {
    if (iconPlacement === 'left') {
      return (
        <>
          {icon}
          <span>{text}</span>
        </>
      );
    }

    return (
      <>
        <span>{text}</span>
        {icon}
      </>
    );
  };

  return (
    <Grid {...styles.mainGridProps(color, extraProps, left, disabled)}>
      <Button
        id="button-selector"
        {...styles.buttonProps(
          color,
          bgcolor,
          active,
          extraButtonProps,
          left,
          disabled,
          setTextFillColor()
        )}
        disabled={disabled}
        onClick={clickHandler}
      >
        {renderButtonContent()}
      </Button>
    </Grid>
  );
};

export default QuestOutlinedButton;
