import { useEffect } from 'react';

import MainAppLayout from '@/layouts/MainAppLayout';
import HistoryPage from '@/templates/HistoryPage';

const mockData = [
  // Today
  {
    title: 'Video Comprehension Questions',
    description:
      'Generate guiding questions aligned to a Youtube video on UX design trends',
    createdDate: '2024-06-24T10:00:00Z',
    backgroundImgURL:
      'https://firebasestorage.googleapis.com/v0/b/kai-ai-f63c8.appspot.com/o/Dynamo.png?alt=media&token=db14183f-a294-49b2-a9de-0818b007c080',
    logo: 'https://firebasestorage.googleapis.com/v0/b/kai-ai-f63c8.appspot.com/o/YoutubeLogo.png?alt=media&token=2809083f-f816-41b6-8f86-80582b3da188',
  },
  {
    title: 'Understanding User Experience',
    description: 'Deep dive into user experience principles with video guides',
    createdDate: '2024-06-21T09:30:00Z',
    backgroundImgURL:
      'https://firebasestorage.googleapis.com/v0/b/kai-ai-f63c8.appspot.com/o/Dynamo.png?alt=media&token=db14183f-a294-49b2-a9de-0818b007c080',
    logo: 'https://firebasestorage.googleapis.com/v0/b/kai-ai-f63c8.appspot.com/o/YoutubeLogo.png?alt=media&token=2809083f-f816-41b6-8f86-80582b3da188',
  },
  {
    title: 'Multiple Choice Assessment - CSS Animations',
    description:
      'Test your knowledge of CSS animations with multiple choice questions',
    createdDate: '2024-06-24T08:00:00Z',
    backgroundImgURL:
      'https://firebasestorage.googleapis.com/v0/b/kai-ai-f63c8.appspot.com/o/Quizify.png?alt=media&token=d1255f27-b1a1-444e-b96a-4a3ac559237d',
    logo: 'https://firebasestorage.googleapis.com/v0/b/kai-ai-f63c8.appspot.com/o/QuizifyLogo.png?alt=media&token=9bf1d066-fba4-4063-9640-ef732e237d31',
  },

  // Yesterday

  {
    title: 'Multiple Choice Assessment - CSS Layouts',
    description:
      'Test your understanding of CSS layouts with multiple choice questions',
    createdDate: '2024-06-23T12:00:00Z',
    backgroundImgURL:
      'https://firebasestorage.googleapis.com/v0/b/kai-ai-f63c8.appspot.com/o/Quizify.png?alt=media&token=d1255f27-b1a1-444e-b96a-4a3ac559237d',
    logo: 'https://firebasestorage.googleapis.com/v0/b/kai-ai-f63c8.appspot.com/o/QuizifyLogo.png?alt=media&token=9bf1d066-fba4-4063-9640-ef732e237d31',
  },

  // Previous 30 Days
  {
    title: 'Video Comprehension - Data Visualization',
    description:
      'Explore data visualization techniques with videos and quizzes',
    createdDate: '2024-06-15T10:00:00Z',
    backgroundImgURL:
      'https://firebasestorage.googleapis.com/v0/b/kai-ai-f63c8.appspot.com/o/Dynamo.png?alt=media&token=db14183f-a294-49b2-a9de-0818b007c080',
    logo: 'https://firebasestorage.googleapis.com/v0/b/kai-ai-f63c8.appspot.com/o/YoutubeLogo.png?alt=media&token=2809083f-f816-41b6-8f86-80582b3da188',
  },
  {
    title: 'Multiple Choice Assessment - HTML Basics',
    description:
      'Assess your knowledge of HTML basics with multiple choice questions',
    createdDate: '2024-06-10T09:00:00Z',
    backgroundImgURL:
      'https://firebasestorage.googleapis.com/v0/b/kai-ai-f63c8.appspot.com/o/Quizify.png?alt=media&token=d1255f27-b1a1-444e-b96a-4a3ac559237d',
    logo: 'https://firebasestorage.googleapis.com/v0/b/kai-ai-f63c8.appspot.com/o/QuizifyLogo.png?alt=media&token=9bf1d066-fba4-4063-9640-ef732e237d31',
  },
  {
    title: 'Youtube Questions - React Components',
    description:
      'Learn about React components through a series of quiz questions',
    createdDate: '2024-06-05T15:00:00Z',
    backgroundImgURL:
      'https://firebasestorage.googleapis.com/v0/b/kai-ai-f63c8.appspot.com/o/Dynamo.png?alt=media&token=db14183f-a294-49b2-a9de-0818b007c080',
    logo: 'https://firebasestorage.googleapis.com/v0/b/kai-ai-f63c8.appspot.com/o/YoutubeLogo.png?alt=media&token=2809083f-f816-41b6-8f86-80582b3da188',
  },

  // Months Before
  {
    title: 'Multiple Choice Assessment - JavaScript Fundamentals',
    description:
      'Test your understanding of JavaScript fundamentals with quizzes',
    createdDate: '2024-05-28T12:00:00Z',
    backgroundImgURL:
      'https://firebasestorage.googleapis.com/v0/b/kai-ai-f63c8.appspot.com/o/Quizify.png?alt=media&token=d1255f27-b1a1-444e-b96a-4a3ac559237d',
    logo: 'https://firebasestorage.googleapis.com/v0/b/kai-ai-f63c8.appspot.com/o/QuizifyLogo.png?alt=media&token=9bf1d066-fba4-4063-9640-ef732e237d31',
  },
  {
    title: 'YouTube - Introduction to Machine Learning',
    description:
      'Explore the basics of machine learning through YouTube videos',
    createdDate: '2024-05-21T09:00:00Z',
    backgroundImgURL:
      'https://firebasestorage.googleapis.com/v0/b/kai-ai-f63c8.appspot.com/o/Dynamo.png?alt=media&token=db14183f-a294-49b2-a9de-0818b007c080',
    logo: 'https://firebasestorage.googleapis.com/v0/b/kai-ai-f63c8.appspot.com/o/YoutubeLogo.png?alt=media&token=2809083f-f816-41b6-8f86-80582b3da188',
  },
  // March
  {
    title: 'CSS Flexbox Quiz',
    description:
      'Test your knowledge on CSS Flexbox with multiple choice questions',
    createdDate: '2024-03-15T09:00:00Z',
    backgroundImgURL:
      'https://firebasestorage.googleapis.com/v0/b/kai-ai-f63c8.appspot.com/o/Quizify.png?alt=media&token=d1255f27-b1a1-444e-b96a-4a3ac559237d',
    logo: 'https://firebasestorage.googleapis.com/v0/b/kai-ai-f63c8.appspot.com/o/QuizifyLogo.png?alt=media&token=9bf1d066-fba4-4063-9640-ef732e237d31',
  },

  // January
  {
    title: 'Advanced CSS Techniques Assessment',
    description:
      'Assess your skills with advanced CSS techniques through multiple choice questions',
    createdDate: '2024-01-28T09:00:00Z',
    backgroundImgURL:
      'https://firebasestorage.googleapis.com/v0/b/kai-ai-f63c8.appspot.com/o/Quizify.png?alt=media&token=d1255f27-b1a1-444e-b96a-4a3ac559237d',
    logo: 'https://firebasestorage.googleapis.com/v0/b/kai-ai-f63c8.appspot.com/o/QuizifyLogo.png?alt=media&token=9bf1d066-fba4-4063-9640-ef732e237d31',
  },
  {
    title: 'Responsive Design Quiz',
    description: 'Evaluate your knowledge on responsive web design principles',
    createdDate: '2024-01-15T09:00:00Z',
    backgroundImgURL:
      'https://firebasestorage.googleapis.com/v0/b/kai-ai-f63c8.appspot.com/o/Quizify.png?alt=media&token=d1255f27-b1a1-444e-b96a-4a3ac559237d',
    logo: 'https://firebasestorage.googleapis.com/v0/b/kai-ai-f63c8.appspot.com/o/QuizifyLogo.png?alt=media&token=9bf1d066-fba4-4063-9640-ef732e237d31',
  },
  {
    title: 'CSS Layout Techniques',
    description: 'Test your knowledge on various CSS layout techniques',
    createdDate: '2024-01-05T09:00:00Z',
    backgroundImgURL:
      'https://firebasestorage.googleapis.com/v0/b/kai-ai-f63c8.appspot.com/o/Quizify.png?alt=media&token=d1255f27-b1a1-444e-b96a-4a3ac559237d',
    logo: 'https://firebasestorage.googleapis.com/v0/b/kai-ai-f63c8.appspot.com/o/QuizifyLogo.png?alt=media&token=9bf1d066-fba4-4063-9640-ef732e237d31',
  },
  {
    title: 'Intro to CSS Quiz',
    description:
      'Assess your basic understanding of CSS with multiple choice questions',
    createdDate: '2024-01-01T09:00:00Z',
    backgroundImgURL:
      'https://firebasestorage.googleapis.com/v0/b/kai-ai-f63c8.appspot.com/o/Quizify.png?alt=media&token=d1255f27-b1a1-444e-b96a-4a3ac559237d',
    logo: 'https://firebasestorage.googleapis.com/v0/b/kai-ai-f63c8.appspot.com/o/QuizifyLogo.png?alt=media&token=9bf1d066-fba4-4063-9640-ef732e237d31',
  },
  // October
  {
    title: 'CSS Animation Techniques',
    description: 'Explore various animation techniques in CSS',
    createdDate: '2023-10-21T09:00:00Z',
    backgroundImgURL:
      'https://firebasestorage.googleapis.com/v0/b/kai-ai-f63c8.appspot.com/o/Quizify.png?alt=media&token=d1255f27-b1a1-444e-b96a-4a3ac559237d',
    logo: 'https://firebasestorage.googleapis.com/v0/b/kai-ai-f63c8.appspot.com/o/QuizifyLogo.png?alt=media&token=9bf1d066-fba4-4063-9640-ef732e237d31',
  },
  {
    title: 'CSS Transitions Quiz',
    description: 'Test your knowledge on CSS transition properties',
    createdDate: '2023-10-15T09:00:00Z',
    backgroundImgURL:
      'https://firebasestorage.googleapis.com/v0/b/kai-ai-f63c8.appspot.com/o/Quizify.png?alt=media&token=d1255f27-b1a1-444e-b96a-4a3ac559237d',
    logo: 'https://firebasestorage.googleapis.com/v0/b/kai-ai-f63c8.appspot.com/o/QuizifyLogo.png?alt=media&token=9bf1d066-fba4-4063-9640-ef732e237d31',
  },
];

const KaiHistory = () => {
  useEffect(() => {
    // Simulate fetching data from backend (not necessary for mockData)
  }, []);

  return <HistoryPage mockData={mockData} />;
};

KaiHistory.getLayout = function getLayout(page) {
  return <MainAppLayout>{page}</MainAppLayout>;
};

export default KaiHistory;
