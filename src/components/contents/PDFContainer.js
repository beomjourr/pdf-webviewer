import React, { useState, useEffect } from 'react';
import 'swiper/swiper-bundle.css';
import 'swiper/css/zoom';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { getChromeVersion } from '../../utils/utilFunction';
import { useDispatch, useSelector } from 'react-redux';
import { updateIsGlobalLoading, updatePdfTotalPage } from '../../features/globalSlice';
import { getInitVariables } from '../../utils/InitVariableUtils';
import PDFViewer from './PDFViewer';

function PDFContainer() {
  const dispatch = useDispatch();
  const initVariables = getInitVariables();

  const [reactPdfModule, setReactPdfModule] = useState(null);
  const [isLoadWorker, setIsLoadWorker] = useState(false);
  const pdfTotalPage = useSelector((state) => state.global.pdfTotalPage);

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

  useEffect(() => {
    if (pdfTotalPage) {
      const pdfDocument = document.querySelector('.react-pdf__Document');

      if (!pdfDocument) return;
    
      pdfDocument.addEventListener('click', (e) => onClickPdfDocument(e))

      return (() => {
        pdfDocument.removeEventListener('click', (e) => onClickPdfDocument(e))
      })
    }
  }, [pdfTotalPage])

  const onDocumentLoadSuccess = ({ numPages }) => {
    console.log('onDocumentLoadSuccess');
    dispatch(updatePdfTotalPage(numPages));
    dispatch(updateIsGlobalLoading(true));
  };

  const onClickPdfDocument = (e) => {
    if (!e) return;
    if (e.target.closest('.swiper-scrollbar')) {
      return;
    }

    const swiperScrollbar = document.querySelector('.swiper-scrollbar');
    const swiperPagination = document.querySelector('.swiper-pagination');
    const toolbarBox = document.querySelector('.toolbar-container');

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
  }

  return (
    <div className='viewer-container'>
      {reactPdfModule && isLoadWorker &&
        <reactPdfModule.Document
          file={{ url: initVariables.file_url }}
          onLoadSuccess={onDocumentLoadSuccess}
          loading=""
        >
          <PDFViewer reactPdfModule={reactPdfModule} />
        </reactPdfModule.Document>
      }
    </div>
  );
}

export default React.memo(PDFContainer);
