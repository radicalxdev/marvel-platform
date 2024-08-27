import { useState } from 'react';

import { Button, Card, Grid, Typography } from '@mui/material';
import moment from 'moment';
import Image from 'next/image';

import { useDispatch } from 'react-redux';

import ToolImage from '@/assets/images/BookImage.png';

import AlertDialog from '../AlertDialog';

import styles from './styles';

import deleteToolsSession from '@/services/toolsHistorySession/deleteToolsSession';
import { convertToUnixTimestamp } from '@/utils/FirebaseUtils';
import { initializeToolSessionData } from '@/utils/ToolSessionCardUtils';
import { getToolData } from '@/utils/ToolUtils';

/**
 * Renders a card component displaying information about a tool session.
 *
 * @param {Object} props - The properties passed to the component.
 * @param {string} props.data - The data object containing the tool information.
 * @param {function} props.onOpen - Callback function to handle opening the detailed view.
 *
 * @returns {JSX.Element} A React component that renders the tool history card.
 */
const ToolHistoryCard = (props) => {
  const { data, onOpen, setAlertState } = props;

  const dispatch = useDispatch();

  // Initialize tool session data from the provided data
  const toolSessionCardInstance = initializeToolSessionData(data);
  const { toolId, sessionId, userId, responses, toolSessionType } =
    toolSessionCardInstance;

  const toolData = getToolData({
    toolId: data?.tool_id,
    item: data,
  });

  const { title, backgroundImgURL, logo, createdAt, description } = toolData;

  const [openDialog, setOpenDialog] = useState(false); // State for controlling the alert dialog visibility
  const [loading, setLoading] = useState(false); // State for controlling the alert dialog visibility

  /**
   * Function to handle the click event for deleting a session card.
   */
  const handleDeleteClick = () => {
    setOpenDialog(true); // Open the delete confirmation dialog
  };

  /**
   * Function to handle the confirmation of deleting a session card.
   */
  const handleConfirmDelete = async () => {
    setOpenDialog(false); // Close the confirmation dialog
    setLoading(true); // Set loading state to true
    const deleteSessionPayload = {
      toolId,
      sessionId,
      userId,
    };
    try {
      // Attempt to delete the session using the deleteToolsSession function
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
      setLoading(false); // Reset loading state
    }
  };

  /**
   * Function to close the alert dialog for deleting a session
   */
  const handleCloseDialog = () => {
    setOpenDialog(false); // Close the confirmation dialog
  };

  const renderImage = () => {
    return (
      <Grid {...styles.imageGridProps(backgroundImgURL)}>
        <Image src={logo || ToolImage} alt="tool logo" {...styles.imageProps} />
      </Grid>
    );
  };

  const renderTitle = () => {
    return (
      <Grid {...styles.contentGridProps}>
        <Typography {...styles.dateProps}>
          {moment(convertToUnixTimestamp(createdAt)).format('DD MMM YYYY')}
        </Typography>
        <Typography {...styles.titleProps}>{title}</Typography>
        <Typography {...styles.descriptionProps}>{description}</Typography>
        <Button {...styles.previewButtonProps} onClick={() => onOpen(toolData)}>
          Preview
        </Button>
      </Grid>
    );
  };

  return (
    <Grid {...styles.mainGridProps}>
      <Card {...styles.cardProps} elevation={6}>
        <Grid {...styles.toolDetailsGridProps}>
          {renderImage()}
          {renderTitle()}
        </Grid>
      </Card>
      {/* <ToolOutputHistoryDrawer
        toolSessionType={toolSessionType}
        open={openDrawer}
        toggleDrawer={toggleDrawer}
        toolId={toolId}
        responses={responses}
        createdAt={restructuredResponse?.createdAt}
        title={restructuredResponse?.title}
        description={restructuredResponse?.description}
        outputs={restructuredResponse?.outputs}
        setRestructuredResponse={setRestructuredResponse}
        currentResponseNumber={currentResponseNumber}
        setCurrentResponseNumber={setCurrentResponseNumber}
      /> */}
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

export default ToolHistoryCard;
