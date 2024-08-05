import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import { Box, Button, Typography } from '@mui/material';

import styles from './styles';

const DefaultPrompts = ({ prompts, onSelect }) => {
  return (
    <Box {...styles.defaultPromptsContainer}>
      {prompts.map((prompt, index) => (
        <Button
          key={index}
          onClick={() => onSelect(prompt)}
          startIcon={<AutoAwesomeIcon />}
          variant="outlined"
          {...styles.defaultPromptButton}
        >
          <Typography {...styles.defaultPromptDescription}>{prompt}</Typography>
        </Button>
      ))}
    </Box>
  );
};

export default DefaultPrompts;
