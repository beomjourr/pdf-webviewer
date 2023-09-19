import React, { useState, useEffect } from 'react';
import 'swiper/swiper-bundle.css';
import 'swiper/css/zoom';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import ToolBar from '../common/ToolBar';
import PDFViewer from './PDFViewer';
import { getChromeVersion } from '../../utils/utilFunction';

function PDFContainer() {
  const [isTwoPageView, setIsTwoPageView] = useState(false);
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
    console.log('reactPdfModule 나 바뀜')
  }, [reactPdfModule]);


  return (
    <div className='viewer-container'>
      <ToolBar handlePageViewCnt={setIsTwoPageView} />
      {reactPdfModule && isLoadWorker &&
        <PDFViewer
          reactPdfModule={reactPdfModule}
          isTwoPageView ={isTwoPageView}
          initialSlideNum={initialSlideNum}
        />
      }
    </div>
  );
}

export default PDFContainer;
