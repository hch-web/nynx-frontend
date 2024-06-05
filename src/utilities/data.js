import workspaceIcon from 'assets/workSpace.svg';
import profileSettingIcon from 'assets/profileSettingIcon.svg';
import groupChatIcon from 'assets/GroupChatIcon.svg';
import dashboardIcon from 'assets/dashboardIcon.svg';
import analyticsIcon from 'assets/analytics.svg';

import dashboardIconHover from 'assets/dashboardIconHover.svg';
import profileSettingIconHover from 'assets/profileSettingIconHover.svg';
import groupChatIconHover from 'assets/groupChatIconHover.svg';
import workspaceIconHover from 'assets/workspaceIconHover.svg';
import analyticsHoverIcon from 'assets/analytics-hover-icon.svg';

export const freelancerRoutes = [
  {
    name: 'dashboard',
    icon: dashboardIcon,
    route: '/portal/freelancer/dashboard',
    hoverIcon: dashboardIconHover,
    info: 'Dashboard',
  },
  {
    name: 'messages',
    icon: groupChatIcon,
    route: '/portal/freelancer/chat',
    hoverIcon: groupChatIconHover,
    info: 'Chats',
  },
  {
    name: 'workspaces',
    icon: workspaceIcon,
    route: '/portal/freelancer/workspace',
    hoverIcon: workspaceIconHover,
    info: 'Workspaces',
  },
  {
    name: 'profile',
    icon: profileSettingIcon,
    route: '/portal/freelancer/profile-setting',
    hoverIcon: profileSettingIconHover,
    info: 'Settings',
  },
  {
    name: 'analytics',
    icon: analyticsIcon,
    route: '/portal/freelancer/analytics',
    hoverIcon: analyticsHoverIcon,
    info: 'Analytics',
  },
];

export const clientRoutes = [
  {
    name: 'dashboard',
    icon: dashboardIcon,
    route: '/portal/client/dashboard',
    hoverIcon: dashboardIconHover,
    info: 'Dashboard',
  },
  {
    name: 'messages',
    icon: groupChatIcon,
    route: '/portal/client/chat',
    hoverIcon: groupChatIconHover,
    info: 'Chats',
  },
  {
    name: 'workspaces',
    icon: workspaceIcon,
    route: '/portal/client/workspace',
    hoverIcon: workspaceIconHover,
    info: 'Workspaces',
  },
  {
    name: 'profile',
    icon: profileSettingIcon,
    route: '/portal/client/profile-setting',
    hoverIcon: profileSettingIconHover,
    info: 'Settings',
  },
];
