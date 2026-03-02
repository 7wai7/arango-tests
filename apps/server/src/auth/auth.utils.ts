import { UserProfile } from "../types";

export function encodeTokenData(user: UserProfile): string {
    const tokenData = {
        id: user.id,
        username: user.username,
        email: user.email,
    };

    return Buffer
        .from(JSON.stringify(tokenData))
        .toString("base64");
}