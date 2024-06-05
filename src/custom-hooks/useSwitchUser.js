import { useDispatch, useSelector } from 'react-redux';
import { updateUserInfo } from 'store/slices/authSlice';
import { useSwitchUserMutation } from 'services/private/user';

function useSwitchUser() {
  const dispatch = useDispatch();

  // REDUX STATE
  const { userInfo } = useSelector(item => item.auth);

  // API HOOKS
  const [switchUser] = useSwitchUserMutation();

  const handleSwitchUser = async () => {
    const switchUserResp = await switchUser(!userInfo?.is_buyer);

    dispatch(updateUserInfo(switchUserResp.data));
  };

  return { handleSwitchUser };
}

export default useSwitchUser;
