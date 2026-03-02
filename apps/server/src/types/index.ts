export type UserDocument = {
    _key: string;
    username: string;
    email: string;
    passwordHash: string;
    about?: string;
    lastOnlineDate: string;
    avatarUrl: string;
    createdAt: string;
};

export type UserProfile = {
    id: string;
    username: string;
    email: string;
    about?: string;
    lastOnlineDate: string;
    avatarUrl: string;
};

