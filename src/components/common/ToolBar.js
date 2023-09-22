import React from 'react';
import { initVariables } from '../utils/Global';
import { useDispatch } from 'react-redux';
import { updateIsTwoPageView } from '../../features/globalSlice';

const ToolBar = () => {
  const dispatch = useDispatch();

  const toggleTwoPageView = () => {
    console.log('toggleTwoPageView')
    dispatch(updateIsTwoPageView(true));
  };

  const toggleOnePageView = () => {
    console.log('toggleOnePageView');
    dispatch(updateIsTwoPageView(false));
  }


  return (
    <div className='toolbar-container'>
      <div className='toolbar-box'>
        <div className='toolbar-subject-info'>
          {initVariables?.order_nm + ' | ' + initVariables?.study_course_nm}
        </div>
        <div className='toolbar-menulist'>
          <button onClick={toggleTwoPageView}>
            Two-Page View
          </button>
          <button onClick={toggleOnePageView}>
            One-Page View
          </button>
          {/* 리스트 div 영역 */}
        </div>
      </div>
    </div>
  );
};

export default ToolBar;