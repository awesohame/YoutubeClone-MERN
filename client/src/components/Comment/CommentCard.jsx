import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import TimeAgo from "react-timeago";

import useActionHandler from "../../hooks/useActionHandler";
import {
    deleteComment,
    updateComment,
} from "../../store/slices/commentSlice";
import { toggleCommentLike } from "../../store/slices/likeSlice";
import Avatar from "../Core/Avatar";
import LikeBtn from "../Core/LikeBtn";
import DropdownMenu from "../Core/DropdownMenu";
import Button from "../Core/Button";
import EditableTextarea from "../Core/EditableTextArea";
import Modal from "../Core/Modal";
import { FiMoreVertical } from "react-icons/fi";
import TextWithToggle from "../Core/TextWithToggle";

import axiosInstance from "../../helper/axiosInstance";

const CommentCard = ({ comment }) => {
    // console.log(comment);
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.auth);
    const [commentContent, setCommentContent] = useState(comment?.content);
    const [isShowDeleteConfirmDialog, setIsShowDeleteConfirmDialog] =
        useState(false);
    const [isDeleted, setIsDeleted] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editedContent, setEditedContent] = useState(comment?.content);

    const [likeCount, setLikeCount] = useState(0);

    // const {
    //     handleAction: handleGetTotalLikesAction,
    // } = useActionHandler({
    //     action: getTotalLikesByAnyId,
    //     isShowToastMessage: false,
    // });

    // const fetchTotalLikes = async () => {
    //     await handleGetTotalLikesAction({ anyId: comment._id, type: "comment" });
    // };

    // useEffect(() => {
    //     fetchTotalLikes();
    // }, []);

    // const totalLikes = useSelector((state) => state.like.totalLikes);
    // console.log(totalLikes);

    useEffect(() => {
        const fetchLikes = async () => {
            const { data } = await axiosInstance.get(`/likes/${comment._id}?type=comment`);
            const likeCount = data.data[0]?.totalLikes || 0;
            if (likeCount) {
                setLikeCount(likeCount);
            }
        };
        fetchLikes();
    }, []);

    const { isLoading: isDeleting, handleAction: deleteCommentAction } =
        useActionHandler({
            action: deleteComment,
            isShowToastMessage: true,
            toastMessages: { loadingMessage: "Deleting comment..." },
        });

    const { isLoading: isUpdating, handleAction: updateCommentAction } =
        useActionHandler({
            action: updateComment,
            isShowToastMessage: true,
            toastMessages: { loadingMessage: "Updating comment..." },
        });

    const handleDeleteComment = async (commentId) => {
        setIsDeleted(false);
        const { error, isSuccess } = await deleteCommentAction(commentId);

        if (!error && isSuccess) {
            setIsDeleted(true);
        }
    };

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleCancelEdit = () => {
        setIsEditing(false);
        setEditedContent(comment.content);
    };

    const handleUpdateComment = async () => {
        const { isSuccess, error } = await updateCommentAction({
            data: { content: editedContent },
            commentId: comment._id,
        });
        if (isSuccess && !error) {
            setIsEditing(false);
            setCommentContent(editedContent);
        }
    };

    if (isDeleted) {
        return (
            <p className="p-2 bg-slate-50 dark:bg-[#252525] text-black dark:text-white">
                This comment has been deleted.
            </p>
        );
    }

    // console.log(comment);

    return (
        <div className="group/item flex gap-2">
            <div className="flex flex-grow gap-2">
                <Avatar
                    url={comment?.owner?.avatar}
                    fullName={comment?.owner?.username}
                    className="h-10 w-10"
                    onClick={() => navigate(`/c/${comment?.owner?.username}`)}
                />
                {isEditing ? (
                    <div className="flex flex-col flex-grow h-auto gap-3">
                        <EditableTextarea
                            value={editedContent}
                            onChange={(e) => setEditedContent(e.target.value)}
                        />
                        <div className="flex gap-2 self-end">
                            <Button
                                onClick={handleCancelEdit}
                                className="bg-gray-500 text-white"
                                disabled={isUpdating}
                            >
                                Cancel
                            </Button>
                            <Button onClick={handleUpdateComment} disabled={isUpdating}>
                                {isUpdating ? "updating..." : "Update"}
                            </Button>
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-grow w-min flex-col gap-1">
                        <div className="flex gap-3 items-start">
                            <h2 className="text-[13px] leading-none text-gray-600 dark:text-[#AAAAAA] font-nunito_sans font-semibold">
                                {comment?.owner?.username}
                            </h2>
                            <p className="text-xs leading-none text-gray-500 dark:text-[#AAAAAA]">
                                <TimeAgo date={comment?.createdAt} />
                            </p>
                        </div>
                        <TextWithToggle initialShowLine={2} className="text-sm text-gray-800 dark:text-slate-50 font-roboto whitespace-break-spaces break-all">
                            {commentContent}
                        </TextWithToggle>
                        <LikeBtn
                            contentId={comment?._id}
                            isLiked={comment?.isLiked}
                            likeCount={likeCount}
                            toggleLikeAction={toggleCommentLike}
                        />
                    </div>
                )}
            </div>
            {user?._id === comment?.owner?._id && !isEditing && (
                <>
                    <DropdownMenu
                        triggerButton={
                            <Button
                                btnType="icon-btn"
                                className="focus-within:block hidden group-hover/item:block max-md:block"
                            >
                                <FiMoreVertical size={15} />
                            </Button>
                        }
                    >
                        <Button
                            onClick={handleEdit}
                            className="w-full py-1.5 px-7 bg-blue-500 border-none"
                        >
                            Edit
                        </Button>
                        <Button
                            className="w-full py-1.5 px-7 bg-red-600 border-none"
                            onClick={() => setIsShowDeleteConfirmDialog((prev) => !prev)}
                        >
                            {isDeleting ? "Deleting..." : "Delete"}
                        </Button>
                    </DropdownMenu>
                    <Modal
                        open={isShowDeleteConfirmDialog}
                        handleClose={() => setIsShowDeleteConfirmDialog(false)}
                        title="Delete Comment"
                        description="Are you sure you want to delete the comment?"
                        submitLabel={isDeleting ? "deleting..." : "Delete"}
                        isLoading={isDeleting}
                        onSubmit={() => handleDeleteComment(comment?._id)}
                        closeButton={
                            <Button
                                className="w-full py-1.5 px-7 bg-red-600 border-none"
                                disabled={isDeleting}
                            >
                                Cancel
                            </Button>
                        }
                    />
                </>
            )}
        </div>
    );
};

export default CommentCard;