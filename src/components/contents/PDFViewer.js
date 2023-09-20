import React, { useState, useRef, useEffect} from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import 'swiper/css/zoom';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Zoom, Navigation, Pagination, Scrollbar } from 'swiper/modules';
import { getInitVariables } from '../../utils/InitVariableUtils';

function PDFViewer(props) {
  const [numPages, setNumPages] = useState(null);
  const swiperRef = useRef(null);

  const onDocumentLoadSuccess = ({ numPages }) => {
    console.log('onDocumentLoadSuccess');
    setNumPages(numPages);
  };

  useEffect(() => {
    if (numPages) {
      const pdfDocument = document.querySelector('.react-pdf__Document');

      if (!pdfDocument) return;

      pdfDocument.addEventListener('click', function(e) {
        if (e.target.closest('.swiper-scrollbar')) {
          return;
        }

        const swiperScrollbar = document.querySelector('.swiper-scrollbar');
        const swiperPagination = document.querySelector('.swiper-pagination');
        const toolbarBox = document.querySelector('.toolbar-container');
  
        console.log(toolbarBox, swiperScrollbar, swiperPagination)
        if (toolbarBox && swiperScrollbar && swiperPagination) {
          if (toolbarBox.classList.contains('active') &&swiperScrollbar.classList.contains('active') && swiperPagination.classList.contains('active')) {
            toolbarBox.classList.remove('active');
            swiperScrollbar.classList.remove('active');
            swiperPagination.classList.remove('active');
          } else {
            toolbarBox.classList.add('active');
            swiperScrollbar.classList.add('active');
            swiperPagination.classList.add('active');
          }
        }
      })
    }
  }, [numPages])

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
    <props.reactPdfModule.Document
      file={{ url: getInitVariables().file_url }}
      onLoadSuccess={onDocumentLoadSuccess}
    >
      <Swiper
        slidesPerView={1}
        spaceBetween={props.isTwoPageView ? -500 : 0}
        slidesPerGroup={props.isTwoPageView ? 2 : 1}
        pagination={{
          type: 'fraction',
        }}
        navigation={{ clickable: true }}
        onSlideChange={({ activeIndex }) => {
          console.log(activeIndex);
        }}
        zoom={true}
        ref={swiperRef}
        modules={[Zoom, Navigation, Pagination, Scrollbar]}
        initialSlide={props.initialSlideNum}
        scrollbar= {{
          draggable: true,
          clickable: true,
        }}
      >
          {Array.from(new Array(numPages || 0), (_, index) => (
            <SwiperSlide key={index} className={props.isTwoPageView ? 'two-view-mode' : ''}>
              <div className="swiper-zoom-container">
                <div className='swiper-zoom-target' style={{display: 'flex'}}>
                  {getPdfPageComponent(index)}
                  {props.isTwoPageView && index < numPages - 1 && getPdfPageComponent(index+1) }
                </div>
              </div>
            </SwiperSlide>
          ))}
      </Swiper>
    </props.reactPdfModule.Document>
  );
}

export default React.memo(PDFViewer);
