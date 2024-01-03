import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';

function SlideshowGrid() {
    const [imageIndex, setImageIndex] = useState(0);
    const imageUrls = [
      'https://source.unsplash.com/random?furniture',
      'https://source.unsplash.com/random?interior'
    ];
  
    useEffect(() => {
      const intervalId = setInterval(() => {
        setImageIndex((prevIndex) => (prevIndex + 1) % imageUrls.length);
      }, 5000);
  
      return () => clearInterval(intervalId);
    }, [imageUrls.length]);
  
    return (
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: `url(${imageUrls[imageIndex]})`,
          backgroundRepeat: 'no-repeat',
          backgroundColor: (theme) =>
            theme.palette.mode === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          transition: 'background-image 1s ease-in-out',
        }}
      />
    );
  }

  export default SlideshowGrid;