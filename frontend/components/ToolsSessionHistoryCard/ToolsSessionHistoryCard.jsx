import React, { useEffect, useState } from 'react';

import {
  DeleteForever,
  KeyboardArrowLeft,
  KeyboardArrowRight,
} from '@mui/icons-material';

import {
  Button,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  Grid,
  MobileStepper,
  Typography,
  useTheme,
} from '@mui/material';

import Image from 'next/image';

import { useDispatch } from 'react-redux';

import TOOLS_SESSION_UTILS_TYPE from '@/constants/toolsSessionUtilsType';

import AlertDialog from '../AlertDialog';
import ToolsSessionHistoryPreviewDrawer from '../ToolsSessionHistoryPreviewDrawer';

import styles from './styles';

import deleteToolsSession from '@/services/toolsHistorySession/deleteToolsSession';

const ToolSessionHistoryCard = (props) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const [openPreview, setOpenPreview] = useState(false);
  const [loading, setLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const { cardInstance, setAlertState } = props;
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

  const handleDeleteClick = () => {
    setOpenDialog(true);
  };

  const handleConfirmDelete = async () => {
    setOpenDialog(false);
    setLoading(true);
    const deleteSessionPayload = {
      toolId: cardInstance.toolId,
      sessionId: cardInstance.sessionId,
      userId: cardInstance.userId,
    };
    try {
      await deleteToolsSession(deleteSessionPayload, dispatch);
      setAlertState({
        open: true,
        message: 'Session deleted successfully',
        severity: 'success',
      });
    } catch (error) {
      setAlertState({
        open: true,
        message: `Error deleting Session: ${error}`,
        severity: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
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
   * Function to render the details of a session card, including title, description, and series of buttons including preview a specific response,
   * deleting a session card, and navigating between different responses.
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
        <Grid {...styles.sessionCardSectionProps}>
          <Button {...styles.cardButtonProps} onClick={togglePreview}>
            Preview
          </Button>
          <Button
            {...styles.cardButtonProps}
            onClick={handleDeleteClick}
            disabled={loading}
          >
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              <DeleteForever />
            )}
            {loading ? '' : 'Delete'}
          </Button>
        </Grid>
        <MobileStepper
          variant="text"
          steps={cardInstance.response.length}
          position="static"
          activeStep={currentResponseNumber}
          {...styles.stepperProps}
          nextButton={
            <Button
              {...styles.cardButtonProps}
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
              {...styles.cardButtonProps}
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
      <AlertDialog
        open={openDialog}
        handleClose={handleCloseDialog}
        titleContent="Confirm Deletion"
        bodyContent="Are you sure you want to delete this session? This action cannot be undone."
        buttonOneContent="Cancel"
        buttonTwoContent="Delete"
        handleConfirmation={handleConfirmDelete}
      />
    </Grid>
  );
};

export default ToolSessionHistoryCard;
