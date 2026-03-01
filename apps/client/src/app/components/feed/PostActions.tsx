import { postActionButtons } from "@/data/post-actions";

export default function PostActions() {
  return (
    <div className="flex flex-row gap-2">
      {postActionButtons.map((btn) => (
        <button
          key={btn.text}
          className="
          flex flex-row items-center gap-2 bg-white border-2 border-gray-200 px-2 py-1 w-min
          transition-colors duration-200 hover:border-red-400 hover:text-red-400
        "
        >
          {btn.icon} {btn.text}
        </button>
      ))}
    </div>
  )
}