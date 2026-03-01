interface Props {
    type: "feed" | "profile"
}

export default function Header({ type }: Props) {
    const text = type === "feed" ? "Social feed" : type === "profile" ? "Profile" : null;

    if (!text) return null;

    return (
        <header className="w-full px-5 py-4">
            <span className="text-xl font-semibold">{text}</span>
        </header>
    )
}