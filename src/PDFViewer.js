import React, { useState, useRef } from 'react';
import { Document, Page } from 'react-pdf';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import { usePinch } from '@use-gesture/react';
import file from './test3.pdf';

function PDFViewer() {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1);
  const [isTwoPageView, setIsTwoPageView] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const viewerRef = useRef(null);

  const MIN_SCALE = 1;
  const MAX_SCALE = 3;

  const bind = usePinch(({ da: [dX, dY], origin: [ox, oy], memo }) => {
    const newScale = Math.max(MIN_SCALE, Math.min(scale * (1 + dY / window.innerHeight), MAX_SCALE));

    const viewer = viewerRef.current;
    const rect = viewer.getBoundingClientRect();
    const originX = ox - rect.left - position.x;
    const originY = oy - rect.top - position.y;

    setPosition({
      x: position.x - (originX * newScale - originX),
      y: position.y - (originY * newScale - originY),
    });

    setScale(newScale);
    return { originX: ox, originY: oy };
  });

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  return (
    <div ref={viewerRef} {...bind()} style={{
      transform: `translate3d(${position.x}px, ${position.y}px, 0) scale(${scale})`,
      transformOrigin: '0 0',
      touchAction: 'none'
    }}>
      <Document
        file={file}
        onLoadSuccess={onDocumentLoadSuccess}
      >
        <Swiper
          slidesPerView={isTwoPageView ? 2 : 1}
          spaceBetween={10}
          pagination={{ clickable: true }}
          onSlideChange={({ activeIndex }) => setPageNumber(activeIndex + 1)}
        >
          {Array.from(new Array(numPages || 0), (el, index) => (
            <SwiperSlide key={index}>
              <Page pageNumber={index + 1} scale={scale} renderAnnotationLayer={false} renderTextLayer={false} />
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
