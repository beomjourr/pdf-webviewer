import { useEffect } from 'react';
import ActionTypes from '../constants/ActionTypes';
import MessageTypes from '../constants/MessageTypes';
import useAlert from './useAlert';

function useRTKApiError(result, message = null, errorFunc = null) {
  const { isError, error, isSuccess, data } = result;
  const { alert } = useAlert();

  const chkError = (data) => {
    if (data?.hasOwnProperty('code') && data?.code !== '200') {
      console.error('### API 호출은 성공했지만, 결과는 쓸수 없다. result.data=', data);
      return true;
    }

    return false;
  };

  useEffect(() => {
    if (isError || (isSuccess && chkError(data))) {
      try {
        console.log('error.data', error.data);
      } catch (e) {
        console.log(e);
      }

      const getMessage = () => {
        let msg = message || MessageTypes.ERROR_API_QUERY_DEF;

        try {
          msg += '<br>';
        } catch (e) {
          console.log(e);
        }

        return msg;
      };

      const showAlert = async () => {
        const isConfirmed = await alert({
          type: ActionTypes.MODAL_ALERT,
          message: getMessage(),
        });

        if (isConfirmed) if (errorFunc) errorFunc();
      };

      showAlert();
    }
    return () => {

    };
  }, [isError, error, isSuccess]);
}

export default useRTKApiError;
