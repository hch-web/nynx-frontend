/* eslint-disable max-len */

import templateImg1 from 'assets/template1.png';
import templateImg2 from 'assets/template2.png';
import templateImg3 from 'assets/template3.png';

import clinetImage1 from 'assets/Ellipse1.png';
import clinetImage2 from 'assets/Ellipse2.png';
import clinetImage3 from 'assets/Ellipse3.png';

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

export const graphicServiceSlider = {
  centerMode: false,
  centerPadding: '50px',
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 3,
  arrows: false,
  swipeToSlide: true,
  responsive: [
    {
      breakpoint: 991,
      settings: {
        slidesToShow: 3,
        infinite: true,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 2,
        infinite: true,
        centerMode: false,
      },
    },
    {
      breakpoint: 570,
      settings: {
        slidesToShow: 2,
        infinite: true,
        centerMode: false,
      },
    },
    {
      breakpoint: 450,
      settings: {
        slidesToShow: 1,
        infinite: true,
        centerMode: false,
      },
    },
  ],
};

export const servicesSliderData = [
  {
    id: 1,
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
    id: 2,
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
    id: 3,
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
    id: 4,
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
    id: 5,
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

export const skills = [
  { label: 'Logo Design' },
  { label: 'Social Media' },
  { label: 'Business Card Design' },
];

export const freelanceProfileInfo = {
  // eslint-disable-next-line max-len
  title: 'Graphic Desigin, Website Design, Article Writing, Video Editing',
  description: `- Looking for a Flat or 3D & Modern Minimalist Logo design?  
- Looking for a Business Card / Brochure / Flyer / Banner / Poster design?  
- Looking for a Facebook Cover / Twitter Cover design? This is the right place for you!  Why Choose me?  
- I believe in memorable and timeless designs.  
- Customer happiness is the center of my business.  
- I have 2K+ Happy Buyers on Upwork combining my all services.  
- On and off the Upwork, many Fortune 500 companies come to me for their quick jobs. :)  

I'm also expert in Data Entry, Web Research, SEO, Whiteboard Video, Video Editing, Animaton, QuickBooks, Transcription, Wordpress / Shopify / Wix / HTML / CSS / Laravel / PHP / Webflow / Python / Graphic Design / AutoCad / Ebook / T-shirt / Logo design, Article Writing, Proofreading, etc.  

 I'm doing freelance work for 12+ years through Upwork, Guru and Freelancer`,
  education: [
    {
      name: 'Certificate - Diploma',
      description: 'Politeknik Praktisi, Indonesia, Graduated 2014',
    },
    {
      name: 'Certificate - Diploma',
      description: 'Politeknik Praktisi, Indonesia, Graduated 2014',
    },
  ],
  templates: [{ image: templateImg1 }, { image: templateImg2 }, { image: templateImg3 }],
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
];

export const reviewsData = [
  {
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
    image: clinetImage3,
    name: 'Sarah J',
    caption: 'United State',
    review:
      'Logoflow has been a tremendous help and left an amazing impression on Fiver with this being my first time ever using it. Logoflow not only promised to deliver early but they also kind of promised to have me smiling and they did. ',
    createdAt: '2 months ago',
    rating: ' 5.0',
  },
];
