import logo from './logo.svg';
import './App.css';
import { useCallback, useEffect } from 'react';

function Child() {
    const onGetSources = useCallback(() => {
        console.log(window);
        window.ipcRenderer.invoke("GET_SOURCES", {
            types: ['window', 'screen']
      })
      .then(sources => {
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
      })
    }, []);
  
    return (
      <div>
        <button onClick={onGetSources}>Get Source</button>
      </div>
    );
  }
  
  export default Child;