import { Grid, Typography } from '@mui/material';

import { useDispatch, useSelector } from 'react-redux';

import styles from './styles';

import {
  resetChat,
  setSelectedDiscoveryLibraryId,
} from '@/redux/slices/chatSlice';

/**
 * DiscoveryLibrary component represents a single discovery library and provides a way to select a library.
 *
 * @param {Object} props - The component props.
 * @param {Object} props.library - The discovery library object.
 */
const DiscoveryLibrary = ({ library }) => {
  // Get the selected discovery library ID from the Redux store
  const selectedDiscoveryLibraryId = useSelector(
    (state) => state.chat.selectedDiscoveryLibraryId
  );

  // Get the dispatch function from the Redux store
  const dispatch = useDispatch();

  // Destructure the library object
  const { id, title, description, imageUrl } = library;

  // Determine if the current library is the selected library
  const isSelectedLibrary = id === selectedDiscoveryLibraryId;

  /**
   * ClickLibrary function is called when the library is clicked.
   * It handles the logic for selecting a library.
   */
  const clickLibrary = () => {
    if (localStorage.getItem('sessionId') == null) {
      // If there is no session ID, dispatch the setSelectedDiscoveryLibraryId action

      // Dispatch the setChatSession action to set the chat session
      dispatch(setSelectedDiscoveryLibraryId(id));
    } else {
      // If there is a session ID, reset the chat state and remove the session ID from local storage

      // Dispatch the resetChat action to reset the chat state
      dispatch(resetChat());

      // Remove the session ID from local storage
      localStorage.removeItem('sessionId');

      // dispatch(setSelectedDiscoveryLibrary(library));
      dispatch(setSelectedDiscoveryLibraryId(id));
    }
  };

  return (
    // Render the DiscoveryLibrary component
    <Grid
      {...styles.discoveryLibrary(isSelectedLibrary, imageUrl)}
      onClick={clickLibrary}
    >
      <Grid>
        <Typography {...styles.discoveryLibraryTitle}>{title}</Typography>
        <Typography {...styles.discoveryLibraryDescription}>
          {description}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default DiscoveryLibrary;
