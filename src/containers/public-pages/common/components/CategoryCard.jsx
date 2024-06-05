import React from 'react';
import { Card, CardActionArea, CardContent, Typography, Box } from '@mui/material';
import { KeyboardArrowRight } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

// styles
import { cardContainerStyles, cardStyles } from 'styles/mui/components/category-card-styles';

function CategoryCard({ title, image, id }) {
  const navigate = useNavigate();

  const handleNavigateToServices = () => {
    navigate('/find-service', {
      state: {
        categoriesDetails: {
          selectedCategory: id,
        },
      },
    });
  };

  return (
    <Box className="card-container" onClick={handleNavigateToServices}>
      <Card className="mx-0 mx-sm-2" sx={cardContainerStyles}>
        <CardActionArea>
          <Box sx={{ background: `url(${image}) center no-repeat`, ...cardStyles }} />
          <CardContent sx={{ height: '5rem' }}>
            <Typography
              variant="body1"
              sx={{
                fontWeight: '500',
              }}
              className="text-capitalize"
            >
              {title} <KeyboardArrowRight sx={{ fontSize: '17px' }} />
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Box>
  );
}

CategoryCard.propTypes = {
  title: PropTypes.string,
  image: PropTypes.string,
  id: PropTypes.number,
};

CategoryCard.defaultProps = {
  title: '',
  image: '',
  id: 0,
};

export default CategoryCard;
