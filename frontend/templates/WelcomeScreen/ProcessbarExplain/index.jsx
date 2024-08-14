/* eslint-disable */

import { useRef } from 'react';

import {
  Divider,
  Grid,
  List,
  ListItem,
  Typography,
  useTheme,
} from '@mui/material';

import StatusIcon from '@/templates/WelcomeScreen/StatusIcon';

import ArrowDropDown from '@/assets/svg/DropDown.svg';

import styles from '../styles';

import Styles from './style';

export default function (props) {
  const theme = useTheme();
  /**
   * status: enum undo|doing|done
   */
  const guidProcessState = useRef([
    {
      key: 'welcome',
      title: 'Welcome',
      status: 'doing',
    },
    {
      key: 'profile_setup',
      title: 'Profile Setup',
      status: 'undo',
    },
    {
      key: 'systemcon_figuration',
      title: 'System Configuration',
      status: 'undo',
    },
    {
      key: 'final_steps',
      title: 'Final Steps',
      status: 'undo',
    },
  ]);
  const MaskCom = () => {
    return <div style={Styles.maskComStyle} />;
  };
  const LineGuideCom = () => {
    return (
      <Grid {...Styles.lineGuideGridProps}>
        <Grid
          item
          container
          alignItems="center"
          justifyContent="space-between"
          height="50px"
        >
          {props.guidState.map((item, index) => {
            if (item.type === 'Line') {
              return <Grid key={index} {...styles.guideLineProps} />;
            }
            return <StatusIcon status={item.status} />;
          })}

          <ArrowDropDown
            cursor="pointer"
            {...Styles.arrowIconProps}
            onClick={() => props.onClose()}
          />
        </Grid>
        <List {...Styles.guidListProps}>
          {guidProcessState.current.map((item) => (
            <>
              <Divider component="li" />
              <ListItem key={item.key} {...Styles.listItemPros}>
                <StatusIcon key={item.key} item status={item.status} />
                &emsp;
                <Typography color={theme.palette.common.white}>
                  {item.title}
                </Typography>
              </ListItem>
            </>
          ))}
        </List>
      </Grid>
    );
  };
  return (
    <Grid {...Styles.explainWrapProps}>
      {MaskCom()}
      {LineGuideCom()}
    </Grid>
  );
}
