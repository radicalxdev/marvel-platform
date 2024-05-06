import { Grid, Typography } from '@mui/material';

import styles from './styles';

const PartnerCompanies = (props) => {
  const { partners } = props;
  const renderTopHalf = () => {
    return (
      <Grid {...styles.titleGridProps}>
        <Typography {...styles.titleProps}>
          Loved By Learners at thousands of companies
        </Typography>
      </Grid>
    );
  };

  const renderBottomHalf = () => {
    return (
      <Grid {...styles.partnerLogoGridProps}>
        {partners?.map(({ id, logo: Logo }) => (
          <Grid key={id} {...styles.logoGridProps}>
            <Logo />
          </Grid>
        ))}
      </Grid>
    );
  };

  return (
    <Grid {...styles.partnerGridProps}>
      {renderTopHalf()}
      {renderBottomHalf()}
    </Grid>
  );
};

export default PartnerCompanies;
