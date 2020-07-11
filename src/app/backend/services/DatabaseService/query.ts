import { FieldInfo } from "mysql";
import { User } from "../../../common/schema";
import { render as tokenize } from "mustache";

import database from './connect'

import {
    getUserByEmail as getUserQueryString ,
    getTimetableByUserID
} from "../../../../sql/queries.json";

export interface QueryResult<T = any> {
    fields: FieldInfo[]
    results: T[]
}

export async function getUserByEmail(email: string): Promise<QueryResult<User>> {
    return new Promise((resolve, reject) => {
        database.query(getUserQueryString, [email], (error, results, fields) => {
            if (error) reject(error)

            resolve({
                results,
                fields: fields || []
            })
        })
    });
}

interface TimetableRow {
    P_FullName?: string;
    P_ShortName: string
    Subject_Name: string
    Subject_ShortName: string
    T1_DayNumber: number
    T1_ReplacementTeacher_UserID?: number
    T1_Teacher_UserID: number
    T1_TimeEnd: string
    T1_TimeStart: string
    T1_TimetableID: number
    User_Name: string
    User_Surname: string
    _ClassYear: number
}

export async function getUserTimetable(id: number): Promise<QueryResult<TimetableRow>> {
    return new Promise((resolve, reject) => {
        const sql = tokenize(getTimetableByUserID, {UserID: database.escape(id)})

        database.query({sql, nestTables: '_'}, (error, results, fields) => {
            if (error) reject(error)

            resolve({
                results,
                fields: fields || []
            })
        })
    });
}
