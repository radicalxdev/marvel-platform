import React from 'react';

import {
  Divider,
  Grid,
  List,
  ListItem,
  Typography,
  useTheme,
} from '@mui/material';

import { useRouter } from 'next/router';

import GradientOutlinedButton from '@/components/GradientOutlinedButton';
import StatusIcon from '@/templates/WelcomeScreen/StatusIcon';

import ROUTES from '@/constants/routes';

import styles from './styles';

const FinalSteps = () => {
  const router = useRouter();
  const currentStep = 3;
  const defaultSteps = [
    'Welcome',
    'Profile Setup',
    'System Configuration',
    'Final Steps',
  ];
  const theme = useTheme();

  const handleAdvanceOnboarding = async () => {
    router.push(ROUTES.RESULT);
  };

  // Helper function to determine the status of the step
  const getStatus = (index) => {
    if (currentStep > index) return 'done';
    if (currentStep === index) return 'doing';
    return 'undo';
  };

  return (
    <Grid {...styles.mainGridProps}>
      <Typography {...styles.titleProps}>Final Steps</Typography>
      <Typography {...styles.secondTitleProps}>
        We need some permissions to get you started
      </Typography>
      <List {...styles.mainListProps}>
        {defaultSteps.map((item, index) => (
          <div key={`expand-${index}`}>
            {index !== 0 && <Divider component="li" />}
            <ListItem key={index} {...styles.listItemPros}>
              <StatusIcon
                key={`icon-${index}`}
                status={getStatus(index)}
                width="30"
                height="30"
              />
              &emsp;
              <Typography {...styles.listItemTyProps}>{item}</Typography>
            </ListItem>
          </div>
        ))}
      </List>
      <GradientOutlinedButton
        bgcolor={theme.palette.primary.main}
        clickHandler={handleAdvanceOnboarding}
        text="Continue"
        textColor="white"
        {...styles.submitButtonProps}
      />
    </Grid>
  );
};

export default FinalSteps;
