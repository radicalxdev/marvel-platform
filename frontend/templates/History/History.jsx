import { Grid, Typography } from '@mui/material';

import HistoryListing from '@/components/HistoryListing';

import BookImage from '../../assets/images/BookImage.png';

import styles from './styles';

const outputData = [
  {
    title: 'Questions from Youtube - Javascript Basics',
    logo: 'data:image/png;base64,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',
    backgroundImgURL:
      'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxIQDw8PEBAQFQ8PDw8PDQ8VFhAQEA8PFRUWFhUVFRUYHSggGBolHRYVITEhJSkrLi4uFx8zODMtNygtLisBCgoKDg0OFQ8QGi0dFR0tLS0tLSsrLS0tLSsrLS0tLS0tLS0tLS0tLS0tLS0rLS0tLSstLSstKy0tLTgtLS0tLf/AABEIALcBEwMBIgACEQEDEQH/xAAaAAADAQEBAQAAAAAAAAAAAAAAAQIDBAUG/8QAPxAAAgEBBAcGAwcCBAcAAAAAAAECESExUZEDEhNBYXHwBFKBobHRMmLBFCJCktLh8QWygqLC4hUjU2Nys8P/xAAaAQEBAQADAQAAAAAAAAAAAAACAQADBAUH/8QAIBEBAQEAAgMAAwEBAAAAAAAAAAERAhITIVEDFEFSBP/aAAwDAQACEQMRAD8A+BlpHV/ed73sFN4vNkyvfNjR9BkeJtWpvF5spTeLzZCKQpBtVrvF5spTeLzZKQ6DkHWq0jd7dcavzBuS3vnV0ZlUqM6fVbmXG1Wu8XmzLSaJu6TT5uhpVPhw3Zg7C5GnKxwaTXje5Uxq6EbeXelmz0tYx0mgjLdbirBZDnP649vLvSzY9vLvPNlT7G90szGehmtz8LTdYcsv9abeXeebDby7zzZzOTV9Ra4bwLrXVt33nmw277zzZy64tcF4NldW3feebDbvvSzZy64a4LxXrXTt33nmxbeXelmzntwZShLBgsbG22l3pZsT00u9LNmezfAey4gsZW2l3pZsW2l3pZsWzXENRAsbQ9NLvSzYttLvSzY6IlhsXRtZd6WbE9LLvSzYCaBYWh6SXelmydrLvSzYNEsNiym9LLvSzZL0su9LNgyWCwtPbS70s2BAgYW17sr3zYIc73zYketHRqkUkSjSI4ARSQ0hpCiJcamU4NcsTpSKUR42uLWKWkp7bsjon2ZO6xnNpNBJbqrhaXF2VWusKcvYOTXoYVCperNnXAjWI1gekf8ANvqTqqnIlpYLJC1+CFrcF5hyrCcI91ZIWpHurJFa3BeYtbl5BspbU0WCyQ+SDW6uJbBYpsT5jjFu5Mtdmk91A2N6ZNk1Or7Mlew1UrkCxuzlSbHssaG8mZyYKus9RCY2xUqClESZDNdVb34L3J16XJc3a/MFJMdG3cnz3BsafFKK4Wye/Dl5hObd7bM2Ckv/AJa78vywX14i2sVdo4825vyql/JmyWG0m32r/t6H8kX6gYCD2q5H0em0VraxdhhQ6tLe+bMZHr8o6MpIpIhGkWSJVxZpFVISKSHBrVRKUSIyZrGa3oo0KJSgaRaxNFAuo5p6BSvSfqc8/wCnRd1V5o9NQDUN3btXjS/pr3SXjVGb7BPhme7sxbM3kpd68H7FPu+aD7FPDzR7jgQ2lvXqTyVe9eOuwT4Zlr+nvfLyPRlpFgzOWke5IN5Ve1cq7BHi/IrYwjuXqzSVXvMpNLeG2r7Ep4Izk2TLS4Iyk6gqyHKSM5SATBTkQyaFMlsFIvP0JbGyQUohksugmCkhktFsloFKJZLKZLBSSAAFX1mm0da048uvI49LBq87ZStfOvXXiVY1R0pe63c91OdnNnscq86PMGmdGm7NStMn77vHNmGq1eGG0izSMjKJaOSC3jJGiRylxkIbHSkWkc60rLWn4IvscdCbxY9Z4swXaPl8x/aOHmTKzVyliyW3izJ9p4eZL7Q8F5kyrjRxE4mEtNLEyk63kxZHRKcVv+pjPT4LMzZLJSwS0je8yZTJYaUJkspksFJLEwYmClEsllqNR0SBVZaoNFSfWZL6vfVwKUZsXVi4lPx9Ot5EurQUkvxJa4FeBLXAFKJZLKfIlgpkAmAWfRbdpvm+X7G2i06xo8reDs/082ccr3zYkeruulY9PSL35cd1OdFzZhKPnbz68eZz6PTSjc7K3O1Vx4Gy0yd6pjvT641NEsLVEW+BLOSUTGiUxjlZVRkhUqLEKoql1FEtgImqBMGxNBtUmSxslsFUmSxskNWEyWXqgoLewUmY9THLeU50uRk5ApRTlw6s9vMzk+rOv5BvqwlyBVDfVeuBEur+I3IlsFKE/DzJfJDbJbBTJrgQ+TKZIaUJkspshgpE2AgCr2pXvmxoU73zYI9OV0qopMlDQpUWmWpGSKTFKK6jTITKTFrKqOpNQqLUUMioVNrKqKoqiJqm2S2MXXSJrEyWVTrL3E4htZIVG0SwWkVSJSCTJDSgZDKZACJkspksNUmSxslgpRLJZTJBSJklUKWj4rNIOFGTJZs9HHvecP1C2Fbm8k/RsFlJgBr9nfUdL+kYetJ6kr3zYLr+BSvfNgejK6dUutxRK63r9t411TriKCoZNeqDy6qLUxVB05k5ZriOnDzXEWjihk5ZjyLrHkGYq8ckD8fGzq42seXVAfW5bwXC/gq8L8sxfX/FKn8PyJrH1gt+YuruTsW/xH63ulr513Yi9Hk+Xe3E1Qut9tMfDcLr60HTO7iq7uFquS3kTn/GG9ZOtgdYSdPpdaYtg2IhATBktgpEyWMTDVJkjCgVQxUZrqlLR8ydV1hqMFo3w8zqUF01+xcYLD1+jL0idnKov5f83uVqy4Zz9ztjo13fKXsaR0S7vlP2L443krzdSeK/NpPcT0Un+FPxT/uTPX2Me6sp+6HHQw+X8yj/AKmXw8anlrxNhL/p/wDq/SB7y7GsJZyf/wAxm/X4/W89+PLbtfNlL9+sNxnK982VGXv1xLGq+sOdHcx86V42W/y3kJYZ77sVwtY15WfMsvzMUoqT50zXVnkCfFZcuvAS5ZOjp48E8xuWLdeKrbfv8My6h5Z8+PVg/COa48erCVzjk1gsOqMf5c3x49WC1FeEc+XHq3AK8Y+b+nDzD8nm+71mLW4x8I8+C6aws2ti1gm3usV+5fTMXGxb7XV7ncvYLX32rb7F+F9eAK+lidaUS15P4ly6RtQ6VW+mL+7HDx/CFbK7r6fDGt6Tx/EvRik97pWlaydW6pNWfXiU/itrWtFW2fxXKN0XR3OzA2sT43VsssswjvdGrxtX15SbvV8XrPdalZRkSlTnSjSdtzi6y3XL7txlObfLclYlyRFxc9Jh7YNpK5WrcZVFUCLgEBLZLSwNksGJhqhiBgFjBE1CplaVHrLr+DIaMzZaTn5r6jWl4Py9jFFxFEbLSru/2/pLjpV3P7f0mKNIjkCtoaf5XnH9JvHtX/lnJ+kkc8UaxOWcQrddohx/L/uGY0AfjHXlSvfNgEna+bCh0o7NXGWN3V2Balvz3PF/VGI0JG/B0qr0/utPf6UtxuGv8SXD7y3N+WqZRk/DB2q+vgUmt6fGj3Vtv4WeBdRevxXjFPF4Y2fsOvGG9XPBLDx8GJTrfJ20rVVvdXvxS5jUuMd18ecsMbP2LqYrWt+KF/db/Evl4V5c6BGfzPd8KSpZLldXJvAlSu+8rKU+6r0m8MW170Q3pLKa03ZRfhXw0W98Vy5m1FSjfWL3/E6XRjusxyawKi7Wk6/eVVBasfjsrJ7sG67jFzVtIrfe3JpWU4WUe7exTm3e8bLkqurolYrTM11kt6Vl0fitUk6yd3FXOpnLS7lYt6W9WVTd7VlaMzArYKgICauAVRksmqGyRiIpNibGyQqABksOsYmyWTQl5Fi3pELa8CCah7Vesa7VjWlePoYawbQnderqU3iaRm8Th2z4B9plwyLPzSJ47XqRm8TDtH9U1bI0bx3L3PP0vaJSVG7OFlTBm5/9VzOK8fwz+u//AItPCHn7geeBw/sfk/05PFw+PZlG182CQ1pE29zqzVRO3HWqOa8V7DWjwt9ci9UNQQ6igUNlX9nRrzHRb45Nr1qXG1jQKG+pH5l4J/VD2S7y8VL6JlTWFAodGx+aPn9UGx4xM2uegUOjY/NH/N7Bsljkq+tDNrnoFDo1Fx8l7i1VhnV+hm1z0BRe5HRTqiE41xNjaw1OQqG+zFsyY2sKcBNG0qK9oylpVuT9A0ohxE4hLSMh1DpBtEOQ2iXQFqwnImo2xNPfZz9rw05CZDKbXF+RD0q3U9fUFpSAGurjOWmZDkwWnOLV80Q2sTMKAtLFNolsGINqyCoCAOq9WatfNmmj0rjddhuCcbXzYKJ6EdO11aLtEXfZ5o6YQTuafI83UKiqXZ3HJOTjvF6exDYnLo+1TW+vO06IdvxgvB0HsC8avYj2JUe3w3xksn9TRds0eLyZdg+2WyDYm/2vR4vKQPtmjxeTN6b2x2I9iVLt8N0ZeS+pnLt+EF4uv0Nsb2rYhsTCXbJu6i5L3MZyk75N+NmRNXK6pqKvaRjPTxV1X5GGoGoTSyHLtD3JLzMpSbvbLkkr3Qxnp4q630Db9KT4NUTiZS075GbkC8oc41rKaM3pBRi3y3u5IG0rrXi7vBb+rA3kc4lRvljcgsXHyRM572+uBzz02GYLSnHW8tLThy6qYS02Bk2NKoLXLOMgcqiSKsXH0E5fwC1RTF/UVeAgDaoqACYaxAABIAAGxnvJqTdMXUtQEB6XH3HQ5erilApQAB4GnqDWjAC4mq2Y9QALiaezHswAuJprRj2YAZtGzJ0rjG2T9WAEvqLPdcs+2x/Cm+dhzz7VJ76cgA4LyrnnCRi2KoAEiNJRUfitl3dy5v2ACKznNu/wW5ckY6TS05jAh8Y55SreIABXKpxpfzS9xOVeWG4ADWSAACsAAA1iYgAigAAigAArP//Z',
    description: 'This is a test',
    createdDate: '06/14/2024',
    category: 'FlashCards from Youtube',
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
    logo: BookImage,
    backgroundImgURL:
      'data:image/jpeg;base64,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',
    description: 'This is the second test',
    createdDate: '06/20/2024',
    category: 'Multiple Choice Quiz',
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

const HistoryInterface = () => {
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
