import React, { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useDispatch, useSelector } from 'react-redux';
import { Zoom, Navigation, Pagination, Scrollbar } from 'swiper/modules';
import 'swiper/swiper-bundle.css';
import 'swiper/css/zoom';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { updateIsGlobalLoading, updateIsTwoPageView } from '../../features/globalSlice';
 
function PDFViewer(props) {
  const dispatch = useDispatch();

  const pdfTotalPage = useSelector((state) => state.global.pdfTotalPage);
  const isTwoPageView = useSelector((state) => state.global.isTwoPageView);
  const initialSlideNum = useSelector((state) => state.global.initialSlideNum);
  const swiperRef = useRef(null);
  const renderSuccessCntRef = useRef(0);

  const getPdfPageComponent = (currentIndex) => {
    return (
      <props.reactPdfModule.Page
        className="canvas-page"
        pageNumber={currentIndex + 1}
        renderAnnotationLayer={false}
        renderTextLayer={false}
        onRenderSuccess={() => {
          renderSuccessCntRef.current++;
          if (renderSuccessCntRef.current >= pdfTotalPage - 1) {
            dispatch(updateIsGlobalLoading(false));
            renderSuccessCntRef.current = 0;
          }
        }}
        onLoadError={() => {alert('로드에러남', currentIndex)}}
        onRenderError={() => {
          alert('랜더에어남', currentIndex);
          dispatch(updateIsTwoPageView(!isTwoPageView));
        }}
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
              <div className='swiper-zoom-target'>
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
