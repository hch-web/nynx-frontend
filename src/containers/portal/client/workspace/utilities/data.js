import { activeHeaderStyles, nonActiveHeaderStyles } from 'styles/mui/portal/workspace-styles';
import { v4 } from 'uuid';

export const workSpaceTableHeadData = [
  {
    title: 'titles',
    colSpan: '5',
    styles: activeHeaderStyles,
  },
  {
    title: 'tasks',
    colSpan: '2',
    styles: nonActiveHeaderStyles,
  },
  {
    title: 'budget',
    colSpan: '2',
    styles: nonActiveHeaderStyles,
  },
  {
    title: 'team',
    colSpan: '2',
    styles: nonActiveHeaderStyles,
  },
];

export const workspaceData = [
  {
    id: 1,
    title: 'Frontend Website Design Corrections in Wordpress and Logo Design',
    tasks: '4 Tasks Performed',
    taskDate: '1 Aug, 2020',
    budget: 'Budget £1500',
    status: 'Completed',
    team: [
      {
        imageUrl:
          'https://c4.wallpaperflare.com/wallpaper/586/603/742/minimalism-4k-for-mac-desktop-wallpaper-preview.jpg',
        name: 'A',
      },
      {
        imageUrl:
          'https://img.freepik.com/free-vector/colorful-palm-silhouettes-background_23-2148541792.jpg?w=2000',
        name: 'B',
      },
      {
        imageUrl: 'https://cdn.pixabay.com/photo/2021/11/13/23/06/tree-6792528__340.jpg',
        name: 'C',
      },
      {
        imageUrl: 'https://wallpaperaccess.com/full/84248.png',
        name: 'D',
      },
    ],
    hired: '2+ Hired',
    rating: 3.5,
    ratingDate: '1 Aug, 2020',
  },
  {
    id: 2,
    title: 'Frontend Website Design Corrections in Wordpress and Logo Design',
    tasks: '4 Tasks Performed',
    taskDate: '1 Aug, 2020',
    budget: 'Budget £1500',
    status: 'In Process',
    team: [
      {
        imageUrl:
          'https://c4.wallpaperflare.com/wallpaper/586/603/742/minimalism-4k-for-mac-desktop-wallpaper-preview.jpg',
        name: 'A',
      },
      {
        imageUrl:
          'https://img.freepik.com/free-vector/colorful-palm-silhouettes-background_23-2148541792.jpg?w=2000',
        name: 'B',
      },
      {
        imageUrl: 'https://cdn.pixabay.com/photo/2021/11/13/23/06/tree-6792528__340.jpg',
        name: 'C',
      },
      {
        imageUrl: 'https://wallpaperaccess.com/full/84248.png',
        name: 'D',
      },
    ],
    hired: '2+ Hired',
    rating: null,
    // ratingDate: '1 Aug, 2020',
  },
  {
    id: 3,
    title: 'Frontend Website Design Corrections in Wordpress and Logo Design',
    tasks: '4 Tasks Performed',
    taskDate: '1 Aug, 2020',
    budget: 'Budget £1500',
    status: 'Cancelled',
    team: [
      {
        imageUrl:
          'https://c4.wallpaperflare.com/wallpaper/586/603/742/minimalism-4k-for-mac-desktop-wallpaper-preview.jpg',
        name: 'A',
      },
      {
        imageUrl:
          'https://img.freepik.com/free-vector/colorful-palm-silhouettes-background_23-2148541792.jpg?w=2000',
        name: 'B',
      },
      {
        imageUrl: 'https://cdn.pixabay.com/photo/2021/11/13/23/06/tree-6792528__340.jpg',
        name: 'C',
      },
      {
        imageUrl: 'https://wallpaperaccess.com/full/84248.png',
        name: 'D',
      },
    ],
    hired: '2+ Hired',
    rating: 0,
    ratingDate: '1 Aug, 2020',
  },
];

export const workspaceBudgetCardsData = [
  {
    id: 0,
    budget: '$36,000',
    label: 'Active',
  },
  {
    id: 1,
    budget: '$0.00',
    label: 'Total Payments',
  },
];

export const workspaceJobsSkillsData = [
  {
    title: 'Need Logo and Business card for my company',
    tags: ['Logo Design', 'Business Card'],
    type: 'Adhoc',
    budget: '$120',
    time: '3 Days',
    isHired: false,
  },
  {
    title: 'I need Website Designer',
    tags: ['Website Designer'],
    type: 'Hourly',
    budget: '$15',
    time: '10h/week',
    isHired: false,
  },
  {
    title: 'I need Content Writer for website',
    tags: ['Content Writer'],
    type: 'Monthly',
    budget: '$500',
    time: '10 Month',
    isHired: true,
  },
];

export const fileIconData = [
  { type: 'pdf', size: '1.2mb', name: 'Airplus Guideline' },
  { type: 'css', size: '54kb', name: 'FureStibe requirements' },
  { type: 'doc', size: '8kb', name: 'FureStibe styles' },
  { type: 'img', size: '70mb', name: 'Wallpaper' },
];

export const freelancerInvitedTabPanelCardsData = [
  {
    id: 0,
    image:
      'https://static.independent.co.uk/s3fs-public/thumbnails/image/2018/02/26/19/img-1.jpg?quality=75&width=982&height=726&auto=webp',
    title: 'I will be your content writer for your website',
    rating: '4.9',
    reviews: '1596',
    tags: ['Content Writer'],
    profileImg:
      'https://media.istockphoto.com/photos/portrait-of-a-cheerful-young-man-smiling-picture-id523415383?b=1&k=20&m=523415383&s=170667a&w=0&h=zs9VtiYJVoK9Wjf0xcjSZ5EklKBAndlFGe9PBbOJNGM=',
    name: 'Sarah D',
    level: 'Top Rated',
    budget: '$500',
    time: '10 Month',
    isAccepted: true,
    contractType: 'Monthly',
    description:
      // eslint-disable-next-line max-len
      'Organize your thoughts with an outline. Heres the outlining strategy I use. I promise it works like a charm. Not only will it make writing your blog post easier, itll help you make your message Organize your thoughts with an outline. Heres the outlining strategy I use. I promise it works like a charm. Not only will it make writing your blog post easier, itll help you make your message Organize your thoughts with an outline. Heres the outlining strategy I use. I promise it works like a charm. Not only will it make writing your blog post easier.',
  },
  {
    id: 1,
    image:
      'https://static.independent.co.uk/s3fs-public/thumbnails/image/2018/02/26/19/img-1.jpg?quality=75&width=982&height=726&auto=webp',
    title: 'I will be graphics designer for your website',
    rating: '4.6',
    reviews: '1203',
    tags: ['Graphics Designer', 'UI/UX Designer'],
    profileImg:
      'https://media.istockphoto.com/photos/portrait-of-a-cheerful-young-man-smiling-picture-id523415383?b=1&k=20&m=523415383&s=170667a&w=0&h=zs9VtiYJVoK9Wjf0xcjSZ5EklKBAndlFGe9PBbOJNGM=',
    name: 'John S',
    level: 'Level-4',
    budget: '$1000',
    time: '1 Month',
    isAccepted: false,
    contractType: 'Fixed',
    description:
      // eslint-disable-next-line max-len
      'Organize your thoughts with an outline. Heres the outlining strategy I use. I promise it works like a charm. Not only will it make writing your blog post easier, itll help you make your message Organize your thoughts with an outline. Heres the outlining strategy I use. I promise it works like a charm. Not only will it make writing your blog post easier, itll help you make your message Organize your thoughts with an outline. Heres the outlining strategy I use. I promise it works like a charm. Not only will it make writing your blog post easier.',
  },
];

export const freelancerTeamCardsData = [
  {
    image: '/',
    name: 'Karina Clark',
    rating: 5.0,
    reviews: 1640,
    isOnline: true,
  },
  {
    image: '/',
    name: 'William Jack',
    rating: 4.6,
    reviews: 1202,
    isOnline: true,
  },
  {
    image: '/',
    name: 'John Sparrow',
    rating: 3.9,
    reviews: 970,
    isOnline: false,
  },
];

export const taskDetailsTableData = [
  {
    id: 1,
    name: 'Brad S',
    title: 'Need Logo and Business card for my company',
    tags: ['Logo Design', 'Brand Guideline'],
    time: '3 Days',
    contractType: 'Adhoc',
    date: 'Feb 6, 2022',
    budget: '$520',
    paymentStatus: 'Paid',
    rating: 5,
    taskStatus: 'Completed',
  },
  {
    id: 2,
    name: 'Lissan H',
    title: 'Frontend Website Design Corrections in Wordpress and Reactjs',
    tags: ['Website Development', 'Content Writing'],
    time: '5 Months',
    contractType: 'Monthly',
    date: 'Feb 6, 2022',
    budget: '$1,600',
    paymentStatus: 'Cancelled',
    rating: 0,
    taskStatus: 'Cancelled',
  },
  {
    id: 3,
    name: 'Faisal S',
    title: 'Need Logo and Business card for my company',
    tags: ['Logo Design', 'Brand Guideline'],
    time: '$20 Hours',
    contractType: 'Hourly',
    date: 'Feb 6, 2022',
    budget: '$14,000',
    paymentStatus: 'In Escrow',
    rating: 0,
    taskStatus: 'In Progress',
  },
];

export const tastDetailsRequirementsTabPanelData = [
  {
    id: 0,
    title: 'Please provide the breif?',
    description:
      // eslint-disable-next-line max-len
      'Organize your thoughts with an outline. Heres the outlining strategy I use. I promise it works like a charm. Not only will it make writing your blog post easier, itll help you make your message Organize your thoughts with an outline. Heres the outlining strategy I use. I promise it works like a charm. Not only will it make writing your blog post easier, itll help you make your message Organize your thoughts with an outline. Heres the outlining strategy I use. I promise it works like a charm. Not only will it make writing your blog post easier.',
    files: [
      {
        id: 0,
        fileName: 'Airplus Guideline',
        type: 'img',
        size: '1.2mb',
      },
      {
        id: 1,
        fileName: 'FureStibe requirements',
        type: 'doc',
        size: '8kb',
      },
      {
        id: 2,
        fileName: 'FureStibe styles',
        type: 'css',
        size: '54kb',
      },
    ],
  },
  {
    id: 1,
    title: 'Please provide the breif?',
    description:
      // eslint-disable-next-line max-len
      'Organize your thoughts with an outline. Heres the outlining strategy I use. I promise it works like a charm. Not only will it make writing your blog post easier, itll help you make your message Organize your thoughts with an outline. Heres the outlining strategy I use. I promise it works like a charm. Not only will it make writing your blog post easier, itll help you make your message Organize your thoughts with an outline. Heres the outlining strategy I use. I promise it works like a charm. Not only will it make writing your blog post easier.',
    files: [
      {
        id: 0,
        fileName: 'Airplus Guideline',
        type: 'pdf',
        size: '1.2mb',
      },
      {
        id: 1,
        fileName: 'FureStibe requirements',
        type: 'img',
        size: '8kb',
      },
      {
        id: 2,
        fileName: 'FureStibe styles',
        type: 'csv',
        size: '54kb',
      },
    ],
  },
];

export const activityChatsData = [
  {
    id: 1,
    message: 'Cheerful cowboys make Jolly Ranchers',
    profileImg: '/',
    isSentByMe: false,
    profileName: 'Lissan H',
  },
  {
    id: 2,
    message: 'Frontend Website Design Corrections in Wordpress and Logo Design',
    profileImg: '/',
    isSentByMe: false,
    profileName: 'Alex Hales',
  },
  {
    id: 3,
    message: 'Cheerful cowboys make Jolly Ranchers',
    profileImg: '/',
    isSentByMe: false,
    profileName: 'John Evans',
  },
  {
    id: 4,
    message: 'My fear of stairs is escalating',
    profileImg: '/',
    isSentByMe: true,
    profileName: 'Chris',
  },
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

export const taskDeliveryFeedbackData = [];
