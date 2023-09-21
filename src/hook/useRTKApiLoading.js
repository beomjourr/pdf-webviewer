import { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addRTKApiLoading, removeRTKApiLoading } from '../features/globalSlice';

function useRTKApiLoading(result) {
  const dispatch = useDispatch();
  const { isLoading, isFetching, endpointName, originalArgs } = result;
  const getSerial = useCallback(() => {
    let serial = endpointName;
    if (originalArgs) {
      serial += '?';
      Object.keys(originalArgs).map((key) => serial += key + '=' + originalArgs[key] + '&');
    }
    return serial;
  }, [endpointName, originalArgs]);

  useEffect(() => {
    if (isFetching !== undefined && endpointName !== undefined) {
      if (isLoading || isFetching) {
        dispatch(addRTKApiLoading(getSerial()));
      } else {
        dispatch(removeRTKApiLoading(getSerial()));
      }

      return () => {
        dispatch(removeRTKApiLoading(getSerial()));
      };
    }
  }, [dispatch, isLoading, isFetching, endpointName, originalArgs, getSerial]);
}

export default useRTKApiLoading;
