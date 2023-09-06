import React, { useEffect, useRef, useState } from 'react';
import './App.css';
import ToolBar from './components/common/ToolBar';
import PdfContainer from './components/contents/PdfContainer';

function App() {
  const [pdfScale, setPdfScale] = useState(1);
  const [pdfPageCnt, setPdfPageCnt] = useState(1); //스와이프 페이지
  const [pageViewCnt, setPageViewCnt] = useState(1); //1쪽 보기, 2쪽 보기
  const [currentPageNum, setCurrentPageNum] = useState(1);

  const handlePageViewCnt = (newPageViewCnt) => {
    console.log('handlePageViewCnt', newPageViewCnt);
    setPageViewCnt(newPageViewCnt);
  }

  const handlePdfScale = (newPdfScale) => {
    console.log('handlePdfScale', newPdfScale);
    setPdfScale(newPdfScale);
  }

  const handlePdfPageCnt = (newPdfPageCnt) => {
    console.log('handlePdfPageCnt', newPdfPageCnt);
    setPdfPageCnt(newPdfPageCnt);
  }
  
  const handlePageChange = (newPageNumber) => {
    console.log('handlePageChange', newPageNumber)
    setCurrentPageNum(newPageNumber);
  };


  return (
    <div className='pdf-viewer-container'>
      <ToolBar handlePageViewCnt={handlePageViewCnt} />
      <PdfContainer pdfScale={pdfScale} pdfPageCnt={pdfPageCnt} pageViewCnt={pageViewCnt} currentPageNum={currentPageNum} handlePdfScale={handlePdfScale} handlePageChange={handlePageChange} handlePdfPageCnt={handlePdfPageCnt}/>
    </div>
  );
}

export default App;
