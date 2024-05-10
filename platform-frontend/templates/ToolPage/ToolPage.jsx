import { Grid, useTheme } from '@mui/material';

import GradientOutlinedButton from '@/components/GradientOutlinedButton';

import ToolImage from '@/assets/images/BookImage.png';
import ArrowBack from '@/assets/svg/purple-arrow-back.svg';

import styles from './styles';

const DEFAULT_TOOLS = [
  {
    id: 1,
    name: 'Kai Tools',
    image: ToolImage,
    description:
      'Kai Tools is a collection of AI tools that can be used to help you with your AI learning journey.',
  },
  {
    id: 2,
    name: 'Kai Chatbot',
    image: ToolImage,
    description:
      'Kai Chatbot is a chatbot that can help you with your AI learning journey.',
  },
  {
    id: 3,
    name: 'Kai AI',
    image: ToolImage,
    description:
      'Kai AI is a collection of AI tools that can be used to help you with your AI learning journey.',
  },
  {
    id: 4,
    name: 'Quiz Generator',
    image: ToolImage,
    description:
      'Quiz Generator is a collection of AI tools that can be used to help you with your AI learning journey.',
  },
];

const ToolPage = () => {
  const theme = useTheme();
  const renderBackButton = () => {
    return (
      <Grid {...styles.backButtonGridProps}>
        <GradientOutlinedButton
          bgcolor={theme.palette.Common.White['100p']}
          icon={<ArrowBack />}
          textColor={theme.palette.Greyscale[500]}
          iconPlacement="left"
          onHoverTextColor={theme.palette.Common.White['100p']}
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
