import { FieldInfo } from "mysql";
import { User } from "../../../common/schema";

import database from './connect'

import { getUserByEmail as getUserQueryString } from "../../../../sql/queries.json";

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
