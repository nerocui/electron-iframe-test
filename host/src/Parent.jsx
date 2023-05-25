import { useCallback, useRef, useEffect } from "react";


const Parent = () => {
    const { ipcRenderer } = window.electron;
    const iframe = useRef();
    const ipcHandler = useCallback((message) => {
        console.log(message);
        if (message.name === "GET_SOURCES") {
            ipcRenderer.invoke("GET_SOURCES", {types: ['window', 'screen']})
                .then(sources => {
                    const message = {
                        name: "SET_SOURCES",
                        value: sources.map(src => ({ id: src.id}) )
                    };
                    if (iframe.current) {
                        iframe.current.contentWindow.postMessage(message, "*");
                    }
                })
        }
    }, []);
    useEffect(() => {
        window.addEventListener("message", (message) => ipcHandler(message.data));
    }, [])
    const refCb = useCallback(ref => {
        console.log(ref);
        iframe.current = document.createElement('iframe');
        iframe.current.allow = 'microphone; camera; display-capture';
        iframe.current.src = 'http://localhost:5000';
        iframe.current.style.flex = "1";
        iframe.current.style.border = "none";
        iframe.current.style.width = "100%";
        iframe.current.style.height = "100%";
        iframe.current.allowFullscreen = true;
        ref.appendChild(iframe.current);
    }, [])
    return (
        <div style={{ width: '100vw', height: '100vh' }} ref={refCb}>

        </div>
    )
}

export default Parent;