/* eslint-disable */
import React from "react";
import {
  Grid,
  Typography,
  Divider,
  List,
  ListItem,
  useTheme,
} from "@mui/material";
import StatusIcon from "@/templates/WelcomeScreen/StatusIcon";
import GradientOutlinedButton from "@/components/GradientOutlinedButton";
import { useRouter } from 'next/router';
import ROUTES from '@/constants/routes';

import styles from "./styles";

const FinalSteps = () => {
  const router = useRouter();
  const currentStep = 3;
  const defaultSteps = [
    "Welcome",
    "Profile Setup",
    "System Configuration",
    "Final Steps",
  ];
  const theme = useTheme();

  const handleAdvanceOnboarding = async () => {
    router.push(ROUTES.RESULT);
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
            {" "}
            {/* Unique key for each item */}
            {index != 0 && <Divider component="li" />}
            <ListItem key={index} {...styles.listItemPros}>
              {" "}
              {/* Unique key for each ListItem */}
              <StatusIcon
                key={`icon-${index}`}
                status={
                  currentStep > index
                    ? "done"
                    : currentStep === index
                    ? "doing"
                    : "undo"
                }
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
