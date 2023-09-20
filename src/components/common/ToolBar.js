import React from 'react';
import { getInitVariables } from '../../utils/InitVariableUtils';

const ToolBar = ({handlePageViewCnt}) => {

  const toggleTwoPageView = () => {
    console.log('toggleTwoPageView')
    handlePageViewCnt(true);
  };

  const toggleOnePageView = () => {
    console.log('toggleOnePageView');
    handlePageViewCnt(false);
  }


  return (
    <div className='toolbar-container'>
      <div className='toolbar-box'>
        <div className='toolbar-subject-info'>
          {getInitVariables().order_nm + ' | ' + getInitVariables().study_course_nm}
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