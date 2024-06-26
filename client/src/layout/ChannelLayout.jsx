import { useEffect, useState } from "react";
import { Link, Outlet, useParams, useLocation } from "react-router-dom";
import { twMerge } from "tailwind-merge";

import Layout from "./Layout";
import useActionHandler from "../hooks/useActionHandler";
import { getChannel } from "../store/slices/authSlice";
import Avatar from "../components/Core/Avatar";
import Skeleton from "../components/Skeleton";
import SubscribeBtn from "../components/Channel/SubscribeBtn";
import { useSelector } from "react-redux";
import ErrorDialog from "../components/Error/ErrorDialog";
import { abbreviateNumber } from "js-abbreviation-number";

export default function ChannelLayout() {
    const { username } = useParams();
    const location = useLocation();
    let { channel } = useSelector((state) => state?.auth);

    const [anish, setAnish] = useState(channel?.isSubscribed)
    // console.log(channel);

    // useEffect(() => {
    //     setSubscribersCount(channel?.subscribersCount || 0);
    // }, [channel]);

    const { error, isLoading, handleAction } = useActionHandler({
        action: getChannel,
        isShowToastMessage: false,
    });

    async function fetchChannel() {
        await handleAction(username);
    }

    useEffect(() => {
        fetchChannel();
    }, [username, anish]);

    const channelTabsLink = [
        {
            label: "Home",
            slug: `/channel/${username}`,
        },
        {
            label: "Videos",
            slug: `/channel/${username}/videos`,
        },
        // {
        //     label: "Tweets",
        //     slug: `/channel/${username}/tweets`,
        // },
        {
            label: "Playlists",
            slug: `/channel/${username}/playlists`,
        },
    ];

    const ChannelLayoutSkeleton = () => (
        <div className="w-full flex flex-col gap-8">
            <Skeleton className="w-full md:h-44 h-28 rounded-2xl" />
            <div className="w-full flex md:gap-14 gap-5">
                <Skeleton className="md:h-36 h-20 md:w-36 w-20 rounded-full" />
                <div className="flex flex-col md:gap-4 gap-2">
                    <Skeleton className="max-w-[200px] w-64 h-6" />
                    <Skeleton className="max-w-[150px] w-44 h-4" />
                    <Skeleton className="max-w-[150px] w-44 h-4" />
                </div>
            </div>
        </div>
    );

    console.log(channel)

    return (
        <Layout className="md:px-4 px-2 flex flex-col gap-6">
            {error ? (
                // Display error message if there's an error
                <ErrorDialog
                    errorMessage={error}
                    buttonLabel="Try again"
                    buttonOnClick={fetchChannel}
                />
            ) : (
                // Render channel details if no error
                <div className="w-full flex flex-col gap-8">
                    {isLoading ? (
                        // Use ChannelLayoutSkeleton components while loading
                        <ChannelLayoutSkeleton />
                    ) : (
                        <>
                            {/* Channel cover image */}
                            <div className="w-full md:h-44 h-28 rounded-2xl overflow-hidden">
                                <img
                                    src={channel?.coverImage || "/default-cover.png"}
                                    className="w-full h-full object-cover"
                                    alt="coverImage"
                                />
                            </div>
                            {/* Display channel details once loaded */}
                            <div className="flex md:gap-14 gap-5">
                                <Avatar
                                    url={channel?.avatar}
                                    fullname={channel?.fullname}
                                    className="md:h-36 h-20 md:w-36 w-20"
                                />

                                <div className="flex flex-col gap-1">
                                    {/* Channel name */}
                                    <h1
                                        className="md:text-4xl text-xl text-black dark:text-white font-bold"
                                        title={channel?.fullname}
                                    >
                                        {channel?.fullname}
                                    </h1>

                                    {/* Username and subscriber/video count */}
                                    <p className="md:text-lg text-sm text-zinc-600 dark:text-[#AAAAAA] font-semibold leading-tight">
                                        {channel?.username}
                                    </p>
                                    <p className="md:text-lg text-sm text-zinc-600 dark:text-[#AAAAAA] font-semibold leading-loose">
                                        {abbreviateNumber(channel?.subscribersCount || 0, 1)}{" "}
                                        {channel?.subscribersCount || 0 <= 1
                                            ? "Subscriber"
                                            : "Subscribers"}{" "}
                                        {" • "}
                                        {channel?.videoCount}{" "}
                                        {channel?.videoCount || 0 <= 1 ? "video" : "videos"}
                                    </p>
                                    {/* subscribe button */}
                                    <div
                                        onClick={() => {
                                            setAnish((prev) => !prev);
                                        }}
                                    >

                                        <SubscribeBtn
                                            isSubscribed={channel?.isSubscribed || false}
                                            channelId={channel?._id || ""}
                                        />
                                    </div>
                                </div>
                            </div>
                        </>
                    )}

                    {/* Channel tabs */}
                    <div className="flex md:gap-10 gap-7 relative after:absolute after:-bottom-2 after:w-full after:h-[1px] after:bg-gray-300 dark:after:bg-gray-600">
                        {channelTabsLink.map(({ label, slug }) => (
                            // Render channel tabs with appropriate styles
                            <Link
                                to={slug}
                                key={slug}
                                className={twMerge(
                                    "text-base text-zinc-500 dark:text-[#AAAAAA] font-semibold font-poppins transition-all",
                                    location.pathname === slug &&
                                    "text-black dark:text-white relative after:content-[''] after:absolute after:z-[2] after:-bottom-2 after:left-0 after:w-full after:h-[2px] after:bg-black dark:after:bg-white"
                                )}
                            >
                                <button
                                    className="disabled:opacity-70 disabled:animate-pulse"
                                    disabled={isLoading}
                                >
                                    {label}
                                </button>
                            </Link>
                        ))}
                    </div>
                </div>
            )}
            {!error && <Outlet />}
        </Layout>
    );
}