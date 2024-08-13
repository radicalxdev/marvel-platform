import { useState } from 'react';

import RemoveIcon from '@mui/icons-material/Remove';
import { Fab, Grid, Skeleton, Typography } from '@mui/material';

import { useSelector } from 'react-redux';

import DiscoveryLibrary from '../DiscoveryLibrary';

import styles from './styles';

const DiscoveryLibraryWindow = () => {
  const discoveryLibraries = useSelector(
    (state) => state.chat.discoveryLibraries
  );

  const [showDiscoveryLibrary, setShowDiscoveryLibraryWindow] = useState(false);

  /**
   * Returns a greeting message based on the current time of day.
   *
   * @return {string} The greeting message.
   */
  const greeting = () => {
    // Get the current hour of the day.
    const hours = new Date().getHours();

    // Determine the greeting based on the current hour.
    if (hours < 12) {
      // If the hour is before 12, return 'Good Morning'.
      return 'Good Morning';
    }
    if (hours < 18) {
      // If the hour is between 12 and 18 (exclusive), return 'Good Afternoon'.
      return 'Good Afternoon';
    }
    // If the hour is 18 or later, return 'Good Evening'.
    return 'Good Evening';
  };

  /**
   * Toggles the visibility of the discovery library sidebar.
   *
   * @return {void} No return value.
   */
  const toggleDiscoveryLibrarySidebar = () => {
    // Toggle the visibility of the discovery library sidebar by updating the state using the previous state.
    setShowDiscoveryLibraryWindow((prev) => !prev);
  };

  /**
   * Returns a JSX element representing a skeleton component for the discovery library window. The skeleton component consists of a Grid container with five Skeleton components, each representing a discovery library item. The grid container has a column direction and a height of 100%.
   *
   * @return {JSX.Element} The skeleton component for the discovery library window.
   */
  const librarySkeleton = () => (
    // Grid container with 100% height and column direction
    <Grid container height="100%" flexDirection="column">
      {/* Map over an array of length 5 */}
      {Array.from({ length: 5 }).map((_, index) => (
        // Skeleton component with specified props
        <Skeleton key={index} animation="wave" width="100%" height="20%" />
      ))}
    </Grid>
  );

  /**
   * Returns a JSX element representing an error message component.
   *
   * @return {JSX.Element} The error message component.
   */
  const renderErrorMessage = () => (
    <Grid {...styles.errorMessageStyle}>
      <Typography variant="h5">No Discovery Libraries Found</Typography>
    </Grid>
  );

  const getLibraryContent = () => {
    if (discoveryLibraries == null) {
      return renderErrorMessage();
    }

    if (discoveryLibraries.length === 0) {
      return librarySkeleton();
    }

    return discoveryLibraries.map((library) => (
      <DiscoveryLibrary key={library.id} library={library} />
    ));
  };

  return !showDiscoveryLibrary ? (
    <Grid {...styles.openDiscoveryLibraryContainer}>
      <Grid
        aria-label="open chat history"
        onClick={toggleDiscoveryLibrarySidebar}
        {...styles.openDiscoveryLibraryButton}
      >
        <Grid>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M17 15V19M19 17H15M16 10H18C19.1046 10 20 9.10457 20 8V6C20 4.89543 19.1046 4 18 4H16C14.8954 4 14 4.89543 14 6V8C14 9.10457 14.8954 10 16 10ZM6 20H8C9.10457 20 10 19.1046 10 18V16C10 14.8954 9.10457 14 8 14H6C4.89543 14 4 14.8954 4 16V18C4 19.1046 4.89543 20 6 20ZM6 10H8C9.10457 10 10 9.10457 10 8V6C10 4.89543 9.10457 4 8 4H6C4.89543 4 4 4.89543 4 6V8C4 9.10457 4.89543 10 6 10Z"
              stroke="#9E86FF"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </Grid>
        <Grid>Discover</Grid>
      </Grid>
    </Grid>
  ) : (
    <Grid {...styles.discoveryLibraryWindow}>
      <Grid {...styles.discoveryLibraryWindowHeader}>
        <Grid {...styles.discoveryLibraryWindowTitle}>
          <Typography {...styles.discoveryLibraryWindowTitleText}>
            {greeting()}
          </Typography>
        </Grid>
        <Fab
          aria-label="close discovery library"
          size="medium"
          onClick={toggleDiscoveryLibrarySidebar}
          {...styles.closeDiscoveryLibraryButton}
        >
          <RemoveIcon />
        </Fab>
      </Grid>
      <Grid {...styles.discoveryLibraries}>{getLibraryContent()}</Grid>
    </Grid>
  );
};

export default DiscoveryLibraryWindow;
