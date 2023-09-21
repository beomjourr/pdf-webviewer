import { useEffect } from 'react';

function useGlobalEvent(eventString, func, capture = false, debug = false) {
  useEffect(() => {
    if (debug && eventString === 'loadCompleteInitVaiables') {
      console.log('----useGlobalEvent useEffect add----');
    }
    setTimeout(() => {
      if (debug && eventString === 'loadCompleteInitVaiables') {
        console.log('----useGlobalEvent useEffect add timeout----');
      }
      document.addEventListener(eventString, func, capture);
    }, 0);

    return () => {
      if (debug && eventString === 'loadCompleteInitVaiables') {
        console.log('----useGlobalEvent useEffect remove----');
      }

      setTimeout(() => {
        if (debug && eventString === 'loadCompleteInitVaiables') {
          console.log('----useGlobalEvent useEffect remove timeout----');
        }

        document.removeEventListener(eventString, func, capture);
      }, 0);
    };
  }, [eventString, func, capture]);

  const dispatchGlobalEvent = (eventString, params = {}) => {
    const event = new Event(eventString, {});
    document.dispatchEvent(event);
  };

  return dispatchGlobalEvent;
}

export default useGlobalEvent;
