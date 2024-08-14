/* eslint-disable */
import { useRef, useState } from 'react';

import { Grid, Typography } from '@mui/material';

import GradientOutlinedButton from '@/components/GradientOutlinedButton';

import ArrowDropDown from '@/assets/svg/DropDown.svg';

import ExplainCom from './ProcessbarExplain/index';
import StatusIcon from './StatusIcon/index';

import styles from './styles';

import theme from '@/theme/theme';

const WelcomeScreen = (props) => {
  const guidList = useRef([
    {
      type: 'Dot',
      status: 'doing',
    },
    {
      type: 'Line',
      status: 'undo',
    },
    {
      type: 'Dot',
    },
    {
      type: 'Line',
    },
    {
      type: 'Dot',
    },
    {
      type: 'Line',
    },
    {
      type: 'Dot',
    },
  ]);
  const [explainShow, setExplainShow] = useState(false);

  const LineGuideCom = () => {
    return (
      <Grid {...styles.lineGuideGridProps}>
        {guidList.current.map((item, index) => {
          if (item.type === 'Line') {
            return <Grid key={index} {...styles.guideLineProps} />;
          }
          return <StatusIcon status={item.status} />;
        })}

        <ArrowDropDown cursor="pointer" onClick={() => setExplainShow(true)} />
      </Grid>
    );
  };

  const MainSection = () => {
    return (
      <Grid>
        <Typography {...styles.MainSectionProps}>
          Welcome to{' '}
          <span
            style={{
              color: theme.palette.primary.main,
            }}
          >
            Kai
          </span>{' '}
          <span>👋</span>
        </Typography>
        <Typography {...styles.MainSectionTwoProps}>
          Let's get started!
        </Typography>

        <GradientOutlinedButton
          bgcolor={theme.palette.primary.main}
          clickHandler={() => {}}
          text="Start Here!"
          textColor="white"
          {...styles.submitButtonProps}
        />
      </Grid>
    );
  };

  return (
    <Grid {...styles.mainGridProps}>
      {LineGuideCom()}
      {MainSection()}
      {explainShow && (
        <ExplainCom
          guidState={guidList.current}
          onClose={() => {
            setExplainShow(false);
          }}
        />
      )}
    </Grid>
  );
};

export default WelcomeScreen;
