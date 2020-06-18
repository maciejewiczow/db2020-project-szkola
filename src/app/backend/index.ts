import dotenv from 'dotenv'
dotenv.config();

import { app, BrowserWindow } from "electron";
import isDev from "electron-is-dev";

import { InteropService } from '../common/services'

let window: BrowserWindow;

const createWindow = () => {
    window = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true
        }
    });

    if (isDev) {
        window.loadURL(`http://localhost:${process.env.FRONT_WEBPACK_PORT || 9080}`);
        window.webContents.openDevTools();
    }
    else
        window.loadFile("./public/index.html");

    InteropService.registerListeners();
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
