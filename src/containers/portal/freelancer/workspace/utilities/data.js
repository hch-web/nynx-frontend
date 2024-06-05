import { v4 } from 'uuid';
import { activeHeaderStyles, nonActiveHeaderStyles } from 'styles/mui/portal/workspace-styles';

export const WorkSpaceTableHeadData = [
  {
    title: 'Workspaces',
    colSpan: '5',
    styles: activeHeaderStyles,
  },
  {
    title: 'budget',
    colSpan: '3',
    styles: nonActiveHeaderStyles,
  },
  {
    title: 'time',
    colSpan: '2',
    styles: nonActiveHeaderStyles,
  },
  {
    title: 'status',
    colSpan: '2',
    styles: nonActiveHeaderStyles,
  },
];

export const workspaceBudgetCardsData = [
  {
    id: 0,
    budget: '$36,000',
    label: 'Estimated Budget',
  },
  {
    id: 1,
    budget: '$0.00',
    label: 'In Escrow',
  },
  {
    id: 2,
    budget: '$36,000',
    label: 'Estimated Budget',
  },
  {
    id: 3,
    budget: '$22,300',
    label: 'Tasks Paid',
  },
];

export const freelancerWorkspaceBudgetCardsData = [
  {
    id: 0,
    budget: '$78.00',
    label: 'Active',
  },
  {
    id: 1,
    budget: '$642',
    label: 'Total Payments',
  },
];

export const freelancerTasksTableHeadData = [
  {
    title: 'Tasks',
    colSpan: '5',
    styles: activeHeaderStyles,
  },
  {
    title: 'budget',
    colSpan: '2',
    styles: nonActiveHeaderStyles,
  },
  {
    title: 'time',
    colSpan: '2',
    styles: nonActiveHeaderStyles,
  },
  {
    title: 'status',
    colSpan: '2',
    styles: nonActiveHeaderStyles,
  },
];

export const deliverables = [
  {
    id: v4(),
    name: 'Avonica Tech Req',
    type: 'pdf',
    sent: '07:02:2021',
  },
  {
    id: v4(),
    name: '9 Degree CRUD Req',
    type: 'doc',
    sent: '07:02:2021',
  },
  {
    id: v4(),
    name: 'User CRUD Styles',
    type: 'css',
    sent: '05:02:2021',
  },
  {
    id: v4(),
    name: 'Craft Logo',
    type: 'ai',
    sent: '07:02:2021',
  },
  {
    id: v4(),
    name: 'Orders backup',
    type: 'sql',
    sent: '04:02:2021',
  },
];
