import { v4 } from 'uuid';

export const sellerLevels = ['New Expert', 'Novice', 'Achiever', 'Nynx Choice'];

export const sellerLevelData = [
  {
    id: v4(),
    title: 'Inbox response time',
    min: '0',
    max: '100',
    value: 60,
    isIconDisabled: false,
  },
  {
    id: v4(),
    title: 'Selling seniority',
    min: '0',
    max: '120 days',
    value: 80,
    isIconDisabled: false,
  },
  {
    id: v4(),
    title: 'Order completion',
    min: '0',
    max: '100',
    value: 80,
    isIconDisabled: false,
  },
  {
    id: v4(),
    title: 'Orders',
    min: '0',
    max: '50',
    value: 90,
    isIconDisabled: false,
  },
];
