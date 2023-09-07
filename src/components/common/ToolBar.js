import React from 'react';

const ToolBar = ({handlePageViewCnt}) => {

  const toggleTwoPageView = () => {
    console.log('toggleTwoPageView')
    handlePageViewCnt(2);
  };

  const toggleOnePageView = () => {
    console.log('toggleOnePageView');
    handlePageViewCnt(1);
  }


  return (
    <div className='toolbar-container'>
      <div className='toolbar-box'>
        <div className='toolbar-menulist'>
          <button onClick={toggleTwoPageView}>
            Toggle Two-Page View
          </button>
          <button onClick={toggleOnePageView}>
            Toggle One-Page View
          </button>
          {/* 리스트 div 영역 */}
        </div>
      </div>
    </div>
  );
};

export default ToolBar;