import { useEffect, useState } from 'react';

import { Grid, Typography } from '@mui/material';

import { useDispatch, useSelector } from 'react-redux';

import { DEFAULT_PROMPTS } from '@/constants/bots';

import styles from './styles';

import { setInput } from '@/redux/slices/chatSlice';

/**
 * Renders the default prompt component.
 *
 * This component displays a set of pre-defined prompts for the user to choose from.
 *
 * @param {function} handleSendMessage - The function to handle sending a message when a prompt is selected.
 * @return {JSX.Element|null} The default prompt component or null if there is user input.
 */
const DefaultPrompt = ({ handleSendMessage }) => {
  // Get the user input and typing from the Redux store
  const {
    input: userInput, // The user's input
    typing, // Whether the user is typing
    sessionLoaded, // Whether the session is loaded
  } = useSelector((state) => state.chat);

  const [readyToSend, setReadyToSend] = useState(false); // Whether the prompt is ready to be sent

  // Get the dispatch function from Redux
  const dispatch = useDispatch();

  /**
   * Handles the click event of a default prompt.
   *
   * @param {string} promptSelected - The selected default prompt.
   */
  const handleClick = (promptSelected) => {
    // Set the user input to the selected default prompt
    dispatch(setInput(promptSelected));

    // Set the readyToSend state to true
    setReadyToSend(true);
  };

  useEffect(() => {
    if (readyToSend) {
      // Handle sending the message when the prompt is ready to be sent
      handleSendMessage();
      setReadyToSend(false);
    }
  }, [readyToSend]);

  // Define the default prompts
  const defaultPrompts = DEFAULT_PROMPTS;
  /* const defaultPrompts = [
    'Help me sound like an expert for an upcoming meeting',
    'Suggest a way to organize my code in Github',
    'Brainstorm presentation ideas about a topic',
    'List power words for my resume that show teamwork',
  ]; */

  /**
   * Renders the default prompt component.
   *
   * @return {JSX.Element|null} The default prompt component or null if there is user input.
   */
  return !sessionLoaded && !typing && userInput.length === 0 ? (
    // Render the grid container for the default prompts if there is no user input
    <Grid {...styles.defaultPromptsGridContainer}>
      {/* Map over the default prompts and render a grid for each prompt */}
      {defaultPrompts.map((prompt, key) => {
        return (
          // Render a grid item for each default prompt
          <Grid
            key={key}
            onClick={() => handleClick(prompt)}
            {...styles.defaultPrompt}
          >
            {/* Render the prompt text */}
            <Typography>{prompt}</Typography>
          </Grid>
        );
      })}
    </Grid>
  ) : null;
};

export default DefaultPrompt;
