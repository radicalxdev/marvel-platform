/**
 * Styles for the chat history list item text.
 */
const styles = {
  /**
   * Styles for the chat history text.
   */
  chatHistoryText: {
    sx: {
      width: '100%', // Set the width of the chat history list item text to 100%.
      whiteSpace: 'nowrap', // Prevent wrapping of the text to the next line.
      overflow: 'hidden', // Hide any overflowing content.
      textOverflow: 'ellipsis', // If the text overflows, hide the part that does and add ellipsis at the end to indicate that the text has been truncated.
      padding: '5px 0', // Set the padding to 5px 0.
      cursor: 'pointer', // Set the cursor to pointer.
    },
  },
  /**
   * Style for the chat history text that is currently selected.
   */
  chatHistoryTextCurrent: {
    sx: {
      color: 'rgba(115,80,255,255)', // Set the font color to rgba(115,80,255,255).
      width: '100%', // Set the width of the chat history list item text to 100%.
      whiteSpace: 'nowrap', // Prevent wrapping of the text to the next line.
      overflow: 'hidden', // Hide any overflowing content.
      textOverflow: 'ellipsis', // If the text overflows, hide the part that does and add ellipsis at the end to indicate that the text has been truncated.
      padding: '5px 0', // Set the padding to 5px 0.
      cursor: 'pointer', // Set the cursor to pointer.
    },
  },

  /**
   * Style for centering a chat message.
   */
  centerChatMessage: {
    container: true,
    justifyContent: 'center', // Center the container vertically.
    alignItems: 'center', // Center the container horizontally.
    sx: {
      width: '100%', // Set the width of the container to 100%.
      height: '100%', // Set the height of the container to 100%.
      textAlign: 'center', // Center the text within the container.
    },
  },
};

export default styles;
