import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { twMerge } from "tailwind-merge";

import Layout from "../layout/Layout";
import ScrollPagination from "../components/ScrollPagination";
import { getWatchHistory } from "../store/slices/watchHistorySlice";
import ErrorDialog from "../components/Error/ErrorDialog";
import WatchHistoryVideoCard from "../components/watchHistory/WatchHistoryVideoCard";
import WatchHistoryVideoSkeleton from "../components/watchHistory/WatchHistoryVideoSkeleton";
// import ClearWatchHistory from "../components/settings/watchHistory/ClearWatchHistory";
// import ToggleWatchHistoryPauseStatus from "../components/settings/watchHistory/ToggleWatchHistoryPauseStatus";
import axios from "axios";

export default function WatchHistory() {
    const dispatch = useDispatch();
    const {
        loading,
        error,
        currentPage,
        totalPages,
        totalVideos,
        hasNextPage,
    } = useSelector((state) => state.watch_history);


    // const handleFetchWatchHistory = () => {
    //     dispatch(getWatchHistory());
    // }

    const [watchHistories, setWatchHistories] = useState([]);


    useEffect(() => {
        const fetchWatchHistory = async () => {
            try {
                const res = await axios.get("/users/history");
                // console.log(res?.data?.data);
                setWatchHistories(res?.data?.data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchWatchHistory();
    }, []);

    // const { watchHistories } = useSelector((state) => state.watch_history);

    // console.log(watchHistories);
    // const getFormattedDate = useCallback((createdAt) => {
    //     const date = new Date(createdAt);
    //     const today = new Date();
    //     const yesterday = new Date(today);
    //     yesterday.setDate(yesterday.getDate() - 1);

    //     if (date.toDateString() === today.toDateString()) {
    //         return "Today";
    //     } else if (date.toDateString() === yesterday.toDateString()) {
    //         return "Yesterday";
    //     } else {
    //         const diff = Math.floor(
    //             (today.getTime() - date.getTime()) / (1000 * 3600 * 24)
    //         );
    //         if (diff < 7) {
    //             return date.toLocaleDateString("en-US", { weekday: "long" });
    //         } else {
    //             return date.toLocaleDateString();
    //         }
    //     }
    // }, []);

    // useEffect(() => {
    //     handleFetchWatchHistory(1);
    // }, []);

    // useEffect(() => {
    //     const grouped = {};

    //     watchHistories.forEach(
    //         ({ watchHistoryVideo: video, _id: historyId, createdAt }) => {
    //             const date = getFormattedDate(createdAt.toString());
    //             if (!grouped[date]) {
    //                 grouped[date] = { date, videos: [] };
    //             }
    //             grouped[date].videos.push({ video, historyId });
    //         }
    //     );

    //     setGroupedWatchHistories(grouped);
    // }, [watchHistories]);



    return (
        <Layout className="flex flex-col gap-7 max-lg:gap-5 md:px-7 md:py-5 p-3.5">
            <h1 className="text-4xl font-roboto font-semibold text-[#0F0F0F] dark:text-[#F1F1F1]">
                Watch History
            </h1>

            <div className="flex lg:gap-7 max-lg:flex-col-reverse max-lg:gap-5">
                {/* history videos categorized with day/dates */}
                <ScrollPagination
                    paginationType="infinite-scroll"
                    currentPage={currentPage}
                    dataLength={watchHistories?.length}
                    error={error}
                    hasNextPage={hasNextPage}
                    loadNextPage={() => handleFetchWatchHistory(currentPage + 1)}
                    refreshHandler={() => handleFetchWatchHistory(1)}
                    loading={loading}
                    totalPages={totalPages}
                    totalItems={totalVideos}
                    className={twMerge(
                        "flex flex-grow flex-col gap-3",
                        error && "min-h-full"
                    )}
                    endMessage={
                        <p className="py-4 pt-5 text-lg text-gray-800 dark:text-white text-center font-Noto_sans">
                            No more watch history to show !!!
                        </p>
                    }
                >
                    {!watchHistories?.length &&
                        totalVideos === 0 &&
                        totalPages === 1 &&
                        !loading ? (
                        <ErrorDialog
                            errorMessage="empty history!"
                            buttonLabel="Try again"
                            buttonOnClick={() => handleFetchWatchHistory(1)}
                        />
                    ) : (
                        watchHistories.map((video, idx) => (
                            <div key={idx}>
                                {/* <h1 className="text-black dark:text-white text-lg">{date}</h1> */}
                                <WatchHistoryVideoCard
                                    key={idx}
                                    video={video}
                                    historyId={1}
                                />
                            </div>
                        ))
                    )}
                    {loading &&
                        Array.from({ length: 10 }).map((_, idx) => (
                            <WatchHistoryVideoSkeleton key={idx} />
                        ))}
                </ScrollPagination>

                {/* watch history settings */}
                {
                    // !error && (
                    //     <div className="lg:w-[470px] w-full h-fit bg-slate-50 dark:bg-[#252525] rounded-md lg:sticky lg:top-[88px] lg:py-24 lg:px-5 px-3 py-3">
                    //         <div className="flex flex-col justify-start items-start gap-3">
                    //             {/* <ClearWatchHistory /> */}
                    //             {/* <ToggleWatchHistoryPauseStatus /> */}
                    //         </div>
                    //     </div>
                    // )
                }
            </div>
        </Layout>
    );
}