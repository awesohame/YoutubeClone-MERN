import { useState } from "react";
import { IoIosThumbsUp } from "react-icons/io"
import useActionHandler from "../../hooks/useActionHandler";

export default function LikeBtn({
    isLiked,
    likeCount,
    contentId,
    toggleLikeAction,
}) {
    const [likeCountState, setLikeCountState] = useState(likeCount);
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
            className={
                " flex items-center gap-1 w-fit text-gray-600 dark:text-slate-400 text-lg rounded-full px-3 -ml-3 py-1 transition-all hover:bg-slate-100 dark:hover:bg-[#171717] disabled:opacity-75 " +
                (isLikedState || isLoading ? " bg-blue-500 text-white" : "")
            }
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