import { ipcRenderer, ipcMain} from "electron-better-ipc";

import { InteropEvents } from ".";
import { AuthService } from "../../../backend/services";
import { User } from "../../schema";

export interface VerifyUserArgs {
    email: string,
    password: string,
}

export const register = () => {
    ipcMain.answerRenderer<VerifyUserArgs, User>(
        InteropEvents.verifyCredentials,
        async ({email, password}) =>  await AuthService.verifyCredentials(email, password)
    )
}

export const verifyCredentials = async (email: string, password: string) => {
    console.log('Call from renderer')

    // FIXME: this works only because of a change in electron-better-ipc method!! Will break at next npm install
    return await ipcRenderer.callMain<VerifyUserArgs, User>(InteropEvents.verifyCredentials, {email, password});
}
