import { useDispatch } from 'react-redux';
import { onLoggedOut } from 'store/slices/authSlice';

// API HOOKS
import { useUpdateLogoutStatusMutation } from 'services/private/auth';

// CUSTOM HOOKS
import useGetGlobalAppContext from './useGetGlobalAppContext';

function useAuth() {
  const dispatch = useDispatch();
  const [updateLogoutStatus] = useUpdateLogoutStatusMutation();
  const { onlineSocket } = useGetGlobalAppContext();

  const handleLogout = async () => {
    await updateLogoutStatus();

    onlineSocket?.close();

    dispatch(onLoggedOut());
  };

  return { handleLogout };
}

export default useAuth;
