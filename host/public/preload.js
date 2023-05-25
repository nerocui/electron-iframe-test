// Preload script
const { contextBridge, ipcRenderer } = require("electron")

contextBridge.exposeInMainWorld("electron", {
  ipcRenderer: {
    send: (channel, data) => ipcRenderer.send(channel, data), // expose ipcRenderer.send
    on: (channel, func) => ipcRenderer.on(channel, (event, ...args) => func(...args)), // expose ipcRenderer.on
    invoke: (channel, data) => ipcRenderer.invoke(channel, data),
  }
})
