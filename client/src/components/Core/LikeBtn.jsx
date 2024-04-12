import { useState } from "react";
import { IoIosThumbsUp } from "react-icons/io"
import useActionHandler from "../../hooks/useActionHandler";
import { twMerge } from "tailwind-merge";

export default function LikeBtn({
    isLiked,
    likeCount,
    contentId,
    toggleLikeAction,
}) {
    const [likeCountState, setLikeCountState] = useState(likeCount);
    // const [likeCountState, setLikeCountState] = useState(1);
    const [isLikedState, setIsLikedState] = useState(isLiked);
    const { isLoading, error, handleAction } = useActionHandler({
        action: toggleLikeAction,
        isShowToastMessage: true,
    });

    const toggleLike = async () => {
        if (isLoading) return;

        const updatedLikeCount = isLikedState ? likeCountState - 1 : likeCountState + 1;
        setLikeCountState(updatedLikeCount);
        setIsLikedState((prev) => !prev);

        await handleAction(contentId);

        if (error) {
            setLikeCountState(likeCountState);
            setIsLikedState(isLikedState);
        }
    }

    return (
        <button
            className={twMerge(
                "flex items-center gap-1 w-fit text-gray-600 dark:text-slate-400 text-lg rounded-full",
                "px-3 -ml-3 py-1 transition-all hover:bg-slate-200 dark:hover:bg-[#272727] disabled:opacity-75",
                (isLikedState || isLoading) && ["text-blue-500 dark:text-white bg-slate-200 dark:bg-[#272727]"]
            )}
            onClick={toggleLike}
            disabled={isLoading}
        >
            <span className="text-xl">
                <IoIosThumbsUp />
            </span>
            <span>{likeCountState}</span>
        </button>
    )
}