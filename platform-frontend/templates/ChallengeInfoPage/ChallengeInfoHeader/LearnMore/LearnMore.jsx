import { Grid, Typography } from '@mui/material';

import emoji from 'remark-emoji';
import remarkGfm from 'remark-gfm';

import PrimaryDialog from '@/components/PrimaryDialog';
import MemoizedReactMarkdown from '@/components/MemoizedMarkdown';

import styles from './styles';

/**
 * Renders a dialog with mission details.
 *
 * @param {object} props - The properties for the mission dialog
 *   @param {boolean} props.open - Indicates whether the dialog is open
 *   @param {string} props.description - The description of the mission
 *   @param {function} props.toggleOpen - Function to toggle the dialog open/close state
 *
 * @return {JSX.Element} The rendered mission dialog component
 */
const LearnMore = (props) => {
  const { open, description, toggleOpen } = props;

  const renderTitle = () => {
    return <Typography {...styles.titleProps}>About The Mission 🚀</Typography>;
  };

  const renderDescription = () => {
    return (
      <Typography {...styles.descriptionProps}>
        <MemoizedReactMarkdown remarkPlugins={[remarkGfm, emoji]}>
          {description}
        </MemoizedReactMarkdown>
      </Typography>
    );
  };

  return (
    <PrimaryDialog
      open={open}
      toggleOpen={toggleOpen}
      title="Mission Scenario"
      extraMainGridProps={styles.extraMainGridProps}
      extraContentGridProps={styles.extraContentGridProps}
    >
      <Grid {...styles.textGridProps}>
        {renderTitle()}
        {renderDescription()}
      </Grid>
    </PrimaryDialog>
  );
};

export default LearnMore;
