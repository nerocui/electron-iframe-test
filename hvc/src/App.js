import { useCallback, useEffect, useRef } from 'react';

function Child() {
  const videoElm = useRef();
  const handleSources = useCallback((sources) => {
    console.log(sources);
        navigator.mediaDevices.getUserMedia({
          audio: false,
          video: {
            mandatory: {
              chromeMediaSource: 'desktop',
              chromeMediaSourceId: sources[0].id,
              minWidth: 1280,
              maxWidth: 1280,
              minHeight: 720,
              maxHeight: 720
            }
          }
        })
        .then(stream => {
          console.log(stream);
          videoElm.current.srcObject = stream;
          try {
            videoElm.current.play();
          } catch (e){}
        })
  }, []);

  useEffect(() => {
    window.addEventListener('message', (e) => {
      console.log(e);
      if (e.origin === 'http://localhost:3000') {
        if (e.data.name === 'SET_SOURCES') {
          const sources = e.data.value;
          handleSources(sources);
        }
      }
    })
  }, [handleSources])

  const onGetSources = useCallback(() => {
    console.log(window);
    window.parent.postMessage({name: "GET_SOURCES" }, "*");
  }, []);
  
  return (
    <div>
      <button onClick={onGetSources}>Get Source</button>
      <video ref={videoElm}/>
    </div>
  );
}
  
export default Child;