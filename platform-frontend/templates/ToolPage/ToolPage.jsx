import { Grid, useTheme } from '@mui/material';

import { useRouter } from 'next/router';

import GradientOutlinedButton from '@/components/GradientOutlinedButton';

import ArrowBack from '@/assets/svg/purple-arrow-back.svg';

import ROUTES from '@/constants/routes';

import styles from './styles';

const ToolPage = () => {
  const theme = useTheme();
  const router = useRouter();

  const handleRoute = () => router.push(ROUTES.HOME);
  const renderBackButton = () => {
    return (
      <Grid {...styles.backButtonGridProps}>
        <GradientOutlinedButton
          bgcolor={theme.palette.Common.White['100p']}
          icon={<ArrowBack />}
          textColor={theme.palette.Greyscale[500]}
          iconPlacement="left"
          onHoverTextColor={theme.palette.Common.White['100p']}
          clickHandler={handleRoute}
          text="Back"
          {...styles.outlinedButtonProps}
        />
      </Grid>
    );
  };

  const renderForm = () => {
    return <Grid {...styles.formGridProps}>Form</Grid>;
  };

  return (
    <Grid {...styles.mainGridProps}>
      {renderBackButton()}
      {renderForm()}
    </Grid>
  );
};
export default ToolPage;
