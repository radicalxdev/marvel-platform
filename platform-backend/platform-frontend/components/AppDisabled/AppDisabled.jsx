import { Grid, Typography } from '@mui/material';

import styles from './styles';

const BodyText =
  'It\u0027s great having you here, but RadicalX is a desktop experience. Please try again from your computer to continue your journey. We can\u0027t wait to see you there';

/**
 * Renders the entire AppDisable component.
 *
 * @return {ReactElement} The rendered AppDisable component.
 */
const AppDisabled = (props) => {
  const { head } = props;
  const renderTitle = () => {
    return (
      <Grid {...styles.titleGridProps}>
        <Typography {...styles.titleProps}>Hi there 👋</Typography>
      </Grid>
    );
  };

  const renderBody = () => {
    return (
      <Grid {...styles.bodyGridProps}>
        <Typography {...styles.bodyProps}>{BodyText}</Typography>
      </Grid>
    );
  };

  const renderGoodbye = () => {
    return (
      <Grid {...styles.bodyGridProps}>
        <Typography {...styles.bodyProps}>
          ❤️ <br /> RadicalX
        </Typography>
      </Grid>
    );
  };

  return (
    <Grid {...styles.mainGridProps}>
      <Grid {...styles.innerGridProps}>
        {head}
        {renderTitle()}
        {renderBody()}
        {renderGoodbye()}
      </Grid>
    </Grid>
  );
};

export default AppDisabled;
