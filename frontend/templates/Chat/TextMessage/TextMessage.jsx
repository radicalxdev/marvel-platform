import { Fade, Grid, Typography } from '@mui/material';
import emoji from 'remark-emoji';
import remarkGfm from 'remark-gfm';

import MemoizedReactMarkdown from '@/components/MemoizedMarkdown';

import CodeComponent from '../CodeComponent';

import styles from './styles';

const TextMessage = (props) => {
  const { isMyMessage, message } = props;

  return (
    <Fade in direction="up">
      <Grid id="message" {...styles.mainGridProps(isMyMessage)}>
        <Grid {...styles.messageWrapperProps(isMyMessage)}>
          {!isMyMessage && (
            <Typography {...styles.aiNameProps}>Marvel</Typography>
          )}
          <Typography {...styles.messageProps(isMyMessage)}>
            <MemoizedReactMarkdown
              remarkPlugins={[remarkGfm, emoji]}
              components={{ code: CodeComponent }}
            >
              {message}
            </MemoizedReactMarkdown>
          </Typography>
        </Grid>
      </Grid>
    </Fade>
  );
};

export default TextMessage;
