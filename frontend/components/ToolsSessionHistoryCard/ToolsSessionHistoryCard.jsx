import React, { useEffect, useState } from 'react';

import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';

import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  MobileStepper,
  Typography,
  useTheme,
} from '@mui/material';

import Image from 'next/image';

import TOOLS_SESSION_UTILS_TYPE from '@/constants/toolsSessionUtilsType';

import ToolsSessionHistoryPreviewDrawer from '../ToolsSessionHistoryPreviewDrawer';

import styles from './styles';

const ToolSessionHistoryCard = (props) => {
  const theme = useTheme();
  const [openPreview, setOpenPreview] = useState(false);

  const { cardInstance } = props;
  const toolSessionType = new TOOLS_SESSION_UTILS_TYPE[cardInstance.toolId]();
  const [currentResponseNumber, setCurrentResponseNumber] = useState(
    cardInstance.response.length - 1
  );
  const [restructuredResponse, setRestructuredResponse] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!restructuredResponse) {
        const responseData = await toolSessionType.initializeResponseForSession(
          cardInstance.response[currentResponseNumber]
        );
        setRestructuredResponse(responseData);
      }
    };
    fetchData();
  }, [currentResponseNumber, toolSessionType, cardInstance.response]);

  /**
   * Function to toggle the preview state of the history card.
   */
  const togglePreview = () => {
    setOpenPreview(!openPreview);
  };

  const handleNext = async () => {
    const newResponseNumber = currentResponseNumber + 1;
    const responseData = await toolSessionType.initializeResponseForSession(
      cardInstance.response[newResponseNumber]
    );
    setRestructuredResponse(responseData);
    setCurrentResponseNumber(newResponseNumber);
  };

  const handleBack = async () => {
    const newResponseNumber = currentResponseNumber - 1;
    const responseData = await toolSessionType.initializeResponseForSession(
      cardInstance.response[newResponseNumber]
    );
    setRestructuredResponse(responseData);
    setCurrentResponseNumber(newResponseNumber);
  };

  /**
   * Function to render the details of the history card, including title, description, and a preview button.
   *
   * @return {JSX.Element} Rendered card details component
   */
  const renderCardDetails = () => {
    if (!restructuredResponse) {
      return null; // Handle case where data is still loading or not available
    }

    return (
      <Grid>
        <Typography {...styles.dateProps}>
          {restructuredResponse.updatedAt}
        </Typography>
        <Typography {...styles.titleProps}>
          {restructuredResponse.title}
        </Typography>
        <Typography {...styles.descriptionProps}>
          {restructuredResponse.description}
        </Typography>
        <Button {...styles.previewButtonProps} onClick={togglePreview}>
          Preview
        </Button>
        <MobileStepper
          variant="text"
          steps={cardInstance.response.length}
          position="static"
          activeStep={currentResponseNumber}
          {...styles.stepperProps}
          nextButton={
            <Button
              size="small"
              {...styles.stepperButtonProps}
              onClick={handleNext}
              disabled={
                currentResponseNumber === cardInstance.response.length - 1
              }
            >
              Next
              {theme.direction === 'rtl' ? (
                <KeyboardArrowLeft />
              ) : (
                <KeyboardArrowRight />
              )}
            </Button>
          }
          backButton={
            <Button
              size="small"
              {...styles.stepperButtonProps}
              onClick={handleBack}
              disabled={currentResponseNumber === 0}
            >
              {theme.direction === 'rtl' ? (
                <KeyboardArrowRight />
              ) : (
                <KeyboardArrowLeft />
              )}
              Back
            </Button>
          }
        />
      </Grid>
    );
  };

  return (
    <Grid {...styles.mainGridProps}>
      <Card {...styles.historyCardProps}>
        <CardMedia
          {...styles.cardProps(restructuredResponse?.backgroundImgURL)}
        >
          <Grid {...styles.imageGridProps}>
            <Image
              src={restructuredResponse?.logoURL}
              alt="output history logo"
              {...styles.imageProps}
            />
          </Grid>
        </CardMedia>
        <CardContent {...styles.cardContentProps}>
          {renderCardDetails()}
        </CardContent>
      </Card>
      <ToolsSessionHistoryPreviewDrawer
        toolSessionType={toolSessionType}
        open={openPreview}
        togglePreview={togglePreview}
        updatedAt={restructuredResponse?.updatedAt}
        title={restructuredResponse?.title}
        description={restructuredResponse?.description}
        toolId={cardInstance?.toolId}
        outputs={restructuredResponse?.outputs}
      />
    </Grid>
  );
};

export default ToolSessionHistoryCard;
