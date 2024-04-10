import { useState, useEffect } from 'react';
import ScrollPagination from '../ScrollPagination';
import AddComment from './AddComment';
import CommentCard from './CommentCard';
import {
    getTweetComment,
    getVideoComment,
} from '../../store/slices/commentSlice';
import useActionHandler from '../../hooks/useActionHandler';
import EmptyMessage from '../EmptyMessage';

const CommentBox = ({ contentId, type }) => {
    const [comments, setComments] = useState([]);
    const [currPage, setCurrPage] = useState(1);
    const [sortType, setSortType] = useState("recent");
    const [totalPages, setTotalPages] = useState(0);
    const [totalDocs, setTotalDocs] = useState(0);
    const [hasNextPage, setHasNextPage] = useState(false);

    // console.log(contentId, type);
    const { error, isLoading, handleAction } = useActionHandler({
        action: type === "video" ? getVideoComment : getTweetComment,
        isShowToastMessage: false,
    });

    const fetchComments = async (page) => {
        const { success, resData } = await handleAction({
            videoId: contentId,
            tweetId: contentId,
            queryParams: {
                page,
                limit: 5,
                sortBy: "createdAt",
                sortType: sortType === "oldest" ? "acc" : "desc",
            },
        });

        // console.log(resData);
        // console.log(success);

        if (success && resData) {
            setComments((prevComments) =>
                page === 1
                    ? resData
                    : [...prevComments, ...resData]
            );
            // setComments(resData)
            // console.log(comments);
            // setCurrPage(resData.result.page);
            // setTotalPages(resData.result.totalPages);
            // setTotalDocs(resData.result.totalDocs);
            // setHasNextPage(resData.result.hasNextPage);
        }
    };

    useEffect(() => {
        fetchComments(1);
    }, [contentId, type, sortType]);

    const handleSortChange = (e) => {
        setSortType(e.target.value);
    };

    // console.log('comments just before component renders: ', comments);

    return (
        <ScrollPagination
            paginationType="view-more"
            loadNextPage={() => fetchComments(currPage + 1)}
            refreshHandler={() => fetchComments(1)}
            dataLength={comments.length}
            loading={isLoading}
            error={error}
            currentPage={currPage}
            totalItems={totalDocs}
            totalPages={totalPages}
            hasNextPage={hasNextPage}
            endMessage={
                <p className="py-4 text-lg text-gray-800 dark:text-white text-center font-Noto_sans">
                    No more comments to fetch !!!
                </p>
            }
        >
            <div className="flex flex-col gap-5 pt-1">
                <AddComment
                    contentId={contentId}
                    type={type}
                    setComments={setComments}
                />
                {/* Filter */}
                <select
                    className="w-min px-4 py-2 bg-slate-50 dark:bg-[#171717] hover:bg-slate-200 dark:hover:bg-[#202020] rounded-full text-sm text-gray-700 dark:text-white"
                    value={sortType}
                    onChange={handleSortChange}
                >
                    <option value="recent">Recent</option>
                    <option value="oldest">Oldest</option>{" "}
                </select>
                {/* Render comments */}
                {comments?.map((comment) => (
                    <CommentCard key={comment?._id} comment={comment} />
                ))}
                {!comments.length &&
                    totalDocs === 0 &&
                    totalPages === 1 &&
                    !isLoading && (
                        <EmptyMessage
                            message="empty comments"
                            buttonText="fetch again"
                            onRefresh={() => fetchComments(1)}
                        />
                    )}
            </div>
        </ScrollPagination>
    );
};

export default CommentBox;