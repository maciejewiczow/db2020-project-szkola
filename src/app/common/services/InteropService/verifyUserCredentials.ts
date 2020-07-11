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

export const verifyUserCredentials = async (email: string, password: string) =>
    await ipcRenderer.callMain<VerifyUserArgs, User>(InteropEvents.verifyCredentials, {email, password});
