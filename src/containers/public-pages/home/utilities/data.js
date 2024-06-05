import teamCard4 from 'assets/how-it-works-clients-1.png';

import cardImg1 from 'assets/card-img-1.png';
import cardImg2 from 'assets/card-img-2.png';
import cardImg3 from 'assets/card-img-3.png';
import cardImg4 from 'assets/card-img-4.png';
import cardImg5 from 'assets/card-img-5.png';

export const teamsCardData = [
  {
    id: Math.random(),
    image: teamCard4,
    titleBefore: 'Create Your',
    titleAfter: 'Workspace',
    description:
      'Post a request, Send invitations or hire experts directly from Skill-sets by creating workspace',
  },
  {
    id: Math.random(),
    image: teamCard4,
    titleBefore: 'Build your Team',
    titleAfter: 'of Freelancers',
    description:
      'Within your workspace you can invite freelancers to quote on your project,  collaborate on the workflow, and assign and manage tasks.',
  },
  {
    id: Math.random(),
    image: teamCard4,
    titleBefore: 'Pay when you’re',
    titleAfter: 'Satisfied',
    description: 'Get quality work completed efficiently by your team and make secure payment for each task',
  },
];

export const categoriesContainerData = [
  {
    title: 'Brand Design',
    image: cardImg1,
    id: Math.random().toFixed(2),
  },
  {
    title: 'Social Media Marketing',
    image: cardImg2,
    id: Math.random().toFixed(2),
  },
  {
    title: 'Presentation Design',
    image: cardImg3,
    id: Math.random().toFixed(2),
  },
  {
    title: 'Web Design',
    image: cardImg4,
    id: Math.random().toFixed(2),
  },
  {
    title: 'Graphics Design',
    image: cardImg5,
    id: Math.random().toFixed(2),
  },
  {
    title: 'Mern App',
    image: cardImg4,
    id: Math.random().toFixed(2),
  },
  {
    title: 'ReactJs App',
    image: cardImg3,
    id: Math.random().toFixed(2),
  },
];
