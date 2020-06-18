import { ipcMain as ipc } from "electron-better-ipc";
import { InteropEvents } from ".";
import { User } from "../../schema";
import { AuthService } from "..";

export interface VerifyUserArgs {
    email: string,
    password: string,
}

const register = () => {
    ipc.answerRenderer<VerifyUserArgs, User | Error>(
        InteropEvents.verifyCredentials,
        async ({email, password}) => await AuthService.verifyCredentials(email, password)
    )
}

export default register;
