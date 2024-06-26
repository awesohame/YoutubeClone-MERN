import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { twMerge } from "tailwind-merge";
import { BiPlusCircle } from "react-icons/bi";

import ScrollPagination from "../../components/ScrollPagination";
import { getUserPlaylists } from "../../store/slices/playlistSlice";
import useActionHandler from "../../hooks/useActionHandler";
import EmptyMessage from "../../components/EmptyMessage";
import PlaylistSkeleton from "../../components/Playlist/PlaylistSkeleton";
import PlaylistCard from "../../components/Playlist/PlaylistCard";
import CreatePlaylistDialog from "../../components/Playlist/CreatePlaylistDialog";
import Button from "../../components/Core/Button";

export default function Playlists() {
    const { user, channel } = useSelector((state) => state?.auth);
    const [playlists, setPlaylists] = useState([]);
    const [currPage, setCurrPage] = useState(1);
    const limit = 5;
    const [totalPages, setTotalPages] = useState(0);
    const [totalDocs, setTotalDocs] = useState(0);
    const [hasNextPage, setHasNextPage] = useState(false);

    const [isShowCreatePlaylistDialog, setIsShowCreatePlaylistDialog] =
        useState(false);

    const { error, isLoading, handleAction } = useActionHandler({
        action: getUserPlaylists,
        isShowToastMessage: false,
    });

    const fetchUserPlaylists = async (page) => {
        if (!channel?._id) return;

        const { success, resData } = await handleAction({
            userId: channel?._id,
            queryParams: { page, limit },
        });
        // console.log(isSuccess);
        // console.log(resData);
        if (resData && success) {
            const newPlaylists = resData;
            setPlaylists(newPlaylists);
            // console.log("playlist: ", playlists);
            // setCurrPage(resData.result.page);
            // setTotalPages(resData.result.totalPages);
            // setTotalDocs(resData.result.totalDocs);
            // setHasNextPage(resData.result.hasNextPage);
        }
    };

    const renderSkeletons = () => {
        const numSkeletons =
            limit && playlists.length !== 0
                ? Math.min(limit, totalDocs - playlists.length)
                : limit;
        return Array.from({ length: numSkeletons }, (_, idx) => (
            <PlaylistSkeleton key={idx} />
        ));
    };

    useEffect(() => {
        fetchUserPlaylists(1);
    }, [channel?._id]);

    return (
        <ScrollPagination
            paginationType="view-more"
            loadNextPage={() => fetchUserPlaylists(currPage + 1)}
            refreshHandler={() => fetchUserPlaylists(1)}
            dataLength={playlists.length}
            loading={isLoading}
            error={error}
            currentPage={currPage}
            totalItems={totalDocs}
            totalPages={totalPages}
            hasNextPage={hasNextPage}
            endMessage={
                <p className="py-4 pt-5 text-lg text-gray-800 dark:text-white text-center font-Noto_sans">
                    No more playlists to show !!!
                </p>
            }
            className={twMerge("min-h-[55vh] pb-20", error && "min-h-full pt-10")}
        >
            <div className="flex justify-between max-md:pb-3 px-3">
                <h2 className="max-md:self-center md:text-lg text-base font-semibold text-zinc-800 dark:text-slate-200 font-Noto_sans">
                    Created Playlist
                </h2>
                {channel?._id === user?._id && (
                    <>
                        <Button
                            icon={<BiPlusCircle />}
                            isLarge={false}
                            isGradientBg={true}
                            className="md:text-base text-sm py-2"
                            onClick={() => setIsShowCreatePlaylistDialog((prev) => !prev)}
                        >
                            Create Playlist
                        </Button>
                        <CreatePlaylistDialog
                            open={isShowCreatePlaylistDialog}
                            handleClose={() => setIsShowCreatePlaylistDialog(false)}
                            onCreate={(createdPlaylist) =>
                                setPlaylists((prev) => [createdPlaylist, ...prev])
                            }
                        />
                    </>
                )}
            </div>
            <div className="w-full flex flex-wrap md:gap-10 gap-x-4 gap-y-5 max-lg:px-1 py-5 max-md:pb-12">
                {!playlists.length ? (
                    <EmptyMessage
                        message="empty playlists"
                        buttonText="fetch again"
                        onRefresh={() => fetchUserPlaylists(1)}
                    />
                ) : (
                    playlists?.map((playlist) => (
                        <PlaylistCard key={playlist?._id} playlist={playlist} />
                        // <></>
                    ))
                )}
                {(isLoading || !channel?._id) && renderSkeletons()}
            </div>
        </ScrollPagination>
    );
}