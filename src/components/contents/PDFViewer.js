import React, { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useSelector } from 'react-redux';
import { Zoom, Navigation, Pagination, Scrollbar } from 'swiper/modules';
import 'swiper/swiper-bundle.css';
import 'swiper/css/zoom';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
 
function PDFViewer(props) {
  const pdfTotalPage = useSelector((state) => state.global.pdfTotalPage);
  const isTwoPageView = useSelector((state) => state.global.isTwoPageView);
  const initialSlideNum = useSelector((state) => state.global.initialSlideNum);
  const swiperRef = useRef(null);

  const getPdfPageComponent = (currentIndex) => {
    return (
      <props.reactPdfModule.Page
        className="canvas-page"
        pageNumber={currentIndex + 1}
        renderAnnotationLayer={false}
        renderTextLayer={false}
        onRenderSuccess={() => {console.log('랜더 성공', currentIndex)}}
        width={1000}
      />
    )
  }

  return (
    <Swiper
      slidesPerView={1}
      spaceBetween={isTwoPageView ? -500 : 0}
      slidesPerGroup={isTwoPageView ? 2 : 1}
      pagination={{
        type: 'fraction',
      }}
      navigation={{ clickable: true }}
      zoom={true}
      ref={swiperRef}
      modules={[Zoom, Navigation, Pagination, Scrollbar]}
      initialSlide={initialSlideNum}
      scrollbar= {{
        draggable: true,
        clickable: true,
      }}
    >
        {Array.from(new Array(isTwoPageView ? pdfTotalPage - 1 : pdfTotalPage || 0), (_, index) => (
          <SwiperSlide key={index} className={isTwoPageView ? 'two-view-mode' : ''}>
            <div className="swiper-zoom-container">
              <div className='swiper-zoom-target' style={{display: 'flex'}}>
                {getPdfPageComponent(index)}
                {isTwoPageView && index + 1 < pdfTotalPage && getPdfPageComponent(index + 1) }
              </div>
            </div>
          </SwiperSlide>
        ))}
    </Swiper>
  );
}

export default React.memo(PDFViewer);
