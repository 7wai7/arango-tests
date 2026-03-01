"use client";

import { useEffect, useState } from "react";
import { timeAgo } from "@/utils/timeAgo";

interface Props {
    date: string;
}

export default function TimeAgo({ date }: Props) {
    const [text, setText] = useState("...");

    useEffect(() => {
        setText(timeAgo(date));

        // updated every minute
        const interval = setInterval(() => setText(timeAgo(date)), 60000);
        return () => clearInterval(interval);
    }, [date]);

    return text;
}