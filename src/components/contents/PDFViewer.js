import React, { useState, useRef, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import file from '../../data/o_ssah402_01.pdf';
import 'swiper/css/zoom';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Zoom, Navigation, Pagination } from 'swiper/modules';
import ToolBar from '../common/ToolBar';
import { getChromeVersion }from '../../utils/utilFunction';

function PDFViewer() {
  const [numPages, setNumPages] = useState(null);
  const [isTwoPageView, setIsTwoPageView] = useState(false);
  const swiperRef = useRef(null);
  const [reactPdfModule, setReactPdfModule] = useState(null);
  const [isLoadWorker, setIsLoadWorker] = useState(false);
  const [initialSlideNum, setInitialSlideNum] = useState(0);

  useEffect(() => {
    console.log(getChromeVersion());
    // react 7.x 버전은 크롬 92버전부터 지원 (N형은 82.x)
    if (getChromeVersion() >= 92) {
      console.log('react-pdf 7.3.3 사용중');
      import('react-pdf').then(reactPdfModule => {
        setReactPdfModule(reactPdfModule);
        console.log(reactPdfModule);
      });
    } else {
      console.log('react-pdf 5.7.2 사용중');
      import('react-pdf-v5').then(reactPdfModule => {
        console.log(reactPdfModule);
        setReactPdfModule(reactPdfModule);
      });
    }
  }, []);

  useEffect(() => {
    if (reactPdfModule) {
      reactPdfModule.pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${reactPdfModule.pdfjs.version}/pdf.worker.js`;
      setIsLoadWorker(true);
    }
  }, [reactPdfModule]);



  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  return (
    <div className='viewer-container'>
      <ToolBar handlePageViewCnt={setIsTwoPageView} />
      {reactPdfModule && isLoadWorker &&
        (
          <reactPdfModule.Document
            file={file}
            onLoadSuccess={onDocumentLoadSuccess}
          >
            <Swiper
              slidesPerView={1}
              spaceBetween={isTwoPageView ? -500 : 0}
              slidesPerGroup={isTwoPageView ? 2 : 1}
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
              initialSlide={initialSlideNum}
            >
                {Array.from(new Array(numPages || 0), (el, index) => (
                  <SwiperSlide key={index} className={isTwoPageView ? 'two-view-mode' : ''}>
                    <div className="swiper-zoom-container">
                      <div className='swiper-zoom-target' style={{display: 'flex'}}>
                        <reactPdfModule.Page className="canvas-page" pageNumber={index + 1} renderAnnotationLayer={false} renderTextLayer={false} width={1000} />
                        {isTwoPageView && index < numPages - 1 && <reactPdfModule.Page className="canvas-page" pageNumber={index + 2} renderAnnotationLayer={false} renderTextLayer={false} width={1000} />}
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
            </Swiper>
          </reactPdfModule.Document>
        )
      }
    </div>
  );
}

export default PDFViewer;
