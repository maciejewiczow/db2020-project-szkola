import { register as registerVerify, verifyUserCredentials} from './verifyUserCredentials'
import { register as registerMaximize, maximizeWindow } from "./maximizeWindow";

export enum InteropEvents {
    verifyCredentials = 'verify-credentials',
    maximize = 'maximize-window'
}

const registerListeners = () => {
    [
        registerVerify,
        registerMaximize
    ].forEach(reg => reg())
}

export default {
    InteropEvents,
    registerListeners,
    verifyUserCredentials,
    maximizeWindow
}

export { VerifyUserArgs } from "./verifyUserCredentials";
