import { ipcMain, ipcRenderer } from "electron-better-ipc";

import { register as registerVerify, verifyUserCredentials} from './verifyUserCredentials'
import { register as registerMaximize, maximizeWindow } from "./maximizeWindow";
import { register as registerTimetable, getUserTimetable } from "./getUserTimetable";

// temporary library bug fix, see https://github.com/sindresorhus/electron-better-ipc/issues/35
ipcMain?.addListener('fix-event-798e09ad-0ec6-5877-a214-d552934468ff', () => {});
ipcRenderer?.addListener('fix-event-79558e00-29ef-5c7f-84bd-0bcd9a0c5cf3', () => {});

export enum InteropEvents {
    verifyCredentials = 'verify-credentials',
    maximize = 'maximize-window',
    getUserTimetable = 'get-user-timetable'
}

const registerListeners = () => {
    [
        registerVerify,
        registerMaximize,
        registerTimetable
    ].forEach(reg => reg())
}

export default {
    InteropEvents,
    registerListeners,
    verifyUserCredentials,
    maximizeWindow,
    getUserTimetable
}

export { VerifyUserArgs } from "./verifyUserCredentials";
