export type UserProfile = {
    id: string,
    username: string,
    email: string,
    about?: string,
    lastOnlineDate: string,
    isOnline: boolean,
    avatarUrl: string
}

export type Post = {
    id: string,
    user: UserProfile,
    content: string,
    media?: PostMedia[],
    createdAt: string,
    likes: number
}

export type PostMedia = {
    type: string,
    url: string
}