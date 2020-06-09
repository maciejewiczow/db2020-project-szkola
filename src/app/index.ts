import { app, BrowserWindow } from "electron";
import * as isDev from "electron-is-dev";

let window: BrowserWindow;

const createWindow = () => {
    window = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true
        }
    });

    if (isDev) {
        window.loadURL(`http://localhost:${process.env.FRONT_WEBPACK_PORT || 8080}`);
        window.webContents.openDevTools();
        // FIXME: can only be installed from render thread
        // require("electron-react-devtools").install()
        // require("electron-redux-devtools").install()
    }
    else
        window.loadFile("./public/index.html");
}

app.on('ready', createWindow)

app.on("window-all-closed", () => {
    if (process.platform !== "darwin")
        app.quit();
})

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0)
        createWindow()
})
