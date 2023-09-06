import React, { useEffect, useRef, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import TestPdf from '../../test3.pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`; 

const PdfContent = ({ pdfScale, handlePdfScale,  pageViewCnt, pageIndex, pdfPageCnt, handlePdfPageCnt }) => {

  const onDocumentLoadSuccess = ({ numPages }) => {
    console.log('onDocumentLoadSuccess', numPages)
    if (numPages) {
      handlePdfPageCnt(numPages);
    } else {
      console.log('numPages 없음!!!!')
    }
  };
  
  return (
    <Document
      file={TestPdf} // Replace with your PDF file path
      onLoadSuccess={onDocumentLoadSuccess}
      onLoadError={(e) => {console.log(e)}}
      loading="Loding...."
    >
      <div className={`page-container ${pageViewCnt === 2 ? 'two-page' : 'one-page'}`} onClick={() => {}}>
        <Page 
          // pageNumber={pageNumber}
          pageNumber={pageIndex}
          height={752}
          // width={pdfScale * 612} // Assuming standard PDF width
          // height={pdfScale * 700} // Assuming standard PDF height
          pdfScale={pdfScale}
          renderAnnotationLayer={false}
          renderTextLayer={false}
          // onMouseDown={handlePageMouseDown}
          // onMouseMove={handlePageMouseMove}
          // onMouseUp={handlePageMouseUp}
        />
        {pageViewCnt === 2 && pageIndex < pdfPageCnt  && (
          <Page 
            pageNumber={pageIndex + 1}
            // pageNumber={pageNumber + 1}
            height={752}
            // width={pdfScale * 612} // Assuming standard PDF width
            // height={pdfScale * 700} // Assuming standard PDF height
            pdfScale={pdfScale}
            renderAnnotationLayer={false}
            renderTextLayer={false}
            onLoadError= {(e) => {
                    
            }}
            // onMouseDown={handlePageMouseDown}
            // onMouseMove={handlePageMouseMove}
            // onMouseUp={handlePageMouseUp}
          />
        )}
      </div>
    </Document>
  );
};

export default PdfContent;