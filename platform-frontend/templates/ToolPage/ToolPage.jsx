import { Grid, useTheme } from '@mui/material';

import { useRouter } from 'next/router';

import AccordionInputGroupItem from '@/components/AccordionInputGroupItem';
import GradientOutlinedButton from '@/components/GradientOutlinedButton';

import ArrowBack from '@/assets/svg/purple-arrow-back.svg';

import ROUTES from '@/constants/routes';

import styles from './styles';
import ToolForm from './ToolForm';

const ToolPage = (props) => {
  const { toolDoc } = props;
  const theme = useTheme();
  const router = useRouter();

  const handleRoute = () => router.push(ROUTES.HOME);

  const renderBackButton = () => {
    return (
      <Grid {...styles.backButtonGridProps}>
        <GradientOutlinedButton
          bgcolor="#B3B3B3"
          icon={<ArrowBack />}
          textColor={theme.palette.Greyscale[500]}
          iconPlacement="left"
          onHoverTextColor="#B3B3B3"
          clickHandler={handleRoute}
          text="Back"
          {...styles.outlinedButtonProps}
        />
      </Grid>
    );
  };

  const renderForm = () => {
    return (
      <Grid {...styles.formGridProps}>
        <AccordionInputGroupItem
          title={toolDoc?.name}
          extraAccordionDetailsProps={{ px: 10 }}
        >
          <ToolForm inputs={toolDoc?.inputs} />
        </AccordionInputGroupItem>
      </Grid>
    );
  };

  return (
    <Grid {...styles.mainGridProps}>
      {renderBackButton()}
      {renderForm()}
    </Grid>
  );
};
export default ToolPage;
