/* eslint-disable max-len */

import serviceCard1 from 'assets/logo-design-gig.jpg';
import serviceCard2 from 'assets/presentation-gig.jpg';
import serviceCard3 from 'assets/website-design-gig.jpg';
import serviceCard4 from 'assets/social-media.jpg';
import serviceCard5 from 'assets/brand-design-gig.jpg';

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

import templateImg3 from '../../../assets/template3.png';

import clinetImage1 from '../../../assets/Ellipse1.png';
import clinetImage2 from '../../../assets/Ellipse2.png';
import clinetImage3 from '../../../assets/Ellipse3.png';

import visaCard from '../../../assets/visaCard.svg';
import masterCard from '../../../assets/masterCard.svg';

export const gigPackageOptions = [
  { value: 'basic', label: 'Basic' },
  { value: 'standard', label: 'Standard' },
  { value: 'premium', label: 'Premium' },
];

export const gigInfo = {
  reviews: [
    {
      id: 1,
      image: clinetImage1,
      name: 'John S',
      caption: 'United State',
      review:
        'At first I was a little skeptical because I never hired a freelancer before and the time for completion that was advertised seemed too outstanding to believe. The process was very easy; describe your business, a fitting symbol and some reference photos and your done. I thought my description was dull, but the results were jaw-dropping. He actually sent me four designs with unique themes and all of them were exactly how I imagined them to be. If you want a quick and well-made logo in half the time at even a quarter of the price, come to this guy.',
      gigImage: templateImg3,
      createdAt: '2 months ago',
      rating: ' 5.0',
      jobType: 'Fixed',
    },
    {
      id: 2,
      image: clinetImage2,
      name: 'Lissan H',
      caption: 'United State',
      review:
        'Delwar did everything that I wanted in a timely manner. I loved his editing and the book cover was brilliant.',
      gigImage: templateImg3,
      createdAt: '2 months ago',
      rating: ' 5.0',
      jobType: 'Hourly',
    },
    {
      id: 3,
      image: clinetImage3,
      name: 'Sarah J',
      caption: 'United State',
      review:
        'Logoflow has been a tremendous help and left an amazing impression on Fiver with this being my first time ever using it. Logoflow not only promised to deliver early but they also kind of promised to have me smiling and they did. ',
      createdAt: '2 months ago',
      rating: ' 5.0',
      jobType: 'Monthly',
    },
  ],
};

export const gigs = [
  {
    image: serviceCard1,
    name: 'Lissan H',
    profileLevel: 'Level 2',
    description: 'I will design your logo and brand guideline',
    reviews: '4.9 (1596 Reviews)',
    fixedPrice: '£50',
    fixedFrom: '£120',
    monthlyFrom: '£500',
  },
  {
    image: serviceCard2,
    name: 'John S',
    profileLevel: 'Level 1',
    description: 'I will design your business card and brochures',
    reviews: '4.9 (1596 Reviews)',
    fixedPrice: '£50',
    fixedFrom: '£120',
    monthlyFrom: '£500',
  },
  {
    image: serviceCard3,
    name: 'Zac P',
    description: 'I will develop your website and ecommerce store',
    reviews: '4.9 (1596 Reviews)',
    fixedPrice: '£50',
    fixedFrom: '£120',
    monthlyFrom: '£500',
  },
  {
    last: true,
  },
];

export const servicesSliderData = [
  {
    id: 0,
    profile: profile1,
    image: serviceCard1,
    name: 'Lissan H',
    profileLevel: newExpert,
    description: 'I will design your logo and brand guideline',
    reviews: '4.9 (1596 Reviews)',
    fixedPrice: '£50',
    fixedFrom: '£120',
    monthlyFrom: '£500',
  },
  {
    id: 1,
    image: serviceCard2,
    profile: profile2,
    name: 'John S',
    profileLevel: novoice,
    description: 'I will design your business card and brochures',
    reviews: '4.9 (1596 Reviews)',
    fixedPrice: '£50',
    fixedFrom: '£120',
    monthlyFrom: '£500',
  },
  {
    id: 2,
    image: serviceCard3,
    profile: profile3,
    profileLevel: newExpert,
    name: 'Zac P',
    description: 'I will develop your website and ecommerce store',
    reviews: '4.9 (1596 Reviews)',
    fixedPrice: '£50',
    fixedFrom: '£120',
    monthlyFrom: '£500',
  },
  {
    id: 3,
    image: serviceCard4,
    profile: profile4,
    name: 'Lissan H',
    profileLevel: nynxChoise,
    description: 'I will design your logo and brand guideline',
    reviews: '4.9 (1596 Reviews)',
    fixedPrice: '£50',
    fixedFrom: '£120',
    monthlyFrom: '£500',
  },
  {
    id: 4,
    image: serviceCard5,
    profile: profile5,
    name: 'John S',
    profileLevel: novoice,
    description: 'I will design your business card and brochures',
    reviews: '4.9 (1596 Reviews)',
    fixedPrice: '£50',
    fixedFrom: '£120',
    monthlyFrom: '£500',
  },
  {
    id: 5,
    image: serviceCard2,
    profile: profile4,
    name: 'Zac P',
    profileLevel: achiever,
    description: 'I will develop your website and ecommerce store',
    reviews: '4.9 (1596 Reviews)',
    fixedPrice: '£50',
    fixedFrom: '£120',
    monthlyFrom: '£500',
  },
];

export const graphicServiceSlider = {
  centerMode: true,
  centerPadding: '50px',
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 3,
  // autoplay: true,
  // autoplaySpeed: 2500,
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

export const gigImagesSlider = {
  centerMode: true,
  centerPadding: '50px',
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 2,
  slidesToScroll: 1,
  arrows: true,
  swipeToSlide: true,

  responsive: [
    {
      breakpoint: 991,
      settings: {
        slidesToShow: 1,
        infinite: true,
        // slidesToScroll: 1,
        arrows: false,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 1,
        infinite: true,
        // slidesToScroll: 1,
        centerMode: false,
        arrows: false,
      },
    },
    {
      breakpoint: 570,
      settings: {
        slidesToShow: 1,
        infinite: true,
        // slidesToScroll: 1,
        centerMode: false,
        arrows: false,
      },
    },
    {
      breakpoint: 450,
      settings: {
        slidesToShow: 1,
        infinite: true,
        // slidesToScroll: 1,
        centerMode: false,
        arrows: false,
      },
    },
  ],
};
export const gigImageSlider = {
  centerMode: true,
  centerPadding: '50px',
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: true,
  swipeToSlide: true,

  responsive: [
    {
      breakpoint: 991,
      settings: {
        slidesToShow: 1,
        infinite: true,
        // slidesToScroll: 1,
        arrows: false,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 1,
        infinite: true,
        // slidesToScroll: 1,
        centerMode: false,
        arrows: false,
      },
    },
    {
      breakpoint: 570,
      settings: {
        slidesToShow: 1,
        infinite: true,
        // slidesToScroll: 1,
        centerMode: false,
        arrows: false,
      },
    },
    {
      breakpoint: 450,
      settings: {
        slidesToShow: 1,
        infinite: true,
        // slidesToScroll: 1,
        centerMode: false,
        arrows: false,
      },
    },
  ],
};

export const reviewsData = [
  {
    id: 1,
    image: clinetImage1,
    name: 'John S',
    caption: 'United State',
    review:
      'At first I was a little skeptical because I never hired a freelancer before and the time for completion that was advertised seemed too outstanding to believe. The process was very easy; describe your business, a fitting symbol and some reference photos and your done. I thought my description was dull, but the results were jaw-dropping. He actually sent me four designs with unique themes and all of them were exactly how I imagined them to be. If you want a quick and well-made logo in half the time at even a quarter of the price, come to this guy.',
    gigImage: templateImg3,
    createdAt: '2 months ago',
    rating: ' 5.0',
  },
  {
    id: 2,
    image: clinetImage2,
    name: 'Lissan H',
    caption: 'United State',
    review:
      'Delwar did everything that I wanted in a timely manner. I loved his editing and the book cover was brilliant.',
    gigImage: templateImg3,
    createdAt: '2 months ago',
    rating: ' 5.0',
  },
  {
    id: 3,
    image: clinetImage3,
    name: 'Sarah J',
    caption: 'United State',
    review:
      'Logoflow has been a tremendous help and left an amazing impression on Fiver with this being my first time ever using it. Logoflow not only promised to deliver early but they also kind of promised to have me smiling and they did. ',
    createdAt: '2 months ago',
    rating: ' 5.0',
  },
];

export const profileLinks = [
  {
    name: 'Account',
    to: '#account',
  },
  {
    name: 'Notification',
    to: '#notfication',
  },
  {
    name: 'Billing',
    to: '#',
  },
  {
    name: 'Security',
    to: '#',
  },
];

export const billingPaymentsList = [
  {
    name: 'Marcus Morris',
    type: 'primary',
    cardNumber: 'Visa **** 1679',
    expiryDate: 'Card expires at 09/24',
    image: visaCard,
  },
  {
    name: 'Jason Davis',
    cardNumber: 'Mastercard **** 2704',
    expiryDate: 'Card expires at 02/26',
    image: masterCard,
  },
];
