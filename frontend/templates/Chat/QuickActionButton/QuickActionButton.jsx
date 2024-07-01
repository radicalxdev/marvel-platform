import { useCallback, useState } from 'react';

import { Button, CircularProgress, Grid, IconButton } from '@mui/material';

import { useDispatch } from 'react-redux';

import ActionIcon from '@/assets/svg/add-circle.svg';

import styles from './styles';

import { setInput } from '@/redux/slices/chatSlice';

const QuickActionButton = (props) => {
  const { onAction, text } = props;

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const handleQuickAction = useCallback(() => {
    setLoading(true);
    dispatch(setInput(onAction));
    // Add any other logic you want to perform when the button is clicked
    setLoading(false);
  }, [dispatch, onAction]);

  return (
    <Grid {...styles.actionButtonGridProps}>
      <IconButton>
        <Button
          onClick={handleQuickAction}
          {...styles.actionButtonProps}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} /> : <ActionIcon />}
          {loading ? 'Loading...' : text}
        </Button>
      </IconButton>
    </Grid>
  );
};

export default QuickActionButton;
