import { compare } from "bcrypt";

import { User } from "../../schema";
import { DatabaseService } from '../index'

export const verifyCredentials = async (email: string, password: string): Promise<User> => {
    const query = await DatabaseService.getUserByEmail(email);

    if (query.results.length === 0)
        throw new Error("User not found");

    if (!compare(password, query.results[0].PasswordHash.toString()))
        throw new Error("Invalid credentials")

    return query.results[0];
}

