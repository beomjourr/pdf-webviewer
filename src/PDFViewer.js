import React, { useState, useRef } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import file from './test3.pdf';
import 'swiper/css/zoom';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Zoom, Navigation } from 'swiper/modules';
import ToolBar from './components/common/ToolBar';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`; 

function PDFViewer() {
  const [numPages, setNumPages] = useState(null);
  const [isTwoPageView, setIsTwoPageView] = useState(false);
  const swiperRef = useRef(null);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  return (
    <div className='viewer-container'>
      <ToolBar handlePageViewCnt={setIsTwoPageView} />
      <Document
        file={file}
        onLoadSuccess={onDocumentLoadSuccess}
      >
        <Swiper
          slidesPerView={1}
          spaceBetween={10}
          slidesPerGroup={2}
          pagination={{ clickable: true }}
          onSlideChange={({ activeIndex }) => {
            console.log(activeIndex);
          }}
          zoom={true}
          ref={swiperRef}
          modules={[Zoom, Navigation]}
        >
            {Array.from(new Array(numPages || 0), (el, index) => (
              <SwiperSlide key={index} className={isTwoPageView ? 'two-view-mode' : ''}>
                <div className="swiper-zoom-container">
                  <div className='swiper-zoom-target' style={{display: 'flex'}}>
                    <Page className="canvas-page" pageNumber={index + 1} renderAnnotationLayer={false} renderTextLayer={false} width={1000} />
                    {isTwoPageView && <Page className="canvas-page" pageNumber={index + 2} renderAnnotationLayer={false} renderTextLayer={false} width={1000} />}
                  </div>
                </div>
              </SwiperSlide>
            ))}
        </Swiper>
      </Document>
    </div>
  );
}

export default PDFViewer;
