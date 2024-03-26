import { useSelector } from "react-redux";
import { twMerge } from "tailwind-merge";

import Avatar from "../Core/Avatar";
import Button from "../Core/Button";
import useForm from "../../hooks/useForm";
import useActionHandler from "../../hooks/useActionHandler";
import {
    addCommentToTweet,
    addCommentToVideo,
} from "../../store/slices/commentSlice";
import { useNavigate } from "react-router-dom";

const AddComment = ({
    contentId,
    type,
    setComments,
}) => {
    const navigate = useNavigate()
    const { user } = useSelector((state) => state?.auth);

    const { formData, handleInputChange, resetForm } = useForm({
        initialFormState: { content: "" },
    });

    const { isLoading, handleAction } = useActionHandler({
        action: type === "video" ? addCommentToVideo : addCommentToTweet,
        isShowToastMessage: true,
        toastMessages: { loadingMessage: "Adding Comment..." },
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        const res = await handleAction({
            data: formData,
            videoId: contentId,
            tweetId: contentId,
        });

        if (res.isSuccess) {
            resetForm();
            setComments((prevComments) => [
                { ...res.resData?.comment },
                ...prevComments,
            ]);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-1">
            <div className="flex items-center md:gap-5 gap-3 py-1.5">
                <Avatar url={user?.avatar?.url} fullName={user?.fullName} onClick={() => navigate(`/c/${user?.username}`)} />
                <input
                    type="text"
                    name="content"
                    placeholder="Type your comment..."
                    autoComplete="off"
                    value={formData.content}
                    onChange={(e) => handleInputChange("content", e.target.value)}
                    className="peer flex-grow pb-2 border-b border-slate-200 dark:border-slate-500 placeholder-slate-500 text-gray-700 dark:text-white text-lg font-roboto focus:border-b-black dark:focus:border-b-white bg-transparent transition-[border] duration-100 break-all"
                />
            </div>
            <Button
                type="submit"
                isLarge={false}
                className={twMerge(
                    "self-end py-1.5 px-6 text-[15px] rounded-full border-none",
                    "hidden",
                    formData.content.length > 0 && "block"
                )}
                disabled={isLoading}
            >
                {isLoading ? "Adding comment..." : "Comment"}
            </Button>
        </form>
    );
};

export default AddComment;