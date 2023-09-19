import React, { useState, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import file from '../../data/o_ssah402_01.pdf';
import 'swiper/css/zoom';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Zoom, Navigation, Pagination } from 'swiper/modules';

function PDFViewer(props) {
  const [numPages, setNumPages] = useState(null);
  const swiperRef = useRef(null);

  const onDocumentLoadSuccess = ({ numPages }) => {
    console.log('onDocumentLoadSuccess');
    setNumPages(numPages);
  };

  return (
    <props.reactPdfModule.Document
      file={file}
      onLoadSuccess={onDocumentLoadSuccess}
    >
      <Swiper
        slidesPerView={1}
        spaceBetween={props.isTwoPageView ? -500 : 0}
        slidesPerGroup={props.isTwoPageView ? 2 : 1}
        pagination={{
          clickable: true
        }}
        navigation={{ clickable: true }}
        onSlideChange={({ activeIndex }) => {
          console.log(activeIndex);
        }}
        zoom={true}
        ref={swiperRef}
        modules={[Zoom, Navigation, Pagination]}
        initialSlide={props.initialSlideNum}
      >
          {Array.from(new Array(numPages || 0), (_, index) => (
            <SwiperSlide key={index} className={props.isTwoPageView ? 'two-view-mode' : ''}>
              <div className="swiper-zoom-container">
                <div className='swiper-zoom-target' style={{display: 'flex'}}>
                  <props.reactPdfModule.Page className="canvas-page" pageNumber={index + 1} renderAnnotationLayer={false} renderTextLayer={false} width={1000} />
                  {props.isTwoPageView && index < numPages - 1 && <props.reactPdfModule.Page className="canvas-page" pageNumber={index + 2} renderAnnotationLayer={false} renderTextLayer={false} width={1000} />}
                </div>
              </div>
            </SwiperSlide>
          ))}
      </Swiper>
    </props.reactPdfModule.Document>
  );
}

export default PDFViewer;
