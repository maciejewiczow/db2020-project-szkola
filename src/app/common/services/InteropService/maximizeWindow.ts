import { BrowserWindow } from "electron";
import { ipcRenderer, ipcMain} from "electron-better-ipc";

import { InteropEvents } from ".";

export const register = () => {
    ipcMain.answerRenderer<{}, void>(
        InteropEvents.maximize,
        (_, window) => {
            if (window.constructor.name === 'BrowserWindow')
                (window as unknown as BrowserWindow).maximize()
            if (window.constructor.name === 'BrowserView')
                BrowserWindow.fromBrowserView(window)?.maximize()
        }
    )
}

export const maximizeWindow = async () => await ipcRenderer.callMain(InteropEvents.maximize);

