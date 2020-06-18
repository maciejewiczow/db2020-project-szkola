import registerVerify from './verify'

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
    registerListeners
}

export { VerifyUserArgs } from "./verify";
