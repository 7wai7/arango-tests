"use client"

import { useState } from "react";
import Header from "../components/ui/Header";
import Image from "next/image";
import { __mock__feed, __mock__users } from "@/data/mock";
import FeedPost from "../components/feed/Post";

export default function ProfilePage() {
    const [user] = useState(__mock__users.user1);
    const [posts] = useState(__mock__feed);

    return (
        <>
            <Header type="profile" />
            <hr className="border-t-2 border-gray-300 mb-4" />
            <main className="px-4 w-full">
                <Image
                    src={user.avatarUrl}
                    alt={user.username}
                    width={170}
                    height={170}
                    className="mb-4 border-3 border-gray-200"
                />
                <p className="text-xl mb-2 font-bold">{user.username}</p>
                <p className="text mb-3 text-gray-400">{user.email}</p>

                {user.about && <p className="mb-5">{user.about}</p>}

                <hr className="border-t-2 border-gray-300 mb-4" />

                {posts.map(p => (
                    <div key={p.id}>
                        <FeedPost post={p} />
                        <hr className="border-t-2 border-gray-300 mt-4" />
                    </div>
                ))}
            </main>
        </>
    )
}