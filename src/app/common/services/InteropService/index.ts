import { register as registerVerify, verifyUserCredentials} from './verifyUserCredentials'
import { register as registerMaximize, maximizeWindow } from "./maximizeWindow";
import { register as registerTimetable, getUserTimetable } from "./getUserTimetable";

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
