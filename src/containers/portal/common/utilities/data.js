import { v4 } from 'uuid';
import visaCard from 'assets/visaCard.svg';
import masterCard from 'assets/masterCard.svg';

import googleIcon from 'assets/googleIcon.svg';
import githubIcon from 'assets/githubIcon.svg';
import slackIcon from 'assets/SlackIcon.svg';

export const profileLinks = [
  {
    name: 'Account',
    to: 'account',
  },
  {
    name: 'Notification',
    to: 'notfications',
  },
  {
    name: 'Billing',
    to: 'billing',
  },
  {
    name: 'Security',
    to: 'security',
  },
];

export const settingsNotificationsData = [
  {
    id: v4(),
    label: 'Notification',
    formikKey: 'notifications',
  },
  {
    id: v4(),
    label: 'Billing Updates',
    formikKey: 'billingUpdates',
  },
  {
    id: v4(),
    label: 'New Team Members',
    formikKey: 'newTeamMembers',
  },
  {
    id: v4(),
    label: 'Completed Projects',
    formikKey: 'completedProjects',
  },
  {
    id: v4(),
    label: 'Newsletters',
    formikKey: 'newsLetters',
  },
];

export const billingPaymentsList = [
  {
    id: v4(),
    name: 'Marcus Morris',
    type: 'primary',
    cardNumber: 'Visa **** 1679',
    expiryDate: 'Card expires at 09/24',
    image: visaCard,
  },
  {
    id: v4(),
    name: 'Jason Davis',
    cardNumber: 'Mastercard **** 2704',
    expiryDate: 'Card expires at 02/26',
    image: masterCard,
  },
];

export const billingAddressList = [
  {
    AddressNumber: 'Address 1',
    type: 'primary',
    address: `Ap #285-7193 Ullamcorper Avenue
    Amesbury HI 93373
    United States`,
  },
];

export const connectedAccountsList = [
  {
    name: 'Google',
    caption: 'Plan properly your workflow',
    image: googleIcon,
  },
  {
    name: 'Github',
    caption: 'Keep eye on on your Repositories',
    image: githubIcon,
  },
  {
    name: 'Slack',
    caption: 'Integrate Projects Discussions',
    image: slackIcon,
  },
];

export const countries = [
  { value: 'PK', label: 'Pakistan' },
  { value: 'Ind', label: 'India' },
  { value: 'chne', label: 'China' },
];

export const timeZone = [
  { value: 'PK', label: '(GMT-23:00) International Date Line West' },
  { value: 'Ind', label: '(PST-23:00) International Date Line West' },
  { value: 'chne', label: '(UET-23:00) International Date Line West' },
];

export const deliverablesData = [
  {
    id: v4(),
    title: 'Need Logo and Business card for my company',
    files: [
      {
        id: v4(),
        name: 'Airplus Guideline',
        size: '1.2mb',
        fileSrc: 'pdf',
      },
      {
        id: v4(),
        name: 'FureStibe requirements',
        size: '8kb',
        fileSrc: 'doc',
      },
      {
        id: v4(),
        name: 'FureStibe styles',
        size: '54kb',
        fileSrc: 'css',
      },
    ],
  },
  {
    id: v4(),
    title: 'Need Logo and Business card for my company',
    files: [
      {
        id: v4(),
        name: 'Airplus Guideline',
        size: '1.2mb',
        fileSrc: 'pdf',
      },
    ],
  },
  {
    id: v4(),
    title: 'Need Logo and Business card for my company',
    files: [
      {
        id: v4(),
        name: 'Airplus Guideline',
        size: '1.2mb',
        fileSrc: 'pdf',
      },
      {
        id: v4(),
        name: 'FureStibe requirements',
        size: '8kb',
        fileSrc: 'doc',
      },
    ],
  },
];

export const activityChatsData = [
  {
    id: v4(),
    message: 'Cheerful cowboys make Jolly Ranchers',
    profileImg: '/',
    isSentByMe: false,
    first_name: 'Lissan',
    last_name: 'H',
  },
  {
    id: v4(),
    message: 'Frontend Website Design Corrections in Wordpress and Logo Design',
    profileImg: '/',
    isSentByMe: false,
    first_name: 'Alex',
    last_name: 'H',
  },
  {
    id: v4(),
    message: 'Cheerful cowboys make Jolly Ranchers',
    profileImg: '/',
    isSentByMe: false,
    first_name: 'John',
    last_name: 'H',
  },
  {
    id: v4(),
    message: 'My fear of stairs is escalating',
    profileImg: '/',
    isSentByMe: true,
    first_name: 'Chris',
    last_name: 'H',
  },
  {
    id: v4(),
    message: 'Cheerful cowboys make Jolly Ranchers',
    profileImg: '/',
    isSentByMe: false,
    first_name: 'Lissan',
    last_name: 'H',
  },
  {
    id: v4(),
    message: 'Frontend Website Design Corrections in Wordpress and Logo Design',
    profileImg: '/',
    isSentByMe: false,
    first_name: 'Alex',
    last_name: 'H',
  },
  {
    id: v4(),
    message: 'Cheerful cowboys make Jolly Ranchers',
    profileImg: '/',
    isSentByMe: false,
    first_name: 'John',
    last_name: 'H',
  },
  {
    id: v4(),
    message: 'My fear of stairs is escalating',
    profileImg: '/',
    isSentByMe: true,
    first_name: 'Chris',
    last_name: 'H',
  },
  {
    id: v4(),
    message: 'Cheerful cowboys make Jolly Ranchers',
    profileImg: '/',
    isSentByMe: false,
    first_name: 'Lissan',
    last_name: 'H',
  },
  {
    id: v4(),
    message: 'Frontend Website Design Corrections in Wordpress and Logo Design',
    profileImg: '/',
    isSentByMe: false,
    first_name: 'Alex',
    last_name: 'H',
  },
  {
    id: v4(),
    message: 'Cheerful cowboys make Jolly Ranchers',
    profileImg: '/',
    isSentByMe: false,
    first_name: 'John',
    last_name: 'H',
  },
  {
    id: v4(),
    message: 'My fear of stairs is escalating',
    profileImg: '/',
    isSentByMe: true,
    first_name: 'Chris',
    last_name: 'H',
  },
];

export const messagesChatsData = [
  {
    id: v4(),
    message: 'Cheerful cowboys make Jolly Ranchers',
    profileImg: '/',
    isSentByMe: false,
    profileName: 'Lissan H',
  },
  {
    id: v4(),
    description:
      'Organize your thoughts with an outline. Here’s the outlining strategy I use blog post easier, it ll help you make your message.',
    profileImg: '/',
    isSentByMe: false,
    isOffer: true,
    gigTitle: 'I will be your content Writer for the website',
    profileName: 'Alex Hales',
    budgetType: 'Fixed',
    rate: 30,
    deliverablesData: [
      { name: 'Airplus Guideline', id: v4(), fileSize: '1.2mb', fileType: 'pdf' },
      { name: 'Airplus Guideline', id: v4(), fileSize: '1.2mb', fileType: 'word' },
    ],
  },
  {
    id: v4(),
    message: 'Cheerful cowboys make Jolly Ranchers',
    profileImg: '/',
    isSentByMe: false,
    profileName: 'John Evans',
  },
  {
    id: v4(),
    message: 'My fear of stairs is escalating',
    profileImg: '/',
    isSentByMe: true,
    profileName: 'Chris',
  },
  {
    id: v4(),
    message: 'Cheerful cowboys make Jolly Ranchers',
    profileImg: '/',
    isSentByMe: false,
    profileName: 'Lissan H',
  },
];
