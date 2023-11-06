import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { JWT_SECRET } from "$env/static/private";

import db from "$lib/server/db";
import type { User } from "$lib/types";
import type { User as UserEntity } from "@prisma/client";

export function mapUserEntityToUser(entity: UserEntity): User {
    return {
        username: entity.username,
        email: entity.email,
        givenName: entity.givenName,
        familyName: entity.familyName,
        middleName: entity.familyName,
        isAdmin: entity.isAdmin
    }
}

export async function getUserByUsername(username: string): Promise<User | null> {
    const entity = await db.user.findFirst({ where: { username } });

    return entity ? mapUserEntityToUser(entity) : null;
}

export async function getUserByEmail(email: string): Promise<User | null> {
    const entity = await db.user.findFirst({ where: { email } });

    return entity ? mapUserEntityToUser(entity) : null;
}

export async function getUserEntityByUsername(username: string) {
    const entity = await db.user.findFirst({ where: { username } });

    return entity ?? null;
}

export async function createUser(user: User, password: string) {
    const passwordHash = await bcrypt.hash(password, 10);

    await db.user.upsert({
        create: {
            username: user.username,
            email: user.email,
            givenName: user.givenName,
            familyName: user.familyName,
            middleName: user.middleName,
            isAdmin: user.isAdmin,
            passwordHash
        },
        update: {
            isAdmin: user.isAdmin,
            passwordHash,
            email: user.email
        },
        where: {
            username: user.username
        }
    });
}

export function comparePasswords(password: string, passwordHash: string) {
    return bcrypt.compare(password, passwordHash);
}

export function generateJwt(user: User) {
    const accessToken = jwt.sign({ user: JSON.stringify(user) }, JWT_SECRET, {
        expiresIn: "1d"
    });
    const refreshToken = jwt.sign({ username: user.username }, JWT_SECRET, {
        expiresIn: "7d"
    });

    return { accessToken, refreshToken };
}

export function decodeJwt(token: string): User | string | null {
    try {
        const result = jwt.verify(token, JWT_SECRET) as
            | { user: string }
            | { username: string };
        return "user" in result
            ? (JSON.parse(result.user) as User)
            : result.username;
    } catch (e) {
        return null;
    }
}
