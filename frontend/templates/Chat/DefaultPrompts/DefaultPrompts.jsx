import { Button, Box, Typography } from '@mui/material';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
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
        <Typography variant="body1" sx={styles.defaultPromptDescription}>
          {prompt.description}
        </Typography>
      </Button>
    ))}
  </Box>
);

export default DefaultPrompts;
