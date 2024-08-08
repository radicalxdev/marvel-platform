import { useEffect, useState } from 'react';

import { Grid, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import MenuLogo from '@/assets/svg/PurpleStar.svg'; // Import MenuLogo

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
  const {
    input: userInput,
    typing,
    sessionLoaded,
    defaultPrompts,
  } = useSelector((state) => state.chat);

  const [readyToSend, setReadyToSend] = useState(false);

  const dispatch = useDispatch();

  /**
   * Handles the click event of a default prompt.
   *
   * @param {string} promptSelected - The selected default prompt.
   */
  const handleClick = (promptSelected) => {
    dispatch(setInput(promptSelected));
    setReadyToSend(true);
  };

  useEffect(() => {
    if (readyToSend) {
      handleSendMessage();
      setReadyToSend(false);
    }
  }, [readyToSend]);

  return !sessionLoaded &&
    localStorage.getItem('sessionId') == null &&
    !typing &&
    userInput.length === 0 ? (
    <Grid container spacing={2} {...styles.defaultPromptsGridContainer}>
      {defaultPrompts.map((prompt, key) => (
        <Grid
          key={key}
          item
          xs={12}
          sm={6}
          md={4}
          onClick={() => handleClick(prompt)}
          {...styles.defaultPrompt}
        >
          <div style={styles.promptContent}>
            {/* Render the MenuLogo SVG */}
            <MenuLogo style={styles.menuLogo} />
            {/* Render the prompt text */}
            <Typography style={styles.promptText}>{prompt}</Typography>
          </div>
        </Grid>
      ))}
    </Grid>
  ) : null;
};

export default DefaultPrompt;
