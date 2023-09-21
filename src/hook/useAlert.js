import { useDispatch } from 'react-redux';
import { openModal } from '../features/globalSlice';
import types from '../constants/ActionTypes';

const alertResolveCallbackObj = {};
let alertKey = 1000;

function useAlert() {
  const dispatch = useDispatch();

  const onConfirm = (cKey) => {
    if (alertResolveCallbackObj[cKey]) {
      alertResolveCallbackObj[cKey](true);
    }
  };

  const alert = (data) => {
    alertKey++;
    const obj = {};
    obj.data = data;
    obj.cKey = alertKey;
    obj.type = data.type || types.MODAL_ALERT;
    console.log('alert ---------- type=------------', obj.type);
    dispatch(openModal(obj));

    return new Promise((res, rej) => {
      alertResolveCallbackObj[alertKey] = res;
    });
  };

  return { alert, onConfirm };
}

export default useAlert;
