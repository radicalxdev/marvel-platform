import React, { useEffect, useState } from 'react';

import { Slide } from '@mui/material';

const SlideTransition = ({ children }) => {
  const [currentChildren, setCurrentChildren] = useState(children);
  const [slideIn, setSlideIn] = useState(true);

  useEffect(() => {
    let timer;
    if (children !== currentChildren) {
      setSlideIn(false);
      timer = setTimeout(() => {
        setCurrentChildren(children);
        setSlideIn(true);
      }, 300);
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [children, currentChildren]);

  return (
    <Slide direction="left" in={slideIn} timeout={300}>
      <div>{currentChildren}</div>
    </Slide>
  );
};

export default SlideTransition;
