import { compare } from "bcrypt";

import { User } from "../../../common/schema";
import { DatabaseService } from '../index'

export const verifyCredentials = async (email: string, password: string): Promise<User> => {
    const query = await DatabaseService.getUserByEmail(email);

    const error = new Error("Invalid credentials")

    if (query.results.length === 0)
        throw error;

    if (!(await compare(password, query.results[0].PasswordHash.toString())))
        throw error;

    return query.results[0];
}

