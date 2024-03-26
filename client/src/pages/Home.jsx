import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Layout from '../layout/Layout';
import ScrollPagination from '../components/ScrollPagination';
import Button from '../components/Core/Button';
import EmptyMessage from '../components/EmptyMessage';
import { setVideos, getAllVideos } from '../store/slices/videoSlice';
import VideoCard from '../components/Video/VideoCard';
import VideoSkeleton from '../components/Video/VideoSkeleton';

const Home = () => {
    const dispatch = useDispatch();
    const [sortType, setSortType] = useState("desc");
    const limit = 6;
    const {
        loading,
        error,
        videos,
        currPage,
        totalPages,
        totalDocs,
        hasNextPage,
    } = useSelector((state) => state.video);

    const fetchVideos = (page) => {
        if (page === 1) {
            dispatch(setVideos([]));
        }
        dispatch(getAllVideos({ page, limit, sortBy: "createdAt", sortType }));
    }

    const renderSkeletons = () => {
        const numSkeletons =
            limit && videos.length !== 0
                ? Math.min(limit, totalDocs - videos.length)
                : limit;
        return Array.from({ length: numSkeletons }, (_, idx) => (
            <VideoSkeleton key={idx} />
        ));
    };

    // fetch initial videos
    useEffect(() => {
        fetchVideos(1);
    }, [sortType]);

    return (
        <Layout className="lg:pl-8 max-lg:px-5">
            <ScrollPagination
                paginationType="infinite-scroll"
                loadNextPage={() => fetchVideos(currPage + 1)}
                refreshHandler={() => fetchVideos(1)}
                dataLength={videos.length}
                loading={loading}
                error={error}
                currentPage={currPage}
                hasNextPage={hasNextPage}
                totalPages={totalPages}
                totalItems={totalDocs}
                endMessage={
                    <p className="py-4 text-lg text-gray-800 dark:text-white text-center font-Noto_sans">
                        No more videos to fetch !!!
                    </p>
                }
            >
                <div className="w-full bg-white dark:bg-dark_bg flex md:pb-6 pb-4 pt-2 gap-3">
                    {["desc", "acc"].map((type) => (
                        <Button
                            key={type}
                            isLarge={false}
                            onClick={() => handleSortTypeChange(type)}
                            className={
                                " rounded-lg bg-gray-200 dark:bg-[#272727] text-sm text-[#0f0f0f] dark:text-white font-roboto border-none " +
                                    " hover:opacity-100 " +
                                    sortType === type
                                    ? " bg-black text-white dark:bg-white dark:text-black "
                                    : " hover:bg-gray-300 dark:hover:bg-[#353535] "
                            }
                        >
                            {type === "desc" ? "Newest" : "Oldest"}
                        </Button>
                    ))}
                </div>
                <div className="flex flex-grow flex-wrap items-start gap-y-7 max-lg:justify-center lg:gap-x-5 gap-10">
                    {!videos.length && totalDocs === 0 && totalPages === 1 && !loading ? (
                        <EmptyMessage
                            message="empty videos"
                            buttonText="fetch again"
                            onRefresh={() => fetchVideos(1)}
                        />
                    ) : (
                        videos?.map((item, index) => <VideoCard key={index} data={item} />)
                    )}
                    {loading && renderSkeletons()}
                </div>
            </ScrollPagination>
        </Layout>
    );
};

export default Home;