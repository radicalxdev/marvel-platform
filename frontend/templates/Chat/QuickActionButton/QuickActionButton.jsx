import { useRef, useState } from 'react';

import {
  Button,
  ClickAwayListener,
  Grid,
  IconButton,
  MenuItem,
  MenuList,
  Paper,
  Popper,
} from '@mui/material';
import { useDispatch } from 'react-redux';

import ActionIcon from '@/assets/svg/add-circle.svg';

import styles from './styles';

import { setInput } from '@/redux/slices/chatSlice';

const QuickActionButton = (props) => {
  const { onAction, defaultText, setShowPrompts } = props;
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [buttonText, setButtonText] = useState(defaultText);
  const [buttonColor, setButtonColor] = useState(null);
  const anchorRef = useRef(null);

  const handleClick = () => {
    setOpen(!open);
    setShowPrompts(open);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleActionClick = (text, color) => {
    dispatch(setInput(onAction));
    setButtonText(text);
    setButtonColor(color);
    handleClose();
    setShowPrompts(true);
  };

  return (
    <Grid {...styles.actionButtonGridProps}>
      <IconButton onClick={handleClick}>
        <Button {...styles.actionButtonProps(buttonColor)} ref={anchorRef}>
          <ActionIcon {...styles.iconButtonProps} />
          <span style={{ paddingLeft: '5px' }}>{buttonText}</span>
        </Button>
      </IconButton>

      <Popper
        open={open}
        anchorEl={anchorRef.current}
        placement="top"
        disablePortal
        {...styles.popperProps}
      >
        <Paper elevation={3} {...styles.paperProps}>
          <ClickAwayListener onClickAway={handleClose}>
            <MenuList {...styles.menuListProps}>
              <MenuItem
                onClick={() => handleActionClick('Actions', null)}
                {...styles.menuItemProps(false)}
              >
                Default Actions
              </MenuItem>
              <MenuItem
                onClick={() =>
                  handleActionClick('Suggest Techniques', '#1AD6A1')
                }
                {...styles.menuItemProps(false)}
              >
                Suggest Techniques
              </MenuItem>
              <MenuItem
                onClick={() => handleActionClick('Recommend Books', '#1AD6A1')}
                {...styles.menuItemProps(false)}
              >
                Recommend Books
              </MenuItem>
              <MenuItem
                onClick={() => handleActionClick('Summarize', '#1AD6A1')}
                {...styles.menuItemProps(false)}
              >
                Summarize
              </MenuItem>
            </MenuList>
          </ClickAwayListener>
        </Paper>
      </Popper>
    </Grid>
  );
};

export default QuickActionButton;
