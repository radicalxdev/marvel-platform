import { useEffect } from 'react';

import { Grid, useTheme } from '@mui/material';

import { useRouter } from 'next/router';

import { useDispatch, useSelector } from 'react-redux';

import AccordionInputGroupItem from '@/components/AccordionInputGroupItem';
import GradientOutlinedButton from '@/components/GradientOutlinedButton';

import ArrowBack from '@/assets/svg/purple-arrow-back.svg';

import ROUTES from '@/constants/routes';

import styles from './styles';
import ToolForm from './ToolForm';

import { resetCommunicator } from '@/redux/slices/toolsSlice';

const ToolPage = (props) => {
  const { toolDoc } = props;
  const theme = useTheme();
  const router = useRouter();
  const dispatch = useDispatch();

  const { response } = useSelector((state) => state.tools);

  useEffect(() => {
    return () => {
      dispatch(resetCommunicator());
    };
  }, []);

  const handleRoute = () => router.push(ROUTES.HOME);

  const renderBackButton = () => {
    return (
      <Grid {...styles.backButtonGridProps}>
        <GradientOutlinedButton
          bgcolor={theme.palette.Background.white2}
          icon={<ArrowBack />}
          textColor={theme.palette.Greyscale[500]}
          iconPlacement="left"
          onHoverTextColor={theme.palette.Background.white2}
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
          response={response}
        >
          <ToolForm inputs={toolDoc?.inputs} />
        </AccordionInputGroupItem>
      </Grid>
    );
  };

  const renderResponse = () => {
    return <Grid {...styles.responseGridProps}>Response</Grid>;
  };

  return (
    <Grid {...styles.mainGridProps}>
      {renderBackButton()}
      {renderForm()}
      {renderResponse()}
    </Grid>
  );
};
export default ToolPage;
