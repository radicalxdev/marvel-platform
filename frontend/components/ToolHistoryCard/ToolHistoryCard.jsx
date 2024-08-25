import { useEffect, useState } from 'react';

import { DeleteForever } from '@mui/icons-material';
import {
  Button,
  Card,
  CircularProgress,
  Grid,
  Typography,
  useTheme,
} from '@mui/material';

import Image from 'next/image';

import { useDispatch } from 'react-redux';

import ToolImage from '@/assets/images/BookImage.png';

import AlertDialog from '../AlertDialog';
import ToolOutputHistoryDrawer from '../ToolOutputHistoryDrawer';

import styles from './styles';

import deleteToolsSession from '@/services/toolsHistorySession/deleteToolsSession';

import { initializeToolSessionData } from '@/utils/ToolSessionCardUtils';

/**
 * Renders a card component displaying information about a tool session.
 *
 * @param {Object} props - The properties passed to the component.
 * @param {string} props.data - The data object containing the tool information.
 * @param {function} props.setAlertState - Callback function to handle alert state.
 *
 * @returns {JSX.Element} A React component that renders the tool history card.
 */
const ToolHistoryCard = (props) => {
  const { data, setAlertState } = props; // Destructure props to get data and setAlertState

  // Initialize tool session data from the provided data
  const toolSessionCardInstance = initializeToolSessionData(data);
  const { toolId, sessionId, userId, responses, toolSessionType } =
    toolSessionCardInstance;

  // State hooks for managing component state
  const [currentResponseNumber, setCurrentResponseNumber] = useState(0); // State for the current response number
  const [restructuredResponse, setRestructuredResponse] = useState(null); // State for the restructured response data

  useTheme(); // Get theme from Material-UI
  const dispatch = useDispatch(); // Get dispatch function from Redux
  const [loading, setLoading] = useState(false); // State for tracking loading status during deletion
  const [openDialog, setOpenDialog] = useState(false); // State for controlling the alert dialog visibility
  const [openDrawer, setOpenDrawer] = useState(false); // State for controlling the preview drawer visibility

  // Effect hook to fetch and set restructured response data when currentResponseNumber changes
  useEffect(() => {
    const fetchData = async () => {
      if (!restructuredResponse) {
        // Fetch response data if not already fetched
        const responseData = await toolSessionType.initializeResponseForSession(
          responses[currentResponseNumber]
        );
        setRestructuredResponse(responseData); // Update state with fetched data
      }
    };

    fetchData(); // Call the fetch function
  }, [currentResponseNumber, restructuredResponse, responses, toolSessionType]);

  /**
   * Function to toggle the preview state of the history card.
   */
  const toggleDrawer = () => {
    setOpenDrawer(!openDrawer); // Toggle the drawer open/close state
  };

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

  /**
   * Function to render the tool image section.
   *
   * @returns {JSX.Element} - The image grid with tool image
   */
  const renderImage = () => (
    <Grid {...styles.imageGridProps(restructuredResponse?.backgroundImgURL)}>
      <Image
        src={restructuredResponse?.logoURL || ToolImage}
        alt="tool logo"
        {...styles.imageProps}
      />
    </Grid>
  );

  /**
   * Function to render the title and action buttons of the card.
   *
   * @returns {JSX.Element} - The title grid with content and buttons
   */
  const renderTitle = () => (
    <Grid {...styles.contentGridProps}>
      <Typography {...styles.dateProps}>
        {restructuredResponse?.createdAt}
      </Typography>
      <Typography {...styles.titleProps}>
        {restructuredResponse?.title}
      </Typography>
      <Typography {...styles.descriptionProps}>
        {restructuredResponse?.description}
      </Typography>
      <Grid container {...styles.sessionCardSectionProps}>
        <Grid item>
          <Button {...styles.cardButtonProps} onClick={toggleDrawer}>
            Preview
          </Button>
        </Grid>
        <Grid item>
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
            {!loading && 'Delete'}
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );

  return (
    <Grid {...styles.mainGridProps}>
      <Card {...styles.cardProps} elevation={6}>
        <Grid {...styles.toolDetailsGridProps}>
          {renderImage()}
          {renderTitle()}
        </Grid>
      </Card>
      <ToolOutputHistoryDrawer
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

export default ToolHistoryCard;
