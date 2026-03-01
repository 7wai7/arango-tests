import { Post } from "@/types";
import { timeAgo } from "@/utils/timeAgo";
import Image from "next/image";
import PostActions from "./PostActions";
import TimeAgo from "../ui/TimeAgo";

interface Props {
    post: Post;
}

export default function FeedPost({ post: p }: Props) {
    return (
        <div className="w-full flex flex-col px-5 py-4 bg-white border border-gray-200 shadow-sm">
            {/* User info */}
            <div className="flex flex-row items-start">
                <Image
                    src={p.user.avatarUrl}
                    alt={p.user.username}
                    width={44}
                    height={44}
                    className="mr-3 border border-gray-200"
                />
                <div className="flex flex-col items-start">
                    <span className="font-medium">{p.user.username}</span>
                    <p className="text-xs text-gray-400"><TimeAgo date={timeAgo(p.createdAt)} /></p>
                </div>
            </div>

            {/* Post content */}
            <div className="mt-3 text-gray-800">{p.content}</div>

            {/* Media */}
            {p.media && p.media.length > 0 && (
                <div className="mt-3 flex flex-col gap-2">
                    {p.media.map((m, idx) => {
                        if (m.type === "image") {
                            return (
                                <div
                                    key={idx}
                                    className="relative w-full h-64 border-2 border-gray-200 overflow-hidden"
                                >
                                    <Image
                                        src={m.url}
                                        alt={`media-${idx}`}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            );
                        } else if (m.type === "video") {
                            return (
                                <video
                                    key={idx}
                                    src={m.url}
                                    controls
                                    className="w-full h-64 border-2 border-gray-200 object-cover"
                                />
                            );
                        }
                        return null;
                    })}
                </div>
            )}

            {/* Likes */}
            <div className="flex flex-row gap-4 mt-3 text-sm text-gray-400">
                <p>{p.likes} likes</p>
            </div>

            <hr className="border-t-2 border-gray-300 my-4" />

            {/* Actions */}
            <PostActions />
        </div>
    );
}