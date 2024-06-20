import { Grid, Typography } from '@mui/material';

import HistoryListing from '@/components/HistoryListing';

import styles from './styles';

const outputData = [
  {
    title: 'Questions from Youtube - Javascript Basics',
    logo: 'https://firebasestorage.googleapis.com/v0/b/kai-ai-f63c8.appspot.com/o/YoutubeLogo.png?alt=media&token=2809083f-f816-41b6-8f86-80582b3da188',
    backgroundImgURL:
      'https://firebasestorage.googleapis.com/v0/b/kai-ai-f63c8.appspot.com/o/Dynamo.png?alt=media&token=db14183f-a294-49b2-a9de-0818b007c080',
    description: 'This is a test',
    createdDate: '06/14/2024',
    toolId: '0',
    questions: [
      {
        question: 'What is the main focus of UX design?',
        possibleAnswers: [
          'Designing what the users experience should be',
          'Making the users experience better',
          'Redesigning products completely',
          'Ignoring user feedback',
        ],
        correctAnswer: ['Designing what the users experience should be'],
      },
      {
        question: 'What are the three most important factors in UX design?',
        possibleAnswers: [
          'Useful, usable, desirable',
          'Cheap, fast, colorful',
          'Complex, slow, boring',
          'Unattractive, difficult, slow',
        ],
        correctAnswer: ['Useful, usable, desirable'],
      },
      {
        question: 'What is an example of something a UX designer might do?',
        possibleAnswers: [
          'Creating wireframes',
          'Making coffee cups',
          'Building cars',
          'Performing surgery',
        ],
        correctAnswer: ['Creating wireframes'],
      },
    ],
  },
  {
    title: 'Multiple Choice Assessment - CSS Styling',
    logo: 'https://firebasestorage.googleapis.com/v0/b/kai-ai-f63c8.appspot.com/o/QuizifyLogo.png?alt=media&token=9bf1d066-fba4-4063-9640-ef732e237d31',
    backgroundImgURL:
      'https://firebasestorage.googleapis.com/v0/b/kai-ai-f63c8.appspot.com/o/Quizify.png?alt=media&token=d1255f27-b1a1-444e-b96a-4a3ac559237d',
    description: 'This is the second test',
    createdDate: '06/20/2024',
    toolId: '1',
    questions: [
      {
        question: 'What is the main focus of UX design?',
        possibleAnswers: [
          'Designing what the users experience should be',
          'Making the users experience better',
          'Redesigning products completely',
          'Ignoring user feedback',
        ],
        correctAnswer: ['Designing what the users experience should be'],
      },
      {
        question: 'What are the three most important factors in UX design?',
        possibleAnswers: [
          'Useful, usable, desirable',
          'Cheap, fast, colorful',
          'Complex, slow, boring',
          'Unattractive, difficult, slow',
        ],
        correctAnswer: ['Useful, usable, desirable'],
      },
    ],
  },
];

/**
 * Component for rendering the main interface of the history section, including the title and a list of history items.
 *
 * @return {JSX.Element} Rendered history interface component
 */
const HistoryInterface = () => {
  /**
   * Function to render the title section of the history interface.
   *
   * @return {JSX.Element} Rendered title component
   */
  const renderTitle = () => {
    return (
      <Grid {...styles.titleGridProps}>
        <Typography {...styles.titleProps}>Output History</Typography>
      </Grid>
    );
  };
  return (
    <Grid {...styles.mainGridProps}>
      {renderTitle()}
      <Typography {...styles.sectionHeaderProps}>
        This Week ({outputData.length})
      </Typography>
      <HistoryListing data={outputData} />
    </Grid>
  );
};

export default HistoryInterface;
