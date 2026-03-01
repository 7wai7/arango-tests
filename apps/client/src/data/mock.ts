import { Post, PostMedia, UserProfile } from "../types";

const now = new Date();

export const __mock__users: Record<string, UserProfile> = {
  user1: {
    id: "1",
    username: "Cyber User Muser",
    email: "muser@cyber.com",
    about: "Digital creator, photographer, and adventure seeker. Living life one moment at a time. 📸✨",
    lastOnlineDate: now.toISOString(),
    isOnline: false,
    avatarUrl: "https://i.pravatar.cc/150?img=1"
  },
  user2: {
    id: "2",
    username: "Alice Smith",
    email: "alice@example.com",
    lastOnlineDate: now.toISOString(),
    isOnline: true,
    avatarUrl: "https://i.pravatar.cc/150?img=2"
  },
  user3: {
    id: "3",
    username: "Bob Johnson",
    email: "bob@example.com",
    lastOnlineDate: now.toISOString(),
    isOnline: true,
    avatarUrl: "https://i.pravatar.cc/150?img=3"
  }
};

const media1: PostMedia[] = [
  { type: "image", url: "https://picsum.photos/400/300" }
];

const media2: PostMedia[] = [
  { type: "image", url: "https://picsum.photos/500/400" },
  { type: "video", url: "https://sample-videos.com/video123/mp4/240/big_buck_bunny_240p_1mb.mp4" }
];

export const __mock__feed: Post[] = [
  {
    id: "1",
    user: __mock__users.user1,
    content: "Hello world! This is my first post.",
    media: media1,
    createdAt: now.toISOString(),
    likes: 12
  },
  {
    id: "2",
    user: __mock__users.user2,
    content: "Check out this cool photo from my vacation!",
    media: media2,
    createdAt: now.toISOString(),
    likes: 34
  },
  {
    id: "3",
    user: __mock__users.user3,
    content: "Good morning everyone ☀️",
    media: [],
    createdAt: now.toISOString(),
    likes: 8
  }
];