import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  pdfTotalPage: 0,
  isTwoPageView: false,
  initialSlideNum: 0,
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
  },
});

export const {
  updatePdfTotalPage,
  updateIsTwoPageView,
  updateInitialSlideNum,
} = globalSlice.actions;

export default globalSlice.reducer;
