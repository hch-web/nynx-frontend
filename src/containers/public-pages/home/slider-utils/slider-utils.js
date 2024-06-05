// profile images
import profile1 from 'assets/homepage/sarah-img-1.png';
import profile2 from 'assets/homepage/mark-img.png';
import profile3 from 'assets/homepage/robert.png';
import profile4 from 'assets/homepage/sarah-L-img.png';
import profile5 from 'assets/homepage/Lissan-h.png';

// All Gig Tags
import novoice from 'assets/novice_bage.svg';
import newExpert from 'assets/new_expert_badge.svg';
import nynxChoise from 'assets/nynx_choice.svg';
import achiever from 'assets/achiever_badge.svg';

import serviceCard1 from 'assets/logo-design-gig.jpg';
import serviceCard2 from 'assets/presentation-gig.jpg';
import serviceCard3 from 'assets/website-design-gig.jpg';
import serviceCard4 from 'assets/social-media.jpg';
import serviceCard5 from 'assets/brand-design-gig.jpg';

export const popularCategoriesSliderSettings = {
  // centerMode: false,
  // centerPadding: '50px',
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 2,
  autoplay: true,
  autoplaySpeed: 2500,
  swipeToSlide: true,
  arrows: false,
  responsive: [
    {
      breakpoint: 1400,
      settings: {
        slidesToShow: 4,
        infinite: true,
      },
    },
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 3,
        infinite: true,
      },
    },
    {
      breakpoint: 900,
      settings: {
        slidesToShow: 2,
        infinite: true,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 2,
        infinite: true,
      },
    },
    {
      breakpoint: 570,
      settings: {
        slidesToShow: 2,
        infinite: true,
      },
    },
    {
      breakpoint: 450,
      settings: {
        slidesToShow: 1,
        infinite: true,
      },
    },
  ],
};

export const servicesSliderSettings = {
  centerMode: false,
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 2500,
  arrows: false,
  swipeToSlide: true,
  responsive: [
    {
      breakpoint: 991,
      settings: {
        slidesToShow: 3,
        infinite: true,
        // slidesToScroll: 1,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 2,
        infinite: true,
        // slidesToScroll: 1,
        centerMode: false,
      },
    },
    {
      breakpoint: 570,
      settings: {
        slidesToShow: 2,
        infinite: true,
        // slidesToScroll: 1,
        centerMode: false,
      },
    },
    {
      breakpoint: 450,
      settings: {
        slidesToShow: 1,
        infinite: true,
        // slidesToScroll: 1,
        centerMode: false,
      },
    },
  ],
};

export const servicesSliderData = [
  {
    image: serviceCard1,
    profile: profile1,
    name: 'Sarah D',
    profileLevel: achiever,
    description: 'You will get your logo design and brand guidelines',
    reviews: '5.0 (498 Reviews)',
    fixedPrice: '£50',
    fixedFrom: '£120',
    monthlyFrom: '£500',
  },
  {
    image: serviceCard2,
    profile: profile2,
    name: 'Mark P',
    profileLevel: novoice,
    description: 'You will get your presentation and business card designs',
    reviews: '5.0 (156 Reviews)',
    fixedPrice: '£80',
    fixedFrom: '£50 0',
    monthlyFrom: '£700',
  },
  {
    image: serviceCard3,
    profile: profile3,
    profileLevel: newExpert,
    name: 'Robert H',
    description: 'You will get your website and e-commerce store developed',
    reviews: '5.0 (960 Reviews)',
    fixedPrice: '£40',
    fixedFrom: '£50 0',
    monthlyFrom: '£600',
  },
  {
    image: serviceCard4,
    profile: profile4,
    name: 'Sarah L',
    profileLevel: nynxChoise,
    description: 'You will get your social media marketing',
    reviews: '4.9 (96 Reviews)',
    fixedPrice: '£60',
    fixedFrom: '£500',
    monthlyFrom: '£400',
  },
  {
    image: serviceCard5,
    profile: profile5,
    name: 'Lissan H',
    profileLevel: novoice,
    description: 'You will get your logo design and brand guidelines',
    reviews: '4.9 (1596 Reviews)',
    fixedPrice: '£90',
    fixedFrom: '£500',
    monthlyFrom: '£300',
  },
];
