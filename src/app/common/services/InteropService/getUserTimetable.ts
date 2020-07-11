import { ipcRenderer, ipcMain} from "electron-better-ipc";

import { InteropEvents } from ".";
import { QueryResult } from "../../../backend/services/DatabaseService";
import { DatabaseService } from "../../../backend/services";

export const register = () => {
    ipcMain.answerRenderer<number, QueryResult<any>>(
        InteropEvents.getUserTimetable,
        async (userId) => await DatabaseService.getUserTimetable(userId)
    )
}

export const getUserTimetable = async (userId: number) =>
    await ipcRenderer.callMain<number, QueryResult<any>>(InteropEvents.getUserTimetable, userId);

