import { Grid, Typography } from '@mui/material';

import ToolsListingContainer from '@/components/ToolsListingContainer';

import ToolImage from '@/assets/images/BookImage.png';

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

const HomePage = (props) => {
  const { data, loading } = props;

  const renderTitle = () => {
    return (
      <Grid {...styles.titleGridProps}>
        <Typography {...styles.titleProps}>
          Welcome to{' '}
          <Typography {...styles.highlightTextProps}>Kai Tools</Typography> 👋
        </Typography>
        <Typography {...styles.subtitleProps}>
          Made for{' '}
          <Typography {...styles.highlightTextProps}>educators</Typography>
        </Typography>
      </Grid>
    );
  };

  return (
    <Grid {...styles.mainGridProps}>
      {renderTitle()}
      <ToolsListingContainer
        data={DEFAULT_TOOLS}
        loading={loading}
        category="All Tools"
      />
    </Grid>
  );
};
export default HomePage;
