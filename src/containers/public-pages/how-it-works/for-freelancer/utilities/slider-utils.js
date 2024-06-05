const sliderResponsiveSettings = [
  {
    breakpoint: 1600,
    settings: {
      slidesToShow: 3,
      infinite: true,
    },
  },
  {
    breakpoint: 1100,
    settings: {
      slidesToShow: 2,
      infinite: true,
      centerMode: false,
      slidesToScroll: 1,
    },
  },
  {
    breakpoint: 570,
    settings: {
      slidesToShow: 1,
      infinite: true,
      centerMode: false,
      slidesToScroll: 1,
    },
  },
];

const sliderCommonSettings = {
  centerMode: true,
  centerPadding: '50px',
  dots: false,
  infinite: true,
  slidesToShow: 4,
  slidesToScroll: 2,
  fade: false,
  autoplay: true,
  swipe: true,
  autoplaySpeed: 1000,
  swipeToSlide: true,
  arrows: false,
  responsive: sliderResponsiveSettings,
};

export const freelancerFirstRowSliderSettings = {
  ...sliderCommonSettings,
  speed: 1200,
  rtl: true,
};

export const freelancerMiddleRowSliderSettings = {
  ...sliderCommonSettings,
  speed: 1600,
  rtl: false,
};

export const freelancerLastRowSliderSettings = {
  ...sliderCommonSettings,
  speed: 1400,
  rtl: true,
};
