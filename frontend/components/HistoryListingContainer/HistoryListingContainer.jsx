import { Grid, Typography } from '@mui/material';

import HistoryCard from '../HistoryCard';

import styles from './styles';

const cardData = [
  {
    title: 'Video Comprehension Questions',
    description: 'Generate guiding questions aligned to a Youtube video on UX',
    createdDate: '04/14/2024',
    backgroundImgURL:
      'https://firebasestorage.googleapis.com/v0/b/kai-ai-f63c8.appspot.com/o/Dynamo.png?alt=media&token=db14183f-a294-49b2-a9de-0818b007c080',
    logo: 'https://firebasestorage.googleapis.com/v0/b/kai-ai-f63c8.appspot.com/o/YoutubeLogo.png?alt=media&token=2809083f-f816-41b6-8f86-80582b3da188',
  },
  {
    title: 'Youtube Questions',
    description: 'Questions taken from "Intro to Javascript" video tutorials',
    createdDate: '04/14/2024',
    backgroundImgURL:
      'https://firebasestorage.googleapis.com/v0/b/kai-ai-f63c8.appspot.com/o/Dynamo.png?alt=media&token=db14183f-a294-49b2-a9de-0818b007c080',
    logo: 'https://firebasestorage.googleapis.com/v0/b/kai-ai-f63c8.appspot.com/o/YoutubeLogo.png?alt=media&token=2809083f-f816-41b6-8f86-80582b3da188',
  },
  {
    title: 'Multiple Choice Assessment - CSS Styling',
    description:
      'Test your CSS skills with multiple choice questions based on "Intro to Javascript" curriculum',
    createdDate: '04/14/2024',
    backgroundImgURL:
      'https://firebasestorage.googleapis.com/v0/b/kai-ai-f63c8.appspot.com/o/Quizify.png?alt=media&token=d1255f27-b1a1-444e-b96a-4a3ac559237d',
    logo: 'https://firebasestorage.googleapis.com/v0/b/kai-ai-f63c8.appspot.com/o/QuizifyLogo.png?alt=media&token=9bf1d066-fba4-4063-9640-ef732e237d31',
  },
];

/**
 * Render HistoryListingContainer with HistoryCards
 *
 * @param {object} props - The properties of the component.
 * @param {object} props.data - The data of the component.
 * @param {string} props.category - The category of the component.
 * @return {JSX.Element} The rendered HistoryListingContainer.
 */
const HistoryListingContainer = (props) => {
  const { data, category } = props;

  const renderTitle = () => {
    return (
      <Grid {...styles.headerGridProps}>
        <Typography {...styles.categoryTitleProps}>
          {category} {data && `(${data?.length})`}
        </Typography>
      </Grid>
    );
  };

  const renderCards = () => {
    return (
      <Grid {...styles.containerGridProps}>
        <Grid {...styles.innerListGridProps}>
          {cardData.map((card, index) => (
            <HistoryCard
              key={index}
              title={card.title}
              description={card.description}
              createdDate={card.createdDate}
              backgroundImgURL={card.backgroundImgURL}
              logo={card.logo}
            />
          ))}
        </Grid>
      </Grid>
    );
  };

  return (
    <Grid {...styles.mainGridProps}>
      {renderTitle()}
      {renderCards()}
    </Grid>
  );
};

export default HistoryListingContainer;
