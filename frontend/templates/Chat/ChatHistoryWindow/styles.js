/**
 * Contains styles for various components related to the chat history window.
 */
const styles = {
  /**
   * Styles for the chat history sidebar.
   */
  historySideBar: {
    item: true,
    sx: {
      // Set the display property to flex and arrange the children in a column.
      display: 'flex',
      // Set the flex direction to column.
      flexDirection: 'column',
      // Set the border to 5px solid rgba(115,80,255,255).
      border: '5px solid rgba(115,80,255,255)',
      // Set the border radius.
      borderRadius: '15px',
      // Set the background to black.
      backgroundColor: '#000000',
      // Set the min-width to 25%.
      minWidth: '25%',
      // Set the height to 100%.
      height: '100%',
      // Set the color to white.
      color: '#ffffff',
      // Set the max width of the sidebar to 25%.
      maxWidth: '25%',
    },
  },
  /**
   * Styles for the header of the chat history sidebar.
   */
  historySideBarHeader: {
    sx: {
      // Set the display property to flex and arrange the children in a row.
      display: 'flex',
      // Set the flex direction to row.
      flexDirection: 'row',
      // Align the children along the space-around of the header.
      justifyContent: 'space-around',
      // Align the children along the center of the header vertically.
      alignItems: 'center',
    },
  },
  /**
   * Styles for the title of the chat history sidebar.
   */
  historySideBarTitle: {
    sx: {
      // Display the title only when the chat history sidebar is shown.
      display: 'flex',
      // The flexGrow property is set to 1 to make the title span the remaining space in the chat history sidebar header.
      flexGrow: 1,
      // Center the title horizontally.
      justifyContent: 'center',
    },
  },
  /**
   * Styles for the title text of the chat history sidebar.
   */
  historySideBarTitleText: {
    // Center the title text horizontally.
    textAlign: 'center',
  },
  /**
   * Styles for the toggle history button.
   *
   * @param {boolean} showHistorySidebar Whether the chat history sidebar is shown or hidden.
   */
  toggleHistoryButton: (showHistorySidebar) => ({
    sx: {
      // Set the background color to black.
      backgroundColor: '#000000',
      // Set the text color to a custom color.
      color: 'rgba(115,80,255,255)',
      // Adjust the border of the toggle button based on the value of showHistorySidebar.
      // If showHistorySidebar is true, set the border to none.
      // If showHistorySidebar is false, set the border to 5px solid rgba(115,80,255,255).
      border: showHistorySidebar ? 'none' : '5px solid rgba(115,80,255,255)',
      // Styles for the toggle history button when it is being hovered over.
      '&:hover': {
        // Set the background color to black on hover.
        backgroundColor: '#000000',
        // Set the text color on hover.
        color: 'rgba(115,80,255,255)',
      },
    },
  }),
  /**
   * Styles for the chat history.
   */
  chatHistory: {
    item: true,
    sx: {
      // Display the sidebar only when showHistorySidebar is true
      display: 'block',
      // Set the background color to rgba(24,26,32,255)
      backgroundColor: 'rgba(24,26,32,255)',
      // Set the height of the sidebar to 100%
      height: '100%',
      // Set the width of the sidebar to 100%
      width: '100%',
      // Enable vertical scrolling if the content overflows
      overflowY: 'auto',
      // Set the border radius.
      borderRadius: '0px 0px 15px 15px',
      // Add a smooth transition when the sidebar is opened or closed
      transition: 'all 0.3s ease',
    },
  },

  /**
   * Styles for the new chat container. This container is used to center the new chat button vertically and horizontally.
   */
  newChatContainer: {
    item: true,
    sx: {
      // Set the display property to flex and arrange the children in a column.
      display: 'flex',
      // Center the children horizontally.
      justifyContent: 'center',
      // Center the children vertically.
      alignItems: 'center',
      // Set the width of the container to 100%.
      width: '100%',
      // Set the padding of the container to 5px at the top and bottom.
      // padding: '5px 0',
    },
  },

  /**
   * Styles for the new chat button. This button is used to open the new chat modal.
   */
  newChatButton: {
    sx: {
      // Set the display property to flex and arrange the children in a row.
      display: 'flex',
      // Align the children along the center of the button horizontally.
      justifyContent: 'space-around',
      // Set the color of the button to white.
      color: '#ffffff',
      // Set the background color of the button to rgba(115,80,255,255).
      backgroundColor: 'rgba(115,80,255,255)',
      width: '100%',
      // Set the color of the button to white when hovered over.
      '&:hover': {
        color: '#ffffff',
        backgroundColor: 'rgba(115,80,255,255)',
      },
    },
  },
  newChatIcon: {
    sx: {
      // Set the background color to black.
      backgroundColor: '#000000',
      // Set the text color to a custom color.
      color: 'rgba(115,80,255,255)',
      // Styles for the toggle history button when it is being hovered over.
      '&:hover': {
        // Set the background color to black on hover.
        backgroundColor: '#000000',
        // Set the text color on hover.
        color: 'rgba(115,80,255,255)',
      },
    },
  },
};

export default styles;
