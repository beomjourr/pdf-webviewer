import React, { useState, useRef } from 'react';
import { Document, Page } from 'react-pdf';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import file from './test3.pdf';
import 'swiper/css/zoom';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { nanoid } from 'nanoid'

import { Zoom, Navigation } from 'swiper/modules';
function PDFViewer() {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [isTwoPageView, setIsTwoPageView] = useState(false);
  const swiperRef = useRef(null);

  const handleZoomChange = (scale) => {
    const swiper = swiperRef.current?.swiper;
    console.log('fkfkfkf')

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
        <Swiper
          slidesPerView={isTwoPageView ? 2 : 1}
          spaceBetween={10}
          pagination={{ clickable: true }}
          onSlideChange={({ activeIndex }) => setPageNumber(activeIndex + 1)}
          zoom={true}
          onZoomChange={handleZoomChange}
          ref={swiperRef}
          modules={[Zoom, Navigation]}
        >
            <SwiperSlide>
              <div className="swiper-zoom-container">

              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="swiper-zoom-container">
                <div className='test-flex'>
                  <div className='test-1'>
                    안녕하세요
                  </div>
                  <div className='test-2'>
                    안녕하세요222222
                  </div>
                </div>
              </div>
            </SwiperSlide>
        </Swiper>
        <p>Current Page: {pageNumber}</p>
        <button onClick={() => setIsTwoPageView(prev => !prev)}>
          Toggle {isTwoPageView ? 'Single' : 'Two'}-Page View
        </button>
    </div>
  );
}

export default PDFViewer;
