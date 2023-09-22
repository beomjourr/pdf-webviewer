import { getInitVariables } from '../utils/InitVariableUtils';

const {
  apiUrl,
} = getInitVariables();

const getPath = {
  GET_Dictionary_INFO: `${apiUrl}/homework/DicEssenceStart.json`, // 기초학력 진단평가 목록
};

export default Object.assign(getPath);
