import { Backdrop, Grid, Modal } from '@mui/material';
import { useEffect } from 'react';

import { disableScroll } from '@/utils/MiscellaneousUtils';

import styles from './styles';

/**
 * Creates a backdrop modal component with the given properties.
 *
 * @param {Object} props - An object containing the following properties:
 *   @param {React.JSXElement} props.children - The content to be displayed within the modal
 *   @param {boolean} props.open - A boolean indicating whether the modal is open
 *   @param {function} props.handleClose - A function to handle the modal close event
 *   @param {integer} props.level - The z-index level of the modal
 *   @param {function} props.closeOnClick - A boolean indicating whether the modal should close on click
 *   @param {Object} props.extraBackdropProps - Additional properties for the backdrop component
 *   @param {Object} props.extraGridContainerProps - Additional properties for the grid container component
 * @return {JSX.Element} The rendered backdrop modal component
 */
const BackDropModal = (props) => {
  const {
    children,
    open,
    handleClose,
    level,
    closeOnClick,
    extraBackdropProps,
    extraGridContainerProps,
  } = props;

  useEffect(() => {
    disableScroll(open);
  }, [open]);

  return (
    <Backdrop
      onClick={closeOnClick && handleClose}
      open={open}
      {...styles.backDropProps(level, extraBackdropProps)}
    >
      <Modal open={open} onClose={handleClose} {...styles.modalProps}>
        <Grid {...styles.containerGridProps(extraGridContainerProps)}>
          {children}
        </Grid>
      </Modal>
    </Backdrop>
  );
};

export default BackDropModal;
