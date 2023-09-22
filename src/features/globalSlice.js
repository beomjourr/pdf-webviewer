import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  pdfTotalPage: 0,
  isTwoPageView: false,
  initialSlideNum: 0,
  isGlobalLoading: false,
};

const loadingsRTKObj = {};
const _addRTKApiLoading = (str) => {
  loadingsRTKObj[str] = true;
  return Object.keys(loadingsRTKObj).length;
};
const _removeRTKApiLoading = (str) => {
  if (loadingsRTKObj[str]) {
    delete loadingsRTKObj[str];
  }
  return Object.keys(loadingsRTKObj).length;
};

export const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    updatePdfTotalPage: (state, action) => {
      console.log('setPdfTotalPage', action.payload);
      Object.assign(state, { pdfTotalPage: action.payload });
    },
    updateIsTwoPageView: (state, action) => {
      console.log('updateIsTwoPageView', action.payload);
      Object.assign(state, { isTwoPageView: action.payload });
    },
    updateInitialSlideNum: (state, action) => {
      console.log('updateInitialSlideNum', action.payload);
      Object.assign(state, { initialSlideNum: action.payload });
    },
    updateIsGlobalLoading: (state, action) => {
      console.log('updateIsGlobalLoading', action.payload);
      Object.assign(state, { isGlobalLoading: action.payload });
    },
    addRTKApiLoading: (state, action) => {
      _addRTKApiLoading(action.payload);
      Object.assign(state, { isGlobalRTKApiLoading: true });
    },
    removeRTKApiLoading: (state, action) => {
      const totalRTKApiLoadings = _removeRTKApiLoading(action.payload);
      if (totalRTKApiLoadings === 0) {
        Object.assign(state, { isGlobalRTKApiLoading: false });
      }
    },
  },
});

export const {
  updatePdfTotalPage,
  updateIsTwoPageView,
  updateInitialSlideNum,
  updateIsGlobalLoading,
  addRTKApiLoading,
  removeRTKApiLoading,
} = globalSlice.actions;

export default globalSlice.reducer;
