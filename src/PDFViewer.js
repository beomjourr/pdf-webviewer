import React, { useState, useRef } from 'react';
import { Document, Page } from 'react-pdf';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import file from './test3.pdf';
import 'swiper/css/zoom';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { nanoid } from 'nanoid'
import testImg from './heart2.jpg'

import { Zoom, Navigation } from 'swiper/modules';
function PDFViewer() {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [isTwoPageView, setIsTwoPageView] = useState(false);
  const swiperRef = useRef(null);

  const handleZoomChange = (scale) => {
    const swiper = swiperRef.current?.swiper;

    console.log('들어오는 기준은?')

    if (!swiper) return;

    if (swiper.zoom.scale <= 1) {
        // Content is zoomed in, so disable swiper
        swiper.allowSlideNext = false;
        swiper.allowSlidePrev = false;
    } else {
        // Content is zoomed out, so enable swiper
        swiper.allowSlideNext = true;
        swiper.allowSlidePrev = true;
    }
};

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  return (
    <div>
      <Document
        file={file}
        onLoadSuccess={onDocumentLoadSuccess}
      >
        <Swiper
          slidesPerView={1}
          spaceBetween={10}
          pagination={{ clickable: true }}
          onSlideChange={({ activeIndex }) => setPageNumber(activeIndex + 1)}
          zoom={true}
          onZoomChange={handleZoomChange}
          ref={swiperRef}
          modules={[Zoom, Navigation]}
        >
            {Array.from(new Array(numPages || 0), (el, index) => (
              <SwiperSlide key={nanoid()}>
                <div className="swiper-zoom-container">
                  <div className='swiper-zoom-target' style={{display: 'flex'}}>
                    <Page className="canvas-page" pageNumber={index + 1} renderAnnotationLayer={false} renderTextLayer={false}/>
                    {isTwoPageView && <Page className="canvas-page" pageNumber={index + 2} renderAnnotationLayer={false} renderTextLayer={false} />}
                  </div>
                </div>
              </SwiperSlide>
            ))}
        </Swiper>
        <p>Current Page: {pageNumber}</p>
        <button onClick={() => setIsTwoPageView(prev => !prev)}>
          Toggle {isTwoPageView ? 'Single' : 'Two'}-Page View
        </button>
      </Document>
    </div>
  );
}

export default PDFViewer;
