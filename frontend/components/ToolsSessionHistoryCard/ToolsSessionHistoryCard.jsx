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

/**
 * Function to render the details of a session card, including title, description, and a series of buttons for previewing a specific response,
 * deleting a session card, and navigating between different responses.
 *
 * @param {Object} props - The component props.
 * @param {Object} props.cardInstance - An object containing session-specific data such as the tool ID, session ID, user ID, and an array of responses.
 * @param {Function} props.setAlertState - A function to manage the state of alert notifications, enabling the display of success or error messages to the user.
 *
 * @return {JSX.Element} Rendered card details component.
 */
const ToolSessionHistoryCard = (props) => {
  // Destructuring props to extract necessary values
  const { cardInstance, setAlertState } = props;
  const toolSessionType = new TOOLS_SESSION_UTILS_TYPE[cardInstance.toolId](); // Initializing the session utility type based on the toolId
  // State variables for tracking the current response index and response data respectfully
  const [currentResponseNumber, setCurrentResponseNumber] = useState(
    cardInstance.response.length - 1
  );
  const [restructuredResponse, setRestructuredResponse] = useState(null);

  const theme = useTheme();
  const dispatch = useDispatch();
  const [openPreview, setOpenPreview] = useState(false); // State for controlling the preview drawer visibility
  const [loading, setLoading] = useState(false); // State for tracking loading status during deletion
  const [openDialog, setOpenDialog] = useState(false); // State for controlling the alert dialog visibility

  // useEffect hook to fetch response data when the component mounts or the current response changes
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

  /**
   * Function to handle the click event for deleting a session card.
   */
  const handleDeleteClick = () => {
    setOpenDialog(true);
  };

  /**
   * Function to handle the confirmation of deleting a session card.
   */
  const handleConfirmDelete = async () => {
    // Open dialog to confirm deletion
    setOpenDialog(false);
    setLoading(true);
    // Open dialog to confirm deletion
    const deleteSessionPayload = {
      toolId: cardInstance.toolId,
      sessionId: cardInstance.sessionId,
      userId: cardInstance.userId,
    };
    try {
      // Attempt to delete session
      await deleteToolsSession(deleteSessionPayload, dispatch);
      // Show success message if deletion is successful
      setAlertState({
        open: true,
        message: 'Session deleted successfully',
        severity: 'success',
      });
    } catch (error) {
      // Show error message if deletion fails
      setAlertState({
        open: true,
        message: `Error deleting Session: ${error}`,
        severity: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  /**
   * Function to close the aler dialog for deleting a session
   */
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  /**
   * Function to handle the click event for navigating to the next response.
   */
  const handleNext = async () => {
    const newResponseNumber = currentResponseNumber + 1;
    const responseData = await toolSessionType.initializeResponseForSession(
      cardInstance.response[newResponseNumber]
    );
    setRestructuredResponse(responseData);
    setCurrentResponseNumber(newResponseNumber);
  };

  /**
   * Function to handle the click event for navigating to the previous response.
   */
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
