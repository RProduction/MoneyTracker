import { ipcRenderer, contextBridge } from "electron";

declare global {
  interface Window {
    api: {
      minimize: () => void;
      maximize: () => void;
      close: () => void;
    }
  }
}

contextBridge.exposeInMainWorld('api', {
  minimize: () => {
    ipcRenderer.send("minimize");
    console.log("req minimize");
  },
  maximize: () => {
    ipcRenderer.send("maximize");
    console.log("req maximize");
  },
  close: () => {
    ipcRenderer.send("close");
    console.log("req close");
  }
});

ipcRenderer.on("log", (ev, args) => {
  console.log(args);
})