import { register as registerVerify, verifyCredentials} from './verify'

export enum InteropEvents {
    verifyCredentials = 'verify-credentials'
}

const registerListeners = () => {
    [
        registerVerify
    ].forEach(reg => reg())
}

export default {
    InteropEvents,
    registerListeners,
    verifyCredentials
}

export { VerifyUserArgs } from "./verify";
