import { useCallback } from 'react';
import { useLocation } from 'react-router';

// styles
import styles from 'styles/portal/layout/sideBar.module.scss';
import { activeLink, unActiveLink } from 'styles/mui/portal/sidebar-styles';

function useGetSidebarUtils() {
  const { pathname } = useLocation();

  const isWorkspaceTaskDetails = item => {
    const isTaskDetails = item?.name === 'workspaces' && pathname?.includes('/portal/workspace');

    return isTaskDetails;
  };

  const getClassNameStyles = useCallback(
    (isActive, item, isClient) => {
      if (!isActive && isWorkspaceTaskDetails(item)) {
        return styles.activeIconBody;
      }

      if (isActive) {
        return styles.activeIconBody;
      }

      if (!isActive && isClient) {
        return styles.unActiveIconBody;
      }

      return styles.freelancerUnActiveIconBody;
    },
    [pathname]
  );

  const getActiveNavlinkStyles = useCallback(
    (isActive, item) => {
      const commonStyles = { backgroundPosition: 'center', backgroundRepeat: 'no-repeat' };

      if (!isActive && isWorkspaceTaskDetails(item)) {
        return { backgroundImage: `url(${item?.hoverIcon})`, ...commonStyles, ...activeLink };
      }

      if (isActive) {
        return { backgroundImage: `url(${item?.hoverIcon})`, ...commonStyles, ...activeLink };
      }

      return { backgroundImage: `url(${item?.icon})`, ...commonStyles, ...unActiveLink };
    },
    [pathname]
  );

  return { getClassNameStyles, getActiveNavlinkStyles };
}

export default useGetSidebarUtils;
