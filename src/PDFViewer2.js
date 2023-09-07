import React, { useState } from 'react';
import { Document, Page } from 'react-pdf';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import { usePinch } from '@use-gesture/react';
import file from './test3.pdf';

function PDFViewer() {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1);
  const [isTwoPageView, setIsTwoPageView] = useState(false);  // Two-page view state
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const bind = usePinch(({ da: [dX, dY], origin: [ox, oy], memo }) => {
    const newScale = scale * (1 + dY / window.innerHeight);
    setScale(newScale);
  
    const originX = ox - position.x;
    const originY = oy - position.y;
  
    setPosition({
      x: position.x - (originX * newScale - originX),
      y: position.y - (originY * newScale - originY)
    });
  
    return { originX: ox, originY: oy };
  });

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  return (
    <div
      {...bind()}
      style={{
        touchAction: 'none',
        transform: `translate3d(${position.x}px, ${position.y}px, 0) scale(${scale})`,
        transformOrigin: 'center',
      }}
    >
      <Document
        file={file}
        onLoadSuccess={onDocumentLoadSuccess}
      >
        <Swiper
          slidesPerView={isTwoPageView ? 2 : 1}  // Dynamic slide view based on the state
          spaceBetween={10}
          pagination={{ clickable: true }}
          onSlideChange={({ activeIndex }) => setPageNumber(activeIndex + 1)}
        >
          {Array.from(new Array(numPages || 0), (el, index) => (
            <SwiperSlide key={index}>
              <div style={{ transform: `scale(${scale})`, transformOrigin: '0 0' }}>
                <Page pageNumber={index + 1} renderAnnotationLayer={false} renderTextLayer={false} scale={1} />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <p>Current Page: {pageNumber}</p>
        {/* Toggle button for two-page view */}
        <button onClick={() => setIsTwoPageView(prev => !prev)}>
          Toggle {isTwoPageView ? 'Single' : 'Two'}-Page View
        </button>
      </Document>
    </div>
  );
}

export default PDFViewer;

