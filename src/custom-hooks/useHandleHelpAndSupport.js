// API HOOKS
import { useZendexHelpAndSupportMutation } from 'services/private/contact-us/contactUs';

function useHandleHelpAndSupport() {
  const [requestZendexUrl, { isLoading, data: response }] = useZendexHelpAndSupportMutation();

  const handleRequestZendexUrl = async () => {
    const { data } = await requestZendexUrl();

    window.open(data.url, '_blank');
  };

  return { handler: handleRequestZendexUrl, isLoading, response };
}

export default useHandleHelpAndSupport;
