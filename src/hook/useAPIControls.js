import useGlobalEvent from './useGlobalEvent';
import useRTKApiError from './useRTKApiError';
import useRTKApiLoading from './useRTKApiLoading';

function useAPIControls(result) {
  console.log('result', result);
  useRTKApiLoading(result);
  useRTKApiError(result);
  useGlobalEvent('resume', result.refetch);
}

export default useAPIControls;
