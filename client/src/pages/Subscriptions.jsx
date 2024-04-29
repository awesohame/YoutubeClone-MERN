import { useEffect } from "react";
import { twMerge } from "tailwind-merge";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import Layout from "../layout/Layout";
import ScrollPagination from "../components/ScrollPagination";
import ErrorDialog from "../components/Error/ErrorDialog";
import Avatar from "../components/Core/Avatar";
import { getSubscribedChannels } from "../store/slices/subscriptionSlice";
import SubscribeBtn from "../components/Subscription/SubscribeBtn";

export default function Subscriptions() {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const {
        subscribedChannelLists,
        loading,
        error,
        currentPage,
        totalPages,
        totalChannels,
        hasNextPage,
    } = useSelector((state) => state.subscription);

    const handleFetchSubscribedChannelLists = (page) => {
        if (!user) return;
        // console.log(user);
        dispatch(
            getSubscribedChannels({
                subscriberId: user?._id,
            })
        );
    };

    useEffect(() => {
        handleFetchSubscribedChannelLists(1);
    }, [user?._id]);
    // console.log(subscribedChannelLists);
    return (
        <Layout className="md:px-7 md:py-5 p-3.5">
            <ScrollPagination
                paginationType="infinite-scroll"
                currentPage={currentPage}
                dataLength={subscribedChannelLists?.length}
                error={error}
                hasNextPage={hasNextPage}
                loadNextPage={() => handleFetchSubscribedChannelLists(currentPage + 1)}
                refreshHandler={() => handleFetchSubscribedChannelLists(1)}
                loading={loading}
                totalPages={totalPages}
                totalItems={totalChannels}
                className={twMerge("pb-10", error && "min-h-full")}
                endMessage={
                    <p className="py-4 pt-5 text-lg text-gray-800 dark:text-white text-center font-Noto_sans">
                        No more subscribed channels to show.
                    </p>
                }
            >
                {!subscribedChannelLists?.length &&
                    totalChannels === 0 &&
                    totalPages === 1 &&
                    !loading ? (
                    <ErrorDialog
                        errorMessage="you have'nt subscribed any channel yet!"
                        buttonLabel="Try again"
                        buttonOnClick={() => handleFetchSubscribedChannelLists(1)}
                    />
                ) : (
                    <div className="flex flex-col gap-1 pb-4">
                        <h1 className="text-4xl mb-4 font-roboto font-semibold text-[#0F0F0F] dark:text-[#F1F1F1]">
                            Subscriptions
                        </h1>
                        {subscribedChannelLists.map(
                            (channel) => {
                                // console.log(channel);
                                return (
                                    <div
                                        key={channel?.channel?._id}
                                        className="w-full flex gap-3 py-3 px-2 truncate rounded-full hover:bg-slate-100 dark:hover:bg-[#272727]"
                                    >
                                        <Link
                                            to={`/channel/${channel?.channel?.username}`}
                                            className="flex flex-grow gap-3 truncate"
                                        >
                                            <Avatar
                                                fullName={channel?.channel?.username}
                                                url={channel?.channel?.avatar}
                                                className="md:h-14 md:w-14 w-10 h-10 flex-shrink-0"
                                            />
                                            <div className="flex flex-grow flex-col gap-1 truncate">
                                                <p className="md:text-[15px] text-[13px] leading-none text-gray-600 dark:text-[#AAAAAA] font-nunito_sans font-semibold truncate">
                                                    {channel?.channel?.username}
                                                </p>
                                                <h2 className="md:text-2xl text-base text-[#606060] dark:text-[#F1F1F1] font-roboto font-normal leading-tight truncate">
                                                    {channel?.channel?.fullname}
                                                </h2>
                                            </div>
                                        </Link>
                                        <SubscribeBtn
                                            channelId={channel?.channel?._id}
                                            isSubscribed={true}
                                            className="max-sm:text-[13px] max-sm:py-1.5 max-sm:px-3"
                                        />
                                    </div>
                                )
                            }
                        )}
                    </div>
                )}
            </ScrollPagination>
        </Layout>
    );
}