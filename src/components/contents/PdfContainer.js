import React, { useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/zoom';
import PdfContent from './PdfContent';

const PdfContainer = ({pdfScale, pdfPageCnt, pageViewCnt, currentPageNum, handlePdfScale, handlePageChange, handlePdfPageCnt}) => {

  const [swiper, setSwiper] = useState(null); // Create a state to store the Swiper instance

  const swiperRef = useRef(null);

  useEffect(() => {
    if (swiper) {
      console.log('currentPageNum', currentPageNum)
      // swiper.slideTo(pageViewCnt ? Math.floor(currentPageNum / 2) : (Math.max(1, currentPageNum) - 1)); // Use slideTo instead of slideToLoop
  }  }, [pageViewCnt])

  /////////////////

  const handleSlideChange = (swiper) => {
    // Perform actions when the active slide changes
    console.log('Slide changed', swiper);
    if (swiper.previousIndex > swiper.activeIndex) {
      handlePageChange(Math.max(1, currentPageNum - pageViewCnt))
    } else {
      handlePageChange(Math.min(pdfPageCnt, currentPageNum + pageViewCnt))
    }
  };

  const PdfPageListElem = () => {

    const pdfPageList = [];

    let index = 100;

    console.log('pdfPageCnt', pdfPageCnt)
  
    for (let i = 1; i <= pdfPageCnt; i = i + pageViewCnt) {
      pdfPageList.push(
        <SwiperSlide key={index} style={{maxWidth: '100%'}}>
          <PdfContent pdfScale={pdfScale} handlePdfScale={handlePdfScale} pageViewCnt={pageViewCnt} pageIndex={i} pdfPageCnt={pdfPageCnt} handlePdfPageCnt={handlePdfPageCnt}/>
        </SwiperSlide>
      )
      index++; 
    }
    console.log(pdfPageList)

    return pdfPageList;
  }

  const onTouchStartHanlder = (e) => {
    console.log(e);
  }


  
  return (
    <div className="pdf-viewer" onTouchStart={onTouchStartHanlder}>
      <Swiper
        ref={swiperRef}
        onSwiper={(swiper) => setSwiper(swiper)}
        slidesPerView={1}
        pagination={{ clickable: true }}
        onSlideChange={handleSlideChange}
      >
        {PdfPageListElem()}
      </Swiper>
    </div>
  )
};

export default PdfContainer;