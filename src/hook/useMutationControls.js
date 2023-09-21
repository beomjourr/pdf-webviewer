import { useEffect } from 'react';
import MessageTypes from '../constants/MessageTypes';
import useRTKApiError from './useRTKApiError';
import useRTKApiLoading from './useRTKApiLoading';

function useMutationControls(result, successFunc = null) {
  useRTKApiLoading(result);

  useEffect(() => {
    if (result.isSuccess) {
      if (successFunc) successFunc();
    }
  }, [result.isSuccess]);

  useRTKApiError(result, MessageTypes.ERROR_API_MUTATION_DEF);
}

export default useMutationControls;
