"use client"

import { useState } from "react"
import Header from "./components/ui/Header";
import { __mock__feed } from "@/data/mock";
import FeedPost from "./components/feed/Post";

export default function FeedPage() {
  const [posts] = useState(__mock__feed);

  return (
    <>
      <Header type="feed" />
      <hr className="border-t-2 border-gray-300 mb-4" />
      <main className="flex flex-col gap-5 w-full">
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