import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { twMerge } from "tailwind-merge";

import Layout from "../layout/Layout";
import ScrollPagination from "../components/ScrollPagination";
import ErrorDialog from "../components/Error/ErrorDialog";
import { getLikedVideo } from "../store/slices/likeSlice";
import LikedVideoCard from "../components/likedVideo/LikedVideoCard";

export default function LikedVideos() {
    const dispatch = useDispatch();
    const {
        likedVideo,
        loading,
        error,
        currentPage,
        totalPages,
        totalVideos,
        hasNextPage,
    } = useSelector((state) => state.like);

    const handleFetchLikedVideos = async (page) => {
        await dispatch(getLikedVideo({ queryParams: { page, limit: 10 } }));
    };

    useEffect(() => {
        handleFetchLikedVideos(1);
    }, []);
    return (
        <Layout className="flex flex-col gap-7 max-lg:gap-5">
            <ScrollPagination
                paginationType="infinite-scroll"
                currentPage={currentPage}
                dataLength={likedVideo?.length}
                error={error}
                hasNextPage={hasNextPage}
                loadNextPage={() => handleFetchLikedVideos(currentPage + 1)}
                refreshHandler={() => handleFetchLikedVideos(1)}
                loading={loading}
                totalPages={totalPages}
                totalItems={totalVideos}
                className={twMerge("flex flex-grow flex-col gap-3")}
                endMessage={
                    <p className="py-4 pt-5 text-lg text-gray-800 dark:text-white text-center font-Noto_sans">
                        No more liked videos to show !!!
                    </p>
                }
            >
                {!likedVideo?.length &&
                    totalVideos === 0 &&
                    totalPages === 1 &&
                    !loading ? (
                    <ErrorDialog
                        errorMessage="empty liked videos!"
                        buttonLabel="Try again"
                        buttonOnClick={() => handleFetchLikedVideos(1)}
                    />
                ) : (
                    <>
                        <h1 className="text-4xl font-roboto font-semibold text-[#0F0F0F] dark:text-[#F1F1F1]">
                            Liked videos
                        </h1>
                        {likedVideo?.map((video) => (
                            <LikedVideoCard key={video?.video?._id} video={video?.video} />
                        ))}
                    </>
                )}
            </ScrollPagination>
        </Layout>
    );
}