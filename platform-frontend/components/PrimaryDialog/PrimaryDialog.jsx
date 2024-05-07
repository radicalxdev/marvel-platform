import { CloseRounded } from '@mui/icons-material';
import { Dialog, Grid, IconButton, Typography } from '@mui/material';

import styles from './styles';

/**
 * Renders a primary dialog component.
 *
 * @param {object} props - The properties for the component.
 *  @param {JSX.Element} props.children - The children to be rendered in the dialog.
 *  @param {boolean} props.open - Whether the dialog is open.
 *  @param {string} props.title - The title of the dialog.
 *  @param {func} props.toggleOpen - The function to toggle the dialog.
 *  @param {boolean} props.removeCloseIcon - Whether to remove the close icons.
 *  @param {boolean} props.removeBoxShadow - Whether to remove the boxShadow on the content container.
 *  @param {object} props.extraContentGridProps - Additional props to be passed to the content grid.
 *  @param {object} props.extraMainGridProps - Additional props to be passed to the main grid.
 *
 * @return {JSX.Element} The primary dialog component.
 */
const PrimaryDialog = (props) => {
  const {
    children,
    open,
    title,
    toggleOpen,
    removeCloseIcon,
    removeBoxShadow,
    extraContentGridProps,
    extraMainGridProps,
  } = props;

  const renderTitle = () => {
    return (
      <Grid {...styles.titleGridProps(removeCloseIcon)}>
        <Typography {...styles.titleProps}>{title}</Typography>
      </Grid>
    );
  };

  const renderIconButton = () => {
    return (
      <Grid {...styles.iconGridProps}>
        <IconButton {...styles.iconButtonProps} onClick={toggleOpen}>
          <CloseRounded {...styles.iconProps} />
        </IconButton>
      </Grid>
    );
  };

  return (
    <Dialog
      open={open}
      onClose={toggleOpen}
      {...styles.mainGridProps(extraMainGridProps)}
    >
      <Grid {...styles.headerGridProps}>
        {renderTitle()}
        {!removeCloseIcon && renderIconButton()}
      </Grid>
      <Grid
        {...styles.contentGridProps(extraContentGridProps, removeBoxShadow)}
      >
        {children}
      </Grid>
    </Dialog>
  );
};

export default PrimaryDialog;
