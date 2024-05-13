import { Button, CircularProgress, Grid, useTheme } from '@mui/material';

import styles from './styles';

/**
 * Function for rendering a gradient outlined button with optional icon, text, and loading state.
 *
 * @param {Object} props - Object containing the following button properties:
 *  @param {string} props.color -   string representing the gradient selected for the button
 *  @param {string} props.id -   string representing the id of the button
 *  @param {svg} props.icon  - icon element to be displayed on the button
 *  @param {string} props.iconPlacement -  string representing the placement of the icon
 *  @param {string} props.text -  string representing the text to be displayed on the button
 *  @param {boolean} props.loading -  boolean representing the loading state of the button
 *  @param {boolean} props.disabled -  boolean representing whether the button should be disabled
 *  @param {boolean} props.disableHover -  boolean representing whether the button hover effect should be disabled
 *  @param {string} props.bgcolor  - string representing the background color of the button
 *  @param {Function} props.clickHandler  - function to be called on button click
 *  @param {boolean} props.active -  boolean representing the active state of the button
 *  @param {boolean} props.inverted -  boolean representing the inverted state of the button
 *  @param {string} props.onHoverTextColor -  string representing the text color when hovering over the button. Active when Props inverted is true
 *  @param {Object} props.extraProps - extra properties for the button
 *  @param {Object} props.extraButtonProps - extra properties for the button component
 *  @param {Object} props.otherProps - other properties for the button
 *
 * @return {JSX.Element} Rendered button component
 */
const GradientOutlinedButton = (props) => {
  const {
    color,
    id,
    icon,
    iconPlacement,
    text,
    loading,
    disabled,
    disableHover,
    bgcolor,
    onHoverTextColor,
    clickHandler,
    active,
    inverted,
    textColor,
    extraProps,
    extraButtonProps,
    ...otherProps
  } = props;

  const theme = useTheme();

  const setBackgroundColor = () => {
    if (disabled || loading) return theme.palette.Greyscale[650];
    if (inverted || active) return theme.palette.Background.gradient[color];
    return bgcolor;
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

  const renderLoader = () => <CircularProgress color="secondary" size={25} />;

  return (
    <Grid
      {...styles.mainGridProps(
        color,
        inverted,
        extraProps,
        disabled,
        loading,
        disableHover
      )}
    >
      <Button
        id={id || 'button-selector'}
        disabled={loading || disabled}
        onClick={clickHandler}
        {...styles.buttonProps(
          color,
          bgcolor,
          active,
          extraButtonProps,
          inverted,
          onHoverTextColor,
          disabled,
          loading,
          setBackgroundColor(),
          textColor,
          disableHover
        )}
        {...otherProps}
      >
        {loading ? renderLoader() : renderButtonContent()}
      </Button>
    </Grid>
  );
};

export default GradientOutlinedButton;
