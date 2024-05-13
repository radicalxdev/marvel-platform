import { useState } from 'react';

import { ArrowBack, ArrowForward } from '@mui/icons-material';
import { Grid, useTheme } from '@mui/material';

import { useSelector } from 'react-redux';

import GradientOutlinedButton from '@/components/GradientOutlinedButton';

import styles from './styles';

const FlashCard = () => {
  const theme = useTheme();
  const { response } = useSelector((state) => state.tools);
  const [cards, setCards] = useState(response);

  const handleGoBack = () => {};

  const handleGoForward = () => {};

  const renderActionButtons = () => {
    return (
      <Grid {...styles.actionButtonGridProps}>
        <GradientOutlinedButton
          bgcolor={theme.palette.Common.White['100p']}
          icon={<ArrowBack sx={{ color: theme.palette.primary.main }} />}
          textColor={theme.palette.Greyscale[500]}
          iconPlacement="left"
          onHoverTextColor={theme.palette.Common.White['100p']}
          clickHandler={handleGoBack}
          text="Back"
          {...styles.outlinedButtonProps}
        />
        <GradientOutlinedButton
          bgcolor={theme.palette.Common.White['100p']}
          icon={<ArrowForward sx={{ color: theme.palette.primary.main }} />}
          textColor={theme.palette.Greyscale[500]}
          iconPlacement="left"
          onHoverTextColor={theme.palette.Common.White['100p']}
          clickHandler={handleGoForward}
          text="Next Steps"
          {...styles.outlinedButtonProps}
        />
      </Grid>
    );
  };

  return (
    <Grid {...styles.flashCardGridProps}>FlashCard{renderActionButtons()}</Grid>
  );
};
export default FlashCard;
