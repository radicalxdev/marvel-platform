import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import { Box, Button, Typography } from '@mui/material';

import styles from './styles';

const DefaultPrompts = ({ prompts, onSelect }) => (
  <Box sx={styles.defaultPromptsContainer}>
    {prompts.map((prompt, index) => (
      <Button
        key={index}
        onClick={() => onSelect(prompt)}
        sx={styles.defaultPromptButton}
        startIcon={<AutoAwesomeIcon />}
      >
        <Typography sx={styles.defaultPromptDescription}>{prompt}</Typography>
      </Button>
    ))}
  </Box>
);

export default DefaultPrompts;
