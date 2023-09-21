import { useDispatch } from 'react-redux';
import { openModal } from '../features/globalSlice';
import types from '../constants/ActionTypes';

const conformResolveCallbackObj = {};
let conformKey = 1000;

function useConfirm() {
  const dispatch = useDispatch();

  const onConfirm = (cKey) => {
    conformResolveCallbackObj[cKey](true);
  };

  const onCancel = (cKey) => {
    conformResolveCallbackObj[cKey](false);
  };

  const confirm = (data) => {
    conformKey++;
    const obj = {};
    obj.data = data;
    obj.cKey = conformKey;
    obj.type = data.types || types.MODAL_CONFIRM;
    dispatch(openModal(obj));

    return new Promise((res, rej) => {
      conformResolveCallbackObj[conformKey] = res;
    });
  };

  return { confirm, onConfirm, onCancel };
}

export default useConfirm;
