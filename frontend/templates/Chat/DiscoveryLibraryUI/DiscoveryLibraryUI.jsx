import React, { useEffect, useState } from 'react';

import {
  Card,
  CardActionArea,
  CardContent,
  Grid,
  IconButton,
  Typography,
} from '@mui/material';

import { useDispatch, useSelector } from 'react-redux';

import DiscoveryIcon from '@/assets/svg/add-block2.svg';

import imageCover1 from '@/assets/svg/ImageCover1.svg';
import imageCover2 from '@/assets/svg/ImageCover2.svg';
import imageCover3 from '@/assets/svg/ImageCover3.svg';
import imageCover4 from '@/assets/svg/ImageCover4.svg';
import AvatarImage from '@/assets/svg/ReadyPlayerMeAvatar.svg';
import StarGroupIcon from '@/assets/svg/starGroupIcon.svg';
import UnionIcon from '@/assets/svg/Union.svg';

import styles from './styles';

import { setInput } from '@/redux/slices/chatSlice';

const DiscoveryLibraryUI = ({ show, handleSendMessage }) => {
  const { data: user } = useSelector((state) => state.user);
  const [customPrompts, setCustomPrompts] = useState([]);
  const dispatch = useDispatch();

  const getRandomImage = () => {
    const imageUrls = [
      imageCover1,
      imageCover2,
      imageCover3,
      imageCover4,
      // Add more image URLs as needed
    ];

    const RandomImage = imageUrls[Math.floor(Math.random() * imageUrls.length)];
    return <RandomImage {...styles.backImageProps} />;
  };

  useEffect(() => {
    // Define your custom prompts here
    const categorizePrompts = () => [
      {
        title: 'Math Tutor',
        description:
          'From now on, I want you to act as a math tutor. I will be asking you questions related to various mathematical concepts, including algebra, geometry, calculus, and statistics. Please provide detailed explanations, step-by-step solutions, and relevant examples for each topic we discuss.',
      },
      {
        title: 'Biology Tutor',
        description:
          'Please act as my biology tutor. I will ask you about topics such as cell biology, genetics, evolution, ecology, and human anatomy. Provide comprehensive explanations, diagrams, and examples to help me understand these biological concepts.',
      },
      {
        title: 'Programming Tutor',
        description:
          'I want you to be my programming tutor. I will ask you about various programming languages, coding concepts, algorithms, and debugging techniques. Provide clear explanations, code examples, and step-by-step guidance for writing and understanding code.',
      },
      {
        title: 'Music Tutor',
        description:
          'Act as a music tutor for our conversation. I will ask you about music theory, instruments, composition, and performance techniques. Provide detailed explanations, sheet music examples, and exercises to help me understand and improve my musical abilities.',
      },
      // { title: 'Programming Tutor', description: 'I want you to be my programming tutor. I will ask you about various programming languages, coding concepts, algorithms, and debugging techniques. Provide clear explanations, code examples, and step-by-step guidance for writing and understanding code.' },

      // Add more prompts as needed
    ];
    const fetchPrompts = async () => {
      const prompts = categorizePrompts(); // This could be an API call or local data
      setCustomPrompts(prompts);
    };

    fetchPrompts();
  }, []);

  const handlePromptClick = (description) => {
    // console.log('Prompt clicked:', description);
    dispatch(setInput(description));
    handleSendMessage(description);
  };

  return (
    <Grid container {...styles.discoveryContainerGrid(show)}>
      <Grid container {...styles.discoveryGridProps}>
        <Grid container {...styles.discoveryPanelProps}>
          <IconButton>
            <DiscoveryIcon {...styles.discoveryIconProps} />
          </IconButton>
          <Typography {...styles.discoveryPanelTextProps}>Discovery</Typography>
        </Grid>

        <Grid item {...styles.unionIconGridProps}>
          <IconButton>
            <UnionIcon />
          </IconButton>
          <Typography {...styles.unionIconTextProps}>
            Welcome Back, {user?.fullName || 'User'}!
          </Typography>
        </Grid>

        <Grid container {...styles.avatarGridProps}>
          <Grid item {...styles.avatarImageGridProps}>
            <AvatarImage {...styles.avatarImageProps} />
          </Grid>
          <Grid item {...styles.starGroupIconGridProps}>
            <StarGroupIcon {...styles.starGroupIconProps} />
          </Grid>
          <Grid item {...styles.avatarTextBoxProps}>
            <Typography {...styles.avatarHeaderTextProps}>
              AI Custom Course Creator
            </Typography>
            <Typography {...styles.avatarSubTextProps}>
              Have Kai help you build your class from scratch!
            </Typography>
          </Grid>
        </Grid>

        <Grid container {...styles.cardGridProps}>
          {customPrompts?.map((prompt, index) => (
            <Grid
              item
              key={index}
              onClick={() => handlePromptClick(prompt.description)}
            >
              <Card {...styles.cardProps}>
                <CardActionArea>
                  <CardContent>
                    {getRandomImage()}
                    <Typography {...styles.cardTitleProps}>
                      {prompt.title}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default DiscoveryLibraryUI;
