const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
  sizeUp: (id, amount) => ipcRenderer.invoke('prompt:sizeUp', id, amount),
  adopt: (id) => ipcRenderer.invoke('prompt:ready', id),
  formDone: (id, data) => ipcRenderer.invoke('prompt:formDone', id, data),
  cancel: (id) => ipcRenderer.invoke('prompt:cancel', id)
})